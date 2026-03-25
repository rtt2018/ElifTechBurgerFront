import { useDispatch } from "react-redux";
import styles from "./BurgerCard.module.css";
import { MdAddShoppingCart } from "react-icons/md";
import { addPositionToCart } from "../../redux/order/slice.ts";
import type { Burger } from "../../types/burger.ts";

export default function BurgerCard({ burger }: { burger: Burger }) {
  const dispatch = useDispatch();

  const handleClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    dispatch(
      addPositionToCart({
        burger,
        price: burger.price,
        amount: 1,
      }),
    );
  };

  return (
    <li className={styles.container}>
      <div className={styles.wrapper}>
        <div>
          <div className={styles.thumb}>
            <img
              className={styles.burgerImage}
              src={burger.image}
              alt={burger.name}
            />
          </div>
          <h3 className={styles.burgerHeader}>{burger.name}</h3>
          <p className={styles.descr}>{burger.description}</p>
          <p className={styles.descr}>
            Shop: <span className={styles.bold}>{burger.shopName}</span>
          </p>
        </div>
        <div className={styles.cartButtonWrapper}>
          <p className={styles.descr}>
            Price: <span className={styles.bold}>{burger.price}</span> money
          </p>
          <button
            title="Add to cart"
            className={styles.cartButton}
            type="button"
            onClick={handleClick}
          >
            <MdAddShoppingCart className={styles.cartIcon} />
          </button>
        </div>
      </div>
    </li>
  );
}
