import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { List } from "react-window";
import Pagination from "./components/Pagination";
import RowComponent from "./components/RowComponent";
import Filter from "./components/FilterControls";

import useDebouncePages from "./hooks/useDebouncePages";

const TOTAL_POSTS = 500;
const POSTS_PER_PAGE = 25;
const VISIBLE_ROWS = 10;
const ROW_HEIGHT = 80;

function App() {
  const [posts, setPosts] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    order: "asc",
  });

  const [filterTitle, setFilterTitle] = useState("title");
  const [filterValue, setFilterValue] = useState("");

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `https://fakerapi.it/api/v2/texts?_quantity=${TOTAL_POSTS}`,
        );
        const result = await response.json();

        setPosts(result.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const handleFilterTitleChange = (value) => {
    setFilterTitle(value);
    // setPage(1);
  };

  const handleFilterValueChange = (value) => {
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

    return [...filteredPosts].sort((a, b) => {
      const aValue = a[sortConfig.key] ?? "";
      const bValue = b[sortConfig.key] ?? "";

      const result = String(aValue).localeCompare(String(bValue), "en", {
        sensitivity: "base",
      });

      return sortConfig.order === "asc" ? result : -result;
    });
  }, [sortConfig, filteredPosts]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === "asc" ? "desc" : "asc",
    }));
  };
  const totalPageCount = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const { handleNextClick, handlePrevClick } = useDebouncePages({
    page,
    totalPageCount,
    onPageChange: (newPage) => {
      setPage(newPage);
    },
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
              rowHeight={ROW_HEIGHT}
              rowProps={{ posts: currentPosts }}
              style={{
                height: (VISIBLE_ROWS / 2) * ROW_HEIGHT,
              }}
            />
          </div>
        </div>
      )}
      {isLoading && <div>Loading...</div>}
      <div className="controls">
        {posts.length !== 0 && (
          <Pagination
            current={page}
            total={totalPageCount ? totalPageCount : 1}
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
