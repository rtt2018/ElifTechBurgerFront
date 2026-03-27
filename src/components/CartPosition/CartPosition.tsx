import { useDispatch } from "react-redux";
import styles from "./CartPosition.module.css";
import { BsTrash } from "react-icons/bs";
import {
  deletePosition,
  downPositionCount,
  upPositionCount,
} from "../../redux/order/slice.ts";
import type { CartItem } from "../../types/burger.ts";

export default function CartPosition({ item }: { item: CartItem }) {
  const dispatch = useDispatch();

  const amountChange = () => {};
  const removePosition = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.stopPropagation();
    evt.preventDefault();
    dispatch(deletePosition(item));
  };

  const upAmount = () => {
    dispatch(upPositionCount(item));
  };

  const downAmount = () => {
    dispatch(downPositionCount(item));
  };

  return (
    <li className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imgnameWrapper}>
          <div className={styles.thumb}>
            <img
              src={item.burger.image}
              alt={item.burger.description}
              className={styles.burgerImage}
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = "/food.jpg";
              }}
            />
          </div>
          <div className={styles.headWrapper}>
            <h2>{item.burger.name}</h2>
            <p>Price: {item.burger.price} money</p>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <button
            type="button"
            className={styles.positionButton}
            onClick={downAmount}
          >
            -
          </button>
          <input
            aria-label="Quantity"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            name="quantity"
            id=""
            value={item.amount}
            onChange={amountChange}
            className={styles.amountInput}
          />
          <button
            type="button"
            className={styles.positionButton}
            onClick={upAmount}
          >
            +
          </button>
          <button
            title="Remove position"
            className={styles.positionButton}
            type="button"
            onClick={removePosition}
          >
            <BsTrash className={styles.trashIcon} />
          </button>
        </div>
      </div>
    </li>
  );
}
