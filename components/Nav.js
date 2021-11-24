import Link from "next/link";
import { useCart } from "../lib/cartState";
import CartCount from "./CartCount";
import SignOut from "./SignOut";
import NavStyles from "./styles/NavStyles";
import { useUser } from "./User";
export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products" prefetch={false}>Products</Link>
      {user && (
        <>
          <Link href="/sell" prefetch={false}>Sell</Link>
          <Link href="/orders" prefetch={false}>Orders</Link>
          <SignOut />
          <button type="button" onClick={openCart}>
            My Cart{" "}
            <CartCount
              count={user.cart.reduce(
                (tally, cartItem) =>
                   cartItem.product ?tally + cartItem.quantity : 0,
                0
              )}
            />
          </button>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin" prefetch={false}>Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
