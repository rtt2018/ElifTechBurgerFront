import { useDispatch, useSelector } from "react-redux";
import styles from "./ShopList.module.css";
import {
  getIsLoading,
  getShopsNameSelector,
} from "../../redux/shops/selectors";
import { Link } from "react-router";
import { getShopsNames } from "../../redux/shops/operations";
import { useEffect } from "react";

export default function ShopList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShopsNames());
  }, [dispatch]);

  const isLoading = useSelector(getIsLoading);
  const shops = useSelector(getShopsNameSelector);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {isLoading ? (
          "Loading..."
        ) : (
          <ul className={styles.shopList}>
            {shops.map((shop) => (
              <li key={shop._id} className={styles.shopListItem}>
                <Link to={`/${shop.name}`} className={styles.shopListLink}>
                  {shop.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
