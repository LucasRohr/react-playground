import { useQuery } from "@tanstack/react-query";

import { PostsService } from "../../services/posts-service";

import { PostDetailsProps } from "./types";
import "./PostDetail.css";
import { useCallback } from "react";

export function PostDetail({ post }: PostDetailsProps) {
  const postsService = PostsService.getInstance();

  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["get-post-comments", post.id],
    queryFn: () => postsService.getComments({ postId: post.id }),
  });

  const renderComments = useCallback(() => {
    const hasError = isError || !comments;

    if (isLoading) {
      return <span>Loading</span>;
    }

    if (hasError) {
      return <span>{error.message}</span>;
    }

    return comments.map((comment) => (
      <li key={comment.id}>
        {comment.email}: {comment.body}
      </li>
    ));
  }, [comments, isError, error, isLoading]);

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button>Delete</button> <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {renderComments()}
    </>
  );
}
