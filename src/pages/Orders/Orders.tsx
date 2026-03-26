import { useSelector } from "react-redux";
import styles from "./Orders.module.css";
import { getOrdersSelector } from "../../redux/orders/selectors";
import OrderItem from "../../components/OrderItem/OrderItem";

export default function Orders() {
  const orders = useSelector(getOrdersSelector);

  return (
    <div className={styles.container}>
      <div>
        {orders.length > 0 ? (
          <ul>
            {orders.map((orderItem) => (
              <OrderItem key={orderItem._id} order={orderItem} />
            ))}
          </ul>
        ) : (
          <div>No orders!</div>
        )}
      </div>
    </div>
  );
}
