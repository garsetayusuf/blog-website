import { useAppDispatch, useAppSelector } from "@/redux/hooks/defaultHooks";
import styles from "@/styles/paginator.module.css";
import { setCurrentPage, setCurrentSize } from "@/redux/slices/paginatorSlice";
import { useMemo } from "react";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const { currentPage, currentSize, totalPage } = useAppSelector(
    (state) => state.paginator
  );

  // memorize function when currentPage, currentSize, totalPage change
  const { pagesCount, startPage, endPage } = useMemo(() => {
    const pagesCount = Math.ceil(totalPage / currentSize);
    const totalPagesToShow = 3;

    let startPage = currentPage - Math.floor(totalPagesToShow / 2);
    let endPage = currentPage + Math.floor(totalPagesToShow / 2);

    if (startPage <= 0) {
      startPage = 1;
      endPage = Math.min(pagesCount, totalPagesToShow);
    }

    if (endPage > pagesCount) {
      endPage = pagesCount;
      startPage = Math.max(1, endPage - totalPagesToShow + 1);
    }

    return { pagesCount, startPage, endPage };
  }, [currentPage, currentSize, totalPage]);

  const pages = [];
  if (startPage > 1) {
    pages.push(1);

    // add elipsis after start paginator
    if (startPage > 2) {
      pages.push("...");
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < pagesCount) {
    // add elipsis before end paginator
    if (endPage < pagesCount - 1) {
      pages.push("...");
    }
    pages.push(pagesCount);
  }

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      dispatch(setCurrentPage(page));
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(e.target.value);
    dispatch(setCurrentSize(newSize));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="flex max-sm:flex-col max-sm:gap-4 max-sm:float-none justify-end max-sm:px-4 gap-10 items-center">
      <div className={styles.pagination}>
        {pages.map((page, index) => (
          <button
            key={index}
            type="button"
            className={`${
              page === currentPage ? styles.pageItemActive : styles.pageItem
            }
              ${page === "..." ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <span>Show</span>
        <select
          className={`${styles.select} rounded-lg px-2 py-1 focus:outline-none cursor-pointer`}
          defaultValue={currentSize}
          onChange={handleSizeChange}
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
