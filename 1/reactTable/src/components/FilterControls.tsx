import type { FilterProps, PostKey } from "../types/types";

export default function FilterControls({
  onFilterTitleChange,
  onFilterValueChange,
  filterValue,
  filterTitle,
}: FilterProps) {
  return (
    <div className="filters">
      <select
        value={filterTitle}
        name="column"
        className="filter-item"
        aria-label="filter column"
        onChange={(e) => onFilterTitleChange(e.target.value as PostKey)}
      >
        <option value="author">Author</option>
        <option value="title">Title</option>
        <option value="genre">Genre</option>
      </select>
      <input
        type="text"
        className="filter-input"
        value={filterValue}
        aria-label="filter value"
        onChange={(e) => onFilterValueChange(e.target.value)}
      />
    </div>
  );
}
