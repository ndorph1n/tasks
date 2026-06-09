import { useCallback, useEffect, useRef } from "react";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function useDebounceFunction<T extends (...args: any[]) => void>(
  f: T,
  t: number,
): (...args: Parameters<T>) => void {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [f, t]);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => f(...args), t);
    },
    [f, t],
  );
}
