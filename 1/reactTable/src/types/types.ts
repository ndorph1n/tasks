import { type RowComponentProps } from "react-window";

export type Post = {
  title: string;
  author: string;
  genre: string;
  content: string;
};

export type PostKey = keyof Post;

export type SortOrder = "asc" | "desc";

export type SortConfig = {
  key: PostKey | null;
  order: SortOrder;
};

export type UseDebouncePagesProps = {
  page: number;
  totalPageCount: number;
  onPageChange: (newPage: number) => void;
  delay?: number;
};

export type FilterProps = {
  onFilterTitleChange: (title: PostKey) => void;
  onFilterValueChange: (value: string) => void;
  filterValue: string;
  filterTitle: PostKey;
};

type RowOwnProps = {
  posts: Post[];
};

export type RowCompProps = RowComponentProps<RowOwnProps>;

export type PaginationProps = {
  current: number;
  total: number;
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
};
