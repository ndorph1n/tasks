import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import useDebounceValue from "./hooks/useDebounceValue";
import useDebounceFunction from "./hooks/useDebounceFunction";

function App() {
  const [count, setCount] = useState(0);
  const [secondCount, setSecondCount] = useState(0);

  const debouncedCount = useDebounceValue(count, 500);

  const handleCount = () => {
    setSecondCount((prev) => prev + 1);
  };

  const debouncedFunc = useDebounceFunction(handleCount, 500);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount(count + 1)}
        >
          Debounced Count: {debouncedCount}
        </button>

        <button type="button" className="counter" onClick={debouncedFunc}>
          Debounced Count Function: {secondCount}
        </button>
      </section>
    </>
  );
}

export default App;
