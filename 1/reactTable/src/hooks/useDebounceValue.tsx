import { useEffect, useState } from "react";

export default function useDebounceValue<T>(v: T, t: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(v);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(v);
    }, t);

    return () => clearTimeout(timer);
  }, [v, t]);

  return debouncedValue;
}
