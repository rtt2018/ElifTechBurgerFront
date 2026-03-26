import styles from "./BurgerList.module.css";
import BurgerCard from "../BurgerCard/BurgerCard";
import { useEffect } from "react";
import { getBurgers } from "../../redux/burgers/operations.ts";
import { getHits } from "../../redux/burgers/selectors.ts";
import { useParams, useSearchParams } from "react-router";
import LoadMore from "../LoadMore/LoadMore";
import type { Burger } from "../../types/burger.ts";
import { useAppSelector, useAppDispatch } from "../../redux/hooks.ts";

export default function BurgerList() {
  const burgers = useAppSelector(getHits);

  const dispatch = useAppDispatch();
  const { shopName } = useParams();
  const [searchParams] = useSearchParams();
  const patch: string = shopName ? `/burgers/${shopName}` : "/burgers";

  useEffect(() => {
    dispatch(
      getBurgers({
        patch,
        searchParams,
      }),
    );
  }, [dispatch, patch, searchParams]);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ul className={styles.burgersList}>
          {burgers.map((burger: Burger) => {
            return <BurgerCard burger={burger} key={burger._id} />;
          })}
        </ul>
        <LoadMore />
      </div>
    </div>
  );
}
