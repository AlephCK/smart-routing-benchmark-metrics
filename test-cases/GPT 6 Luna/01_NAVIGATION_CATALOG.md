# Navigation, Catalog, and Product Detail Test Cases

## Navigation and content

| ID | Pri. | Scenario / Steps | Expected result |
|---|---|---|---|
| NAV-01 | P0 | Open the storefront root. | Homepage loads without an error; store identity and main content are visible. |
| NAV-02 | P1 | Follow Catalog from the main navigation. | Catalog opens and provides product links. |
| NAV-03 | P1 | Follow About Us from header and footer. | Both links open the same About Us content without broken navigation. |
| NAV-04 | P2 | Inspect header/footer links and browser back/forward behavior. | Links have valid destinations; browser history returns to the expected page. |
| NAV-05 | P2 | Load a nonexistent path directly. | A deliberate not-found response/page appears; no broken or blank shell. |

## Catalog and inventory

| ID | Pri. | Scenario / Steps | Expected result |
|---|---|---|---|
| CAT-01 | P0 | Open all products. | Product cards show title, image, price, and a working product link. |
| CAT-02 | P1 | Compare prices on cards and product pages. | Values match and use one store currency consistently. |
| CAT-03 | P1 | Inspect products marked sold out, then open their pages. | Inventory state is clear and the purchase control cannot add unavailable stock. |
| CAT-04 | P1 | Open a collection and navigate between products. | Product count and visible cards are stable; links resolve to the selected item. |
| CAT-05 | P2 | Check product images, alt text, and responsive grid at narrow width. | Images load, meaningful alt text exists, and cards do not overlap or clip. |

## Product detail and variants

| ID | Pri. | Scenario / Steps | Expected result |
|---|---|---|---|
| PDP-01 | P0 | Open an in-stock PDP. | Product title, price, image, options (when applicable), and add control are visible. |
| PDP-02 | P0 | Change each available option independently. | Selected option and active variant/price stay in sync. |
| PDP-03 | P0 | Add an in-stock selected variant. | Cart receives the correct product and variant; cart count updates. |
| PDP-04 | P1 | Open an unavailable product/variant. | Sold-out state is communicated and add control is disabled or safely rejected. |
| PDP-05 | P2 | Compare product handle, title, image, description, and option labels. | All content describes the same product and has no obvious broken text. |
