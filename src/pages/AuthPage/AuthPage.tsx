import styles from "./Cart.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { getCart, getTotalPrice } from "../../redux/order/selectors";
import CartPosition from "../../components/CartPosition/CartPosition";
import api from "../../api/api";
// import { clearCart } from "../../redux/order/slice.ts";
export default function Cart() {
  // const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);

  const handleSubmit = async (values, { resetForm }) => {
    console.log({ ...values, cart });
    const { name, email, phone, address } = values;

    const reqCart = cart.map((item) => {
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
      },
      cart: reqCart,
      totalPrice,
      phone,
      address,
    };
    const order = await api.post("/orders", orderResponse);
    console.log("🚀 ~ handleSubmit ~ order:", order);
    // dispatch(clearCart());
    // resetForm();
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
            phone: Yup.string().required("Phone is required"),
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
                    {cart.map((pos) => {
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
