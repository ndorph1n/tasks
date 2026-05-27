import useDebounceValue from "../hooks/useDebounceValue";

export default function FilterControls({
  onFilterTitleChange,
  onFilterValueChange,
  filterValue,
  filterTitle,
}) {
  return (
    <div className="filters">
      <select
        value={filterTitle}
        name="column"
        className="filter-item"
        onChange={(e) => onFilterTitleChange(e.target.value)}
      >
        <option value="author">Author</option>
        <option value="title">Title</option>
        <option value="genre">Genre</option>
      </select>
      <input
        type="text"
        className="filter-input"
        value={filterValue}
        onChange={(e) => onFilterValueChange(e.target.value)}
      />
    </div>
  );
}
