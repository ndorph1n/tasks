import { useEffect, useRef, useState } from "react";
import type { ApiResponse, ProfileProps, User } from "../types/types";

export default function Profile({ children, username }: ProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const requestIdRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();

    const requestId = ++requestIdRef.current;
    const fetchProfile = async (username: string) => {
      try {
        setIsLoading(true);
        setError(null);
        setUser(null);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users?username=${encodeURIComponent(username)}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data: ApiResponse = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format");
        }

        if (!isMounted) return;
        if (requestId !== requestIdRef.current) return;

        setUser(data[0] ?? null);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (!isMounted) return;
        if (requestId !== requestIdRef.current) return;
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (requestId === requestIdRef.current && isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile(username);
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [username]);
  return <>{children(user, { isLoading, error })}</>;
}
