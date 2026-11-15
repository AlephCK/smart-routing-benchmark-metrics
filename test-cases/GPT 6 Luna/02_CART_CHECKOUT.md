# Cart and Checkout Test Cases

| ID | Pri. | Scenario / Steps | Expected result |
|---|---|---|---|
| CART-01 | P0 | Add one in-stock product and open cart. | Correct item, selected variant, unit price, and quantity 1 appear. |
| CART-02 | P0 | Increase quantity to 2 and update cart. | Quantity and line/order totals recalculate correctly. |
| CART-03 | P0 | Remove the only cart item. | Cart becomes empty and checkout is unavailable. |
| CART-04 | P1 | Add two different products. | Each line remains distinct and total equals the sum of line totals. |
| CART-05 | P1 | Refresh cart and use browser back/forward. | Cart state remains coherent and no duplicate items are created. |
| CART-06 | P1 | Inspect cart badge, line quantity, and cart total after updates. | Header and cart page counts/totals agree. |
| CHECK-01 | P0 | Start checkout with a valid cart. | Shopify checkout opens with the correct item and total. |
| CHECK-02 | P1 | Enter an invalid discount code and apply it. | Clear validation feedback appears; cart/checkout remains usable. |
| CHECK-03 | P0 | Inspect test gateway instructions without submitting payment. | Demo/test payment guidance is clear; no real payment is initiated. |

Do not submit payment information or complete an order during this QA exercise.
