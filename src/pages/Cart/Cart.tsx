import styles from "./Cart.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getCart, getTotalPrice } from "../../redux/order/selectors";
import CartPosition from "../../components/CartPosition/CartPosition";
import api from "../../api/api";
import { clearCart } from "../../redux/order/slice";
import type { CartItem, FormValues } from "../../types/burger";
import type { FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { setOrders } from "../../redux/orders/slice";
import { setUser } from "../../redux/user/slice";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const navigate = useNavigate();

  const totalPrice = useSelector(getTotalPrice);
  const PHONE_REGEX = /^\+?[0-9]{10,15}$/;

  const handleSubmit = async (
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>,
  ) => {
    console.log({ ...values, cart });
    const { name, email, phone, address } = values;

    const reqCart = cart.map((item: CartItem) => {
      const obj = {
        burger: item.burger._id,
        price: item.burger.price,
        amount: item.amount,
      };

      return obj;
    });

    const orderResponse = {
      user: {
        name,
        email,
        phone,
      },
      cart: reqCart,
      totalPrice,
      address,
    };
    const response = await api.post("/order", orderResponse);
    dispatch(setUser(response.data.data.user));
    dispatch(setOrders(response.data.data.orders));
    dispatch(clearCart());
    resetForm();
    toast("Order created!");
    navigate("/orders");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            address: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
            phone: Yup.string()
              .matches(
                PHONE_REGEX,
                "Phone must contain 10-15 digits and may start with +",
              )
              .required("Phone is required"),
            address: Yup.string().required("Address is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.fieldWrapper}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <Field name="name" type="text" className={styles.input} />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={styles.error}
                  />
                </div>
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
                <div className={styles.formGroup}>
                  <label htmlFor="address" className={styles.label}>
                    Address
                  </label>
                  <Field
                    name="address"
                    as="textarea"
                    className={styles.textarea}
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className={styles.error}
                  />
                </div>
              </div>
              <div>
                <div>
                  <ul className={styles.cartList}>
                    {cart.map((pos: CartItem) => {
                      return <CartPosition item={pos} key={pos.burger._id} />;
                    })}
                  </ul>
                </div>
                <div className={styles.submitWrapper}>
                  <p className={styles.totsoPriceCart}>
                    Total price: {totalPrice} money
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.button}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
