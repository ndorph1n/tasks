import { useCallback, useEffect, useRef } from "react";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function useDebounceFunction<T extends (...args: any[]) => void>(
  f: T,
  t: number,
): (...args: Parameters<T>) => void {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(f);

  useEffect(() => {
    callbackRef.current = f;
  }, [f]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [t]);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = setTimeout(() => {
        callbackRef.current(...args);
        timerRef.current = null;
      }, t);
    },
    [t],
  );
}
