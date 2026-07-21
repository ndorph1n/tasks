import { useCallback } from "react";
import useThrottleFunction from "./useThrottleFunction";
import type { PageDirection, UseThrottlePagesProps } from "../types/types";

export default function useThrottlePages({
  page,
  totalPageCount,
  onPageChange,
  delay = 400,
}: UseThrottlePagesProps) {
  const pageChangeHandler = useCallback(
    (dir: PageDirection) => {
      let nextPage;

      if (dir === "next") {
        nextPage = page + 1;
      } else {
        nextPage = page - 1;
      }

      const safePage = Math.min(Math.max(nextPage, 1), totalPageCount);

      onPageChange(safePage);
    },
    [onPageChange, page, totalPageCount],
  );

  const throttledPageChangeHandler = useThrottleFunction(
    pageChangeHandler,
    delay,
  );

  const handleNextClick = useCallback(() => {
    throttledPageChangeHandler("next");
  }, [throttledPageChangeHandler]);

  const handlePrevClick = useCallback(() => {
    throttledPageChangeHandler("prev");
  }, [throttledPageChangeHandler]);

  return { handleNextClick, handlePrevClick };
}
