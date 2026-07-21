import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { List, useDynamicRowHeight } from "react-window";
import type { Post, PostKey, SortConfig, ApiResponse } from "./types/types";

import Pagination from "./components/Pagination";
import RowComponent from "./components/RowComponent";
import Filter from "./components/FilterControls";

import useThrottlePages from "./hooks/useThrottlePages";

const POSTS_PER_PAGE = 25;
const VISIBLE_ROWS = 10;
const DEFAULT_ROW_HEIGHT = 80;

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    order: "asc",
  });

  const [error, setError] = useState<string | null>(null);

  const [filterTitle, setFilterTitle] = useState<PostKey>("title");
  const [filterValue, setFilterValue] = useState<string>("");

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const rowHeight = useDynamicRowHeight({
    defaultRowHeight: DEFAULT_ROW_HEIGHT,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setError(null);
        const response = await fetch(
          `https://dummyjson.com/c/3122-d4f9-4e11-a62d`,
        );
        if (!response.ok) {
          throw new Error("Could not fetch data");
        }

        const result = (await response.json()) as ApiResponse;

        if (Array.isArray(result.data)) {
          setPosts(result.data);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (err) {
        let message = "Unknown error";
        if (err instanceof Error) message = err.message;
        setError(message);
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleFilterTitleChange = (value: PostKey) => {
    setFilterTitle(value);
    setPage(1);
  };

  const handleFilterValueChange = (value: string) => {
    setFilterValue(value);
    setPage(1);
  };

  const filteredPosts = useMemo(() => {
    const query = filterValue.trim().toLowerCase();

    if (!query) return posts;

    return posts.filter((post) => {
      const value = post[filterTitle];

      return String(value ?? "")
        .toLowerCase()
        .includes(query);
    });
  }, [posts, filterTitle, filterValue]);

  const sortedPosts = useMemo(() => {
    if (!sortConfig.key) return filteredPosts;

    const sortKey = sortConfig.key;

    return [...filteredPosts].sort((a, b) => {
      const aValue = a[sortKey] ?? "";
      const bValue = b[sortKey] ?? "";

      const result = String(aValue).localeCompare(String(bValue), "en", {
        sensitivity: "base",
      });

      return sortConfig.order === "asc" ? result : -result;
    });
  }, [sortConfig, filteredPosts]);

  const handleSort = (key: PostKey) => {
    setPage(1);
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const totalPageCount = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
  );

  const { handleNextClick, handlePrevClick } = useThrottlePages({
    page,
    totalPageCount,
    onPageChange: setPage,
    delay: 500,
  });

  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  const currentPosts = sortedPosts.slice(startIndex, endIndex);

  return (
    <>
      <Filter
        onFilterValueChange={handleFilterValueChange}
        onFilterTitleChange={handleFilterTitleChange}
        filterTitle={filterTitle}
        filterValue={filterValue}
      />
      {posts.length !== 0 && (
        <div className="table">
          <div className="thead">
            <div className="tr">
              <div className="th sort-btn" onClick={() => handleSort("author")}>
                Author
              </div>
              <div className="th sort-btn" onClick={() => handleSort("title")}>
                Title
              </div>
              <div className="th sort-btn" onClick={() => handleSort("genre")}>
                Genre
              </div>
              <div
                className="th sort-btn"
                onClick={() => handleSort("content")}
              >
                Content
              </div>
            </div>
          </div>
          <div className="tbody">
            <List
              rowComponent={RowComponent}
              rowCount={currentPosts.length}
              rowHeight={rowHeight}
              rowProps={{ posts: currentPosts }}
              overscanCount={2}
              style={{
                height: VISIBLE_ROWS * DEFAULT_ROW_HEIGHT,
                overflow: "auto",
              }}
            />
          </div>
        </div>
      )}
      {isLoading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}
      <div className="controls">
        {posts.length !== 0 && (
          <Pagination
            current={page}
            total={totalPageCount}
            onNextPageClick={handleNextClick}
            onPrevPageClick={handlePrevClick}
            disable={{ left: page === 1, right: page === totalPageCount }}
          />
        )}
      </div>
    </>
  );
}

export default App;
