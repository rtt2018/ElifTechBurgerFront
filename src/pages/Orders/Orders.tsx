import styles from "./Orders.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import type { FormikHelpers } from "formik";
import OrderItem from "../../components/OrderItem/OrderItem";
import type { LoginFormValues } from "../../types/burger";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setOrders } from "../../redux/orders/slice";
import { getOrdersSelector } from "../../redux/orders/selectors";
import { getOrders } from "../../redux/orders/operations";
import { setCartFromOrder } from "../../redux/order/slice";
import { useNavigate } from "react-router";

export default function Orders() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(getOrdersSelector);
  const navigate = useNavigate();

  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  const handleSubmit = async (
    values: LoginFormValues,
    { setSubmitting }: FormikHelpers<LoginFormValues>,
  ) => {
    try {
      setIsLoadingOrders(true);
      await dispatch(
        getOrders({
          patch: "/order",
          user: values,
        }),
      ).unwrap();
    } catch (error) {
      console.error("Failed to load orders:", error);
      dispatch(setOrders([]));
    } finally {
      setIsLoadingOrders(false);
      setSubmitting(false);
    }
  };

  const handleOrderAgain = async (id: string) => {
    try {
      const order = orders.find((order) => order._id === id);
      dispatch(setCartFromOrder(order?.cart));
      navigate("/cart");
    } catch (error) {
      console.error("Failed to repeat order:", error);
    }
  };
  const PHONE_REGEX = /^\+?[0-9]{10,15}$/;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            email: "",
            phone: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
            phone: Yup.string()
              .matches(
                PHONE_REGEX,
                "Phone must contain 10-15 digits and may start with +",
              )
              .required("Phone is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.fieldWrapper}>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email
                  </label>
                  <Field name="email" type="email" className={styles.input} />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone
                  </label>
                  <Field name="phone" type="text" className={styles.input} />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className={styles.error}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isLoadingOrders}
                  className={styles.button}
                >
                  {isLoadingOrders ? "Loading..." : "Login"}
                </button>
              </div>

              {orders.length > 0 ? (
                <ul className={styles.ordersList}>
                  {orders.map((order) => (
                    <OrderItem
                      key={order._id}
                      order={order}
                      onOrderAgain={handleOrderAgain}
                    />
                  ))}
                </ul>
              ) : (
                <p className={styles.emptyText}>
                  No orders yet. Enter email and phone to load your orders.
                </p>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
