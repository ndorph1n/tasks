import { useEffect, useState } from "react";

export default function useDebounceValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDeboucedValue] = useState<T>(value);

  useEffect(() => {
    const debounceTimeout: ReturnType<typeof setTimeout> = setTimeout(
      () => setDeboucedValue(value),
      delay,
    );

    return () => clearTimeout(debounceTimeout);
  }, [value, delay]);
  return debouncedValue;
}
