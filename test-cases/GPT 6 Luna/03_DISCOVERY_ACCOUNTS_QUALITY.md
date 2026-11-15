# Search, Account, and Quality Test Cases

| ID | Pri. | Scenario / Steps | Expected result |
|---|---|---|---|
| DISC-01 | P0 | Search a known product keyword. | Results are relevant and open the matching PDPs. |
| DISC-02 | P1 | Search a partial keyword. | Matching products appear without unrelated items. |
| DISC-03 | P1 | Search a deliberately nonexistent term. | An explicit empty state appears; no stale product cards remain. |
| DISC-04 | P1 | Submit an empty search. | Defined behavior occurs without a server error. |
| DISC-05 | P1 | Open Login and inspect required fields and validation. | Form is usable, labels are associated, and invalid submission is explained. |
| DISC-06 | P2 | Open Create account and use browser back. | Registration form loads; navigation/history work as expected. |
| QUAL-01 | P2 | Read About Us copy. | **Observed issue:** live homepage crawl showed “and s ee what their friends”; verify whether still present and log evidence. |
| QUAL-02 | P1 | Search `jacket` and compare result titles with the query. | Every result is relevant; candidate benchmark regression: Striped top false positive. |
| QUAL-03 | P1 | Search `shi` and inspect result card type/content. | Only product cards appear; candidate benchmark regression: Terms page rendered as product. |
| QUAL-04 | P1 | Open `/products/flower-print-jeans`. | URL handle, title, image, and options refer to the same item; candidate mismatch requires reproduction. |
| QUAL-05 | P2 | Check footer and product descriptions for typos/stray characters; inspect mobile layout and keyboard focus. | No broken copy, clipped controls, keyboard traps, or unreadable focus states. |
