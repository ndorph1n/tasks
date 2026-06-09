import type { RowCompProps } from "../types/types";

export default function RowComponent({ index, style, posts }: RowCompProps) {
  const post = posts[index];

  if (!post) return null;

  return (
    <div style={style} className="tr">
      <div className="th">{post.author}</div>
      <div className="th">{post.title}</div>
      <div className="th">{post.genre}</div>
      <div className="th">{post.content}</div>
    </div>
  );
}
