import type { Order } from "../../types/burger";
import styles from "./OrderItem.module.css";

export default function OrderItem({
  order,
  onOrderAgain,
}: {
  order: Order;
  onOrderAgain: (orderId: string) => void;
}) {
  return (
    <li className={styles.orderItem} key={order._id}>
      <div className={styles.orderLeft}>
        <ul className={styles.orderCartItems}>
          {order.cart.map((cartPos) => (
            <li className={styles.cartItemsWrapper} key={cartPos.burger._id}>
              <div className={styles.orderPosWrapper}>
                <img
                  src={cartPos.burger.image}
                  alt={cartPos.burger.description}
                  className={styles.orderImage}
                  onError={(e) => {
                    e.currentTarget.src = "/fallback.jpg";
                  }}
                />
                <p className={styles.itemDescr}>{cartPos.burger.name}</p>
              </div>
            </li>
          ))}
        </ul>
        <div className={styles.descriptionWrap}>
          <div className={styles.orderInfo}>
            <p className={styles.orderPrice}>
              Total price: {order.totalPrice} money
            </p>
          </div>
          <div className={styles.orderActions}>
            <button
              type="button"
              className={styles.button}
              onClick={() => onOrderAgain(order._id)}
            >
              Order again
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
