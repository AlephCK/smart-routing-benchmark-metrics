# Test Suite 03: Product Detail Pages (PDP) & Variants
**Model:** Claude Opus 4.6 (Thinking)
**Module:** Individual Product Views, Multi-Option Variants, Empty Content & Inventory States
**Target:** `https://sauce-demo.myshopify.com/`

---

### TC-PDP-001: Missing Product Description on `Brown Shades` (Defect D-08)
- **Priority:** P1 (High / Content Defect)
- **Defect Ref:** D-08
- **Type:** Content Integrity / Visual
- **Test Steps:**
  1. Navigate to `https://sauce-demo.myshopify.com/products/brown-shades`.
  2. Inspect the product description container below or adjacent to the image and price.
  3. Verify if description text exists.
- **Expected Results / Finding:**
  - Defect D-08 confirmed: Product description is completely empty (`""`). No copy or fallback text is rendered.

---

### TC-PDP-002: Multi-Option Variant Dropdowns — `Noir jacket` (6 Variant SKUs)
- **Priority:** P0 (Critical Path)
- **Type:** Functional / Interactive State
- **Pre-conditions:** Direct navigation to `/products/noir-jacket`.
- **Test Steps:**
  1. Open `/products/noir-jacket`. Verify H1: `"Noir jacket"`, Price: `"£60.00"`.
  2. Verify presence of 2 independent dropdown selectors:
     - Dropdown 1: Label `"Size"` with options: `S`, `M`, `L`.
     - Dropdown 2: Label `"Color"` with options: `Blue`, `Red`.
  3. Select `M` and `Red`.
  4. Verify hidden `select[name="id"]` updates to the correct variant ID without full page reload.
  5. Verify CTA button is enabled: `Add to Cart`.
- **Expected Results:**
  - Both selectors allow independent selection across all 6 variant permutations.

---

### TC-PDP-003: Single Dropdown Selector — `Grey jacket`
- **Priority:** P1 (High)
- **Type:** Functional / Variant Mapping
- **Test Steps:**
  1. Navigate to `/products/grey-jacket`.
  2. Verify H1: `"Grey jacket"`, Price: `"£55.00"`.
  3. Verify single dropdown with single option: `"Grey jacket"`.
  4. Verify CTA: `Add to Cart` is enabled.
- **Expected Results:**
  - Single variant dropdown maps correctly to product ID.

---

### TC-PDP-004: Handle vs Title Contradiction with Dual Selectors — `Black heels` (Defect D-01)
- **Priority:** P0 (Critical Path / Data Integrity)
- **Defect Ref:** D-01
- **Type:** Functional / Data Integrity
- **Test Steps:**
  1. Navigate to `/products/flower-print-jeans`.
  2. Verify URL handle is `flower-print-jeans`.
  3. Verify H1 title rendered is `"Black heels"`.
  4. Inspect variant selectors:
     - Dropdown 1: `"Size"` with options `S`, `M`, `L`.
     - Dropdown 2: `"Color"` with option `Red`.
  5. Inspect image: Shows denim jeans (conflicting with title "Black heels").
- **Expected Results / Finding:**
  - Defect D-01 confirmed: Product handle, title, image, and variant options present irreconcilable contradictions.

---

### TC-PDP-005: Out-of-Stock Disabled CTA Verification — `Brown Shades` & `White sandals`
- **Priority:** P0 (Critical Path)
- **Type:** Business Rule / Negative Flow
- **Test Steps:**
  1. Navigate to `/products/brown-shades` (Price: `£20.00`).
  2. Inspect CTA button: Label must be `"Sold Out"`, attribute `disabled="disabled"` (or `disabled=true`).
  3. Attempt click on button; verify no form submission occurs.
  4. Navigate to `/products/white-sandals` (Price: `£25.00`).
  5. Inspect CTA button: Label must be `"Sold Out"`, attribute `disabled="disabled"`.
  6. Attempt click; verify no submission occurs.
- **Expected Results:**
  - Both out-of-stock products cleanly disable purchase actions.

---

### TC-PDP-006: In-Stock Single SKU Products — `Bronze sandals` (£39.99) & `Striped top` (£50.00)
- **Priority:** P1 (High)
- **Type:** Functional / Baseline
- **Test Steps:**
  1. Open `/products/bronze-sandals` (Price: `£39.99`).
  2. Open `/products/striped-top` (Price: `£50.00`).
  3. Verify neither product renders variant selectors (single default title).
  4. Verify both display an active `Add to Cart` CTA button.
- **Expected Results:**
  - Single-SKU products load without dropdown overhead; CTAs are active.

---

### TC-PDP-007: Absence of Quantity Selectors Across All 7 PDPs
- **Priority:** P2 (Medium)
- **Type:** UX Limitation / Baseline
- **Test Steps:**
  1. Iterate across all 7 product PDPs.
  2. Check DOM for `input[name="quantity"]`.
- **Expected Results:**
  - Verified: No PDP contains a user-facing quantity input. Each click on `Add to Cart` sends default `quantity=1`.

---

### TC-PDP-008: Template Copy Defects — Grammar, Homophone & Rogue Character (D-06, D-07, D-09)
- **Priority:** P1 (High / Content Regression)
- **Defect Refs:** D-06, D-07, D-09
- **Type:** Content Regression
- **Test Steps:**
  1. Open `/products/striped-top`.
  2. Search description for grammar defect: `"change render the product description"` (D-06).
  3. Search description for homophone typo: `"write of the product images"` (D-07).
  4. Search description for trailing rogue character: `"product images.X"` (D-09).
- **Expected Results / Finding:**
  - All three copy defects verified on `/products/striped-top`.
