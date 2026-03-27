import { Link, NavLink, useLocation } from "react-router";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { getCart } from "../../redux/order/selectors.ts";

export default function Header() {
  const location = useLocation();
  const cart = useSelector(getCart);

  const searchParams = new URLSearchParams(location.search);
  const sortBy = searchParams.get("sortBy");
  const sortOrder = searchParams.get("sortOrder");

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
            {/* PRICE */}
            {sortBy === "price" && sortOrder === "asc" ? (
              <Link to={`${location.pathname}?sortBy=price&sortOrder=desc`}>
                Sort by price (desc)
              </Link>
            ) : (
              <Link to={`${location.pathname}?sortBy=price&sortOrder=asc`}>
                Sort by price (asc)
              </Link>
            )}

            {/* NAME */}
            {sortBy === "name" && sortOrder === "asc" ? (
              <Link to={`${location.pathname}?sortBy=name&sortOrder=desc`}>
                Sort by name (Z → A)
              </Link>
            ) : (
              <Link to={`${location.pathname}?sortBy=name&sortOrder=asc`}>
                Sort by name (A → Z)
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
