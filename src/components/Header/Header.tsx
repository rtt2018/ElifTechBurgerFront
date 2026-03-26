import { Link, NavLink, useLocation } from "react-router";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { getCart } from "../../redux/order/selectors.ts";

export default function Header() {
  const location = useLocation();
  const cart = useSelector(getCart);
  return (
    <header className={styles.container}>
      <div className={styles.headerWrapper}>
        <div className={styles.navList}>
          <NavLink to={"/"}>Shop</NavLink>
          <NavLink to={"/cart"}>{`Shopping Cart (${cart.length})`}</NavLink>
          <NavLink to={"/orders"}>Orders Histoty</NavLink>
        </div>
        {location.pathname.includes("cart") ||
        location.pathname.includes("orders") ? null : (
          <div className={styles.sortContainer}>
            <Link to={`${location.pathname}?sortBy=price`}>Sort by price </Link>
            <Link to={`${location.pathname}?sortBy=name`}>Sort by name</Link>
          </div>
        )}
      </div>
    </header>
  );
}
