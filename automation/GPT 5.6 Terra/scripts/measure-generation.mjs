import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const activity = process.argv.find((arg) => arg.startsWith('--activity='))?.split('=')[1];
if (!['manual', 'automation'].includes(activity)) {
  throw new Error('Usage: node scripts/measure-generation.mjs --activity=manual|automation');
}

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is required. No request was sent.');
}

const prompts = {
  manual: `You are a QA engineer. Analyze https://sauce-demo.myshopify.com/ and produce a concise, prioritized manual test plan for navigation, catalog, product variants, cart/checkout, search/account, and content/accessibility. Include test IDs, steps, and expected results. Do not make purchases.`,
  automation: `You are a QA automation engineer. Write one Playwright TypeScript spec for https://sauce-demo.myshopify.com/ with five isolated tests: catalog and sold-out indicators, Noir jacket variant selection, cart quantity recalculation, positive and zero-result search, and checkout invalid-discount validation. Use web-first assertions and do not submit a payment.`,
};

const startedAt = performance.now();
let firstTokenAt = null;
let completedAt = null;
let response = null;
let buffer = '';
let lastEventType = null;
let terminalError = null;

const apiResponse = await fetch('https://api.openai.com/v1/responses', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-5.6-terra',
    reasoning: { effort: 'medium' },
    stream: true,
    store: false,
    input: prompts[activity],
  }),
});

if (!apiResponse.ok || !apiResponse.body) {
  throw new Error(`Responses API request failed: ${apiResponse.status} ${await apiResponse.text()}`);
}

const decoder = new TextDecoder();
function processEvent(event) {
  const data = event.replaceAll('\r\n', '\n').split('\n')
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice(5).trimStart())
    .join('\n');
  if (!data || data === '[DONE]') return;

  const parsed = JSON.parse(data);
  lastEventType = parsed.type ?? null;
  if (parsed.type === 'response.output_text.delta' && firstTokenAt === null) {
    firstTokenAt = performance.now();
  }
  if (parsed.type === 'response.completed' || parsed.type === 'response.incomplete' || parsed.type === 'response.failed') {
    completedAt = performance.now();
    response = parsed.response;
    terminalError = parsed.response?.error ?? parsed.response?.incomplete_details ?? null;
  }
}

for await (const chunk of apiResponse.body) {
  buffer += decoder.decode(chunk, { stream: true });
  const events = buffer.replaceAll('\r\n', '\n').split('\n\n');
  buffer = events.pop() ?? '';
  for (const event of events) processEvent(event);
}
buffer += decoder.decode();
if (buffer.trim()) processEvent(buffer);

if (!response || completedAt === null) {
  throw new Error(`Stream ended without a terminal response event. Last event: ${lastEventType ?? 'none'}.`);
}
if (response.status !== 'completed') {
  throw new Error(`Response ended with status ${response.status}: ${JSON.stringify(terminalError)}`);
}

const usage = response.usage ?? {};
const result = {
  model: response.model,
  reasoning_effort: 'medium',
  activity,
  response_id: response.id,
  created_at: response.created_at,
  first_output_token_ms: firstTokenAt === null ? null : Number((firstTokenAt - startedAt).toFixed(2)),
  total_response_ms: Number((completedAt - startedAt).toFixed(2)),
  input_tokens: usage.input_tokens ?? null,
  cached_input_tokens: usage.input_tokens_details?.cached_tokens ?? null,
  output_tokens: usage.output_tokens ?? null,
  reasoning_tokens: usage.output_tokens_details?.reasoning_tokens ?? null,
  total_tokens: usage.total_tokens ?? null,
};

const resultsDir = join(process.cwd(), 'generation-metrics');
await mkdir(resultsDir, { recursive: true });
const file = join(resultsDir, `${activity}-${new Date().toISOString().replaceAll(':', '-')}.json`);
await writeFile(file, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ file, ...result }, null, 2));
