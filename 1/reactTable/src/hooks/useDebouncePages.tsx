import { useCallback, useRef } from "react";
import useDebounceFunction from "./useDebounceFunction";

export default function useDebouncePages({
  page,
  totalPageCount,
  onPageChange,
  delay = 400,
}) {
  const nextClickCountRef = useRef(0);
  const prevClickCountRef = useRef(0);

  const debouncedNextHandler = useDebounceFunction(() => {
    const nextPage = page + nextClickCountRef.current;
    if (nextPage > totalPageCount) {
      onPageChange(totalPageCount);
    }
    if (nextPage <= totalPageCount) {
      onPageChange(nextPage);
    }
    nextClickCountRef.current = 0;
  }, delay);

  const debouncedPrevHandler = useDebounceFunction(() => {
    const prevPage = page - prevClickCountRef.current;
    if (prevPage < 0) {
      onPageChange(1);
    }
    if (prevPage > 0) {
      onPageChange(prevPage);
    }
    prevClickCountRef.current = 0;
  }, delay);

  const handleNextClick = useCallback(() => {
    nextClickCountRef.current++;
    debouncedNextHandler();
  }, [debouncedNextHandler]);

  const handlePrevClick = useCallback(() => {
    prevClickCountRef.current++;
    debouncedPrevHandler();
  }, [debouncedPrevHandler]);

  return { handleNextClick, handlePrevClick };
}
