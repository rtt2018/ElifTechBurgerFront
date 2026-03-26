import { useSearchParams } from "react-router";
import {
  getHasNextPage,
  getIsLoading,
  getPage,
  getPerPage,
} from "../../redux/burgers/selectors.ts";
import { setPaginationParams } from "../../redux/burgers/slice.ts";
import styles from "./LoadMore.module.css";
import { useSelector, useDispatch } from "react-redux";

export default function LoadMore() {
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();

  const currentPage = useSelector(getPage);
  const hasNextPage: boolean = useSelector(getHasNextPage);
  const loading: boolean = useSelector(getIsLoading);
  const perPage = useSelector(getPerPage);

  const handleLoadMore = () => {
    const nextPage = (currentPage ?? 1) + 1;
    dispatch(setPaginationParams({ page: nextPage, perPage }));
    setSearchParams((prevParams) => {
      return {
        ...Object.fromEntries(prevParams),
        page: String(nextPage),
        perPage: String(perPage),
      };
    });
  };

  if (!hasNextPage) {
    return null;
  }

  return (
    <button
      className={styles.loadMoreBtn}
      onClick={handleLoadMore}
      type="button"
      disabled={loading}
    >
      {loading ? <div className={styles.spinner}></div> : "Load more"}
    </button>
  );
}
