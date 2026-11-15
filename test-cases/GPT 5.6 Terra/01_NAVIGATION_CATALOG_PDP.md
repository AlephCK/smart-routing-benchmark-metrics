# Navigation, Catalog, and Product Detail Cases

| ID | Pri. | Steps | Expected result |
|---|---|---|---|
| NAV-01 | P0 | Open `/`. | Homepage loads with navigation, product content, and no error shell. |
| NAV-02 | P1 | Use Home, Catalog, Blog, and About Us header links. | Each link reaches the intended destination and browser history returns correctly. |
| NAV-03 | P1 | Compare header and footer About Us links. | Both resolve to the same content. |
| NAV-04 | P2 | Load a nonexistent URL. | A deliberate not-found page/status appears, without a blank or broken layout. |
| NAV-05 | P2 | Test main navigation with keyboard only at desktop and mobile widths. | Controls have visible focus and can be reached and activated. |
| CAT-01 | P0 | Open `/collections/all`. | Seven product cards show a title, price, image, and product link. |
| CAT-02 | P1 | Compare catalog price against PDP price for an in-stock item. | Currency and price match, using GBP formatting. |
| CAT-03 | P0 | Open Brown Shades and White sandals from catalog. | Sold-out state is clear and unavailable merchandise cannot be added. |
| CAT-04 | P1 | Browse a collection, then open cards in sequence. | Product links resolve to the selected item; no stale content remains. |
| CAT-05 | P2 | Inspect cards and product imagery at a narrow viewport. | Images load, content does not overlap, and card labels remain readable. |
| PDP-01 | P0 | Open Noir jacket. | Name, £60.00 price, images, selectors, and Add to Cart control are visible. |
| PDP-02 | P0 | Select each size and colour combination. | The selected values synchronize to a valid purchasable variant. |
| PDP-03 | P0 | Add a selected in-stock variant. | Cart line includes the correct product and variant, and badge increments once. |
| PDP-04 | P1 | Change options before and after selection. | Price, selected option, and Add to Cart state stay synchronized. |
| PDP-05 | P1 | Open a sold-out item directly by URL. | Direct navigation preserves its unavailable state. |
| PDP-06 | P2 | Compare URL handle, title, image, options, and description. | All content describes the same product and contains no broken copy. |
