import { useCallback, useRef } from "react";
import useDebounceFunction from "./useDebounceFunction";
import type { UseDebouncePagesProps } from "../types/types";

export default function useDebouncePages({
  page,
  totalPageCount,
  onPageChange,
  delay = 400,
}: UseDebouncePagesProps) {
  const pageOffsetRef = useRef(0);

  const debouncedPageChangeHandler = useDebounceFunction(() => {
    const nextPage = page + pageOffsetRef.current;
    const safePage = Math.min(Math.max(nextPage, 1), totalPageCount);

    onPageChange(safePage);

    pageOffsetRef.current = 0;
  }, delay);

  const handleNextClick = useCallback(() => {
    pageOffsetRef.current += 1;
    debouncedPageChangeHandler();
  }, [debouncedPageChangeHandler]);

  const handlePrevClick = useCallback(() => {
    pageOffsetRef.current -= 1;
    debouncedPageChangeHandler();
  }, [debouncedPageChangeHandler]);

  return { handleNextClick, handlePrevClick };
}
