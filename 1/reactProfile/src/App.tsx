import "./App.css";
import Profile from "./components/Profile";
import Badge from "./components/Badge";
import Loading from "./components/Loading";
import { useState } from "react";
import useDebounceValue from "./hooks/useDebounceValue";

function App() {
  const [inputValue, setInputValue] = useState("Bret");

  const debouncedInputValue = useDebounceValue(inputValue, 500);

  const username = debouncedInputValue.trim();

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {username ? (
        <Profile username={username}>
          {(user, { isLoading, error }) => {
            if (isLoading) return <Loading />;
            if (error) return <div role="alert">{error.message}</div>;

            return user ? <Badge info={user} /> : <div>User not found</div>;
          }}
        </Profile>
      ) : (
        <div>User not found</div>
      )}
    </>
  );
}

export default App;
