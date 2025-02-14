import { PostDetailsProps } from "./types";

import "./PostDetail.css";
import { PostsService } from "../../services/posts-service";

export function PostDetail({ post }: PostDetailsProps) {
  const postsService = PostsService.getInstance();

  // replace with useQuery
  const data = [];

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
