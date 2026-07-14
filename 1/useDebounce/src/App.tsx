import { useCallback, useEffect, useState } from "react";
import "./App.css";
import useDebounceValue from "./hooks/useDebounceValue";
import useDebounceFunction from "./hooks/useDebounceFunction";

function App() {
  const [count, setCount] = useState(0);
  const [secondCount, setSecondCount] = useState(0);

  const [remainingTime, setRemainingTime] = useState(0);
  const [isDebounceWaiting, setIsDebounceWaiting] = useState(false);

  const delay = 500;

  const debouncedCount = useDebounceValue(count, delay);

  const handleCount = useCallback(() => {
    setSecondCount((prev) => prev + 1);
    setIsDebounceWaiting(false);
    setRemainingTime(0);
  }, []);

  const [debouncedFunc, cancelDebouncedFunc] = useDebounceFunction(
    handleCount,
    delay,
  );

  useEffect(() => {
    if (!isDebounceWaiting || remainingTime <= 0) {
      return;
    }

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        const next = prev - 50;

        if (next <= 0) {
          clearInterval(interval);
          return 0;
        }

        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isDebounceWaiting, remainingTime]);

  const handleDebouncedFunction = () => {
    setRemainingTime(delay);
    setIsDebounceWaiting(true);
    debouncedFunc();
  };

  const handleCancelDebouncedFunction = () => {
    setRemainingTime(0);
    setIsDebounceWaiting(false);
    cancelDebouncedFunc();
  };

  return (
    <>
      <section id="center">
        <div>
          <h1>Debounce Hooks</h1>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount(count + 1)}
        >
          Debounced Count: {debouncedCount}
        </button>

        <div className="debouncedFunc">
          <p>Timeout: {remainingTime}</p>

          <button
            type="button"
            className="counter"
            onClick={handleDebouncedFunction}
          >
            Debounced Count Function: {secondCount}
          </button>

          <button
            type="button"
            className="counter"
            onClick={handleCancelDebouncedFunction}
          >
            Cancel Debounced Function
          </button>
        </div>
      </section>
    </>
  );
}

export default App;
