# Cart, Checkout, Discovery, Account, and Quality Cases

| ID | Pri. | Steps | Expected result |
|---|---|---|---|
| CART-01 | P0 | Add one in-stock variant and open cart. | Item, variant, unit price, quantity 1, and total are correct. |
| CART-02 | P0 | Change quantity from 1 to 2 and update. | Line total, order total, and header badge recalculate correctly. |
| CART-03 | P0 | Remove the sole cart line. | Cart becomes empty and checkout cannot proceed with an empty cart. |
| CART-04 | P1 | Add two different items, then refresh/back-forward. | Separate lines and combined total persist without duplicate additions. |
| CHECK-01 | P0 | Begin checkout with a valid cart. | Shopify checkout loads with the correct item and total. |
| CHECK-02 | P1 | Apply an invalid discount code. | A clear validation error appears and checkout remains usable. |
| CHECK-03 | P0 | Review gateway instructions only. | Test gateway is clearly identified; no payment or order submission occurs. |
| DISC-01 | P0 | Search `sandals`. | Relevant sandal product results appear. |
| DISC-02 | P1 | Search a partial product term. | Results are relevant and links open the expected PDPs. |
| DISC-03 | P1 | Search `xyznonexistent999`. | Explicit zero-results state appears and search input remains usable. |
| DISC-04 | P1 | Submit an empty search. | Defined behavior occurs without a server error. |
| DISC-05 | P1 | Open Login and submit invalid/missing data. | Labels are associated and validation feedback is understandable. |
| DISC-06 | P2 | Open Create account and return via browser history. | Registration page and back navigation work without losing layout. |
| QUAL-01 | P2 | Inspect the About Us/footer copy. | **Observed fail:** `and s ee what their friends` has an unintended space. |
| QUAL-02 | P2 | Inspect Noir jacket description. | **Observed fail:** it contains `change render` and `to the write`; copy requires correction. |
| QUAL-03 | P2 | Scan catalog and PDP copy for spelling, punctuation, and stray characters. | Text is clean and does not contain draft/template artifacts. |
| QUAL-04 | P1 | Test key links and images with network/load completion. | No broken destination or failed critical asset. |
| QUAL-05 | P2 | Check headings, form labels, image alt text, and focus indication. | Accessible names and usable keyboard focus are present. |
