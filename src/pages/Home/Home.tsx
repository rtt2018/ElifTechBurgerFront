import BurgerList from "../../components/BurgerList/BurgerList";
import ShopList from "../../components/ShopList/ShopList";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <ShopList />
      <BurgerList />
    </div>
  );
}
