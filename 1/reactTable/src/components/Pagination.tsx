import { memo } from "react";

const Pagination = ({
  current,
  total,
  onNextPageClick,
  onPrevPageClick,
  disable,
}) => {
  function handleNextPageClick() {
    onNextPageClick();
  }

  function handlePrevPageClick() {
    onPrevPageClick();
  }
  return (
    <div className="pagination">
      <button
        className="pagination__arrow"
        onClick={handlePrevPageClick}
        disabled={disable.left}
      >
        {"<"}
      </button>
      <span className="nav">
        {current} / {total}
      </span>
      <button
        className="pagination__arrow"
        onClick={handleNextPageClick}
        disabled={disable.right}
      >
        {">"}
      </button>
    </div>
  );
};

export default memo(Pagination);
