import { useCallback, useEffect, useRef } from "react";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default function useThrottleFunction<T extends (...args: any[]) => void>(
  f: T,
  t: number,
): (...args: Parameters<T>) => void {
  const throttleRef = useRef(false);
  const functionRef = useRef(f);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    functionRef.current = f;
  }, [f]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        throttleRef.current = false;
      }
    };
  }, []);

  return useCallback(
    (...args: Parameters<T>) => {
      if (throttleRef.current === true) {
        return;
      }

      functionRef.current(...args);
      throttleRef.current = true;
      timerRef.current = setTimeout(() => {
        throttleRef.current = false;
        timerRef.current = null;
      }, t);
    },
    [t],
  );
}
