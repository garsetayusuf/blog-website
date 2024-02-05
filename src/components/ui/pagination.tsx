import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import styles from "@/styles/paginator.module.css";
import { setCurrentPage, setCurrentSize } from "@/redux/slices/paginatorSlice";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { currentPage, currentSize, totalPage } = useAppSelector(
    (state) => state.paginator
  );

  const pagesCount = Math.ceil(totalPage / currentSize);
  const totalPagesToShow = 3;

  const pages = [];
  let startPage = currentPage - Math.floor(totalPagesToShow / 2);
  let endPage = currentPage + Math.floor(totalPagesToShow / 2);

  if (startPage <= 0) {
    startPage = 1;
    endPage = totalPagesToShow;
  }

  if (endPage > pagesCount) {
    endPage = pagesCount;
    startPage = Math.max(1, endPage - totalPagesToShow + 1);
  }

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push("...");
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < pagesCount) {
    if (endPage < pagesCount - 1) {
      pages.push("...");
    }
    pages.push(pagesCount);
  }

  return (
    <div className="flex max-sm:flex-col max-sm:gap-4 max-sm:float-none justify-end max-sm:px-4 gap-10 items-center">
      <ul className={styles.pagination}>
        {pages.map((page, index) => (
          <li
            key={index}
            className={
              page === currentPage ? styles.pageItemActive : styles.pageItem
            }
          >
            {page === "..." ? (
              <span className={`${styles.dots} cursor-not-allowed`}>...</span>
            ) : (
              <button
                type="button"
                className={styles.pageLink}
                onClick={() => {
                  dispatch(setCurrentPage(page as number));
                }}
              >
                {page}
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="flex gap-2 items-center">
        <span>Show</span>
        <select
          className={`${styles.select} rounded-lg px-2 py-1 focus:outline-none cursor-pointer`}
          defaultValue={currentSize}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            dispatch(setCurrentSize(parseInt(e.target.value)));
            dispatch(setCurrentPage(1));
          }}
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
