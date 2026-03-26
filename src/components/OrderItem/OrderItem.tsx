import type { Order } from "../../types/burger";
import styles from "./OrderItem.module.css";

export default function OrderItem({ order }: { order: Order }) {
  return (
    <li className={styles.container}>
      <ul>
        {order.position.map((item) => (
          <li>{item.burger.name}</li>
        ))}
      </ul>
      <div>Amount: {order.totalPrice}</div>
    </li>
  );
}
