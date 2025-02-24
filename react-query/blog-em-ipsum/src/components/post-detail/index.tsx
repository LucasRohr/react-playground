import { useQuery } from "@tanstack/react-query";

import { PostsService } from "../../services/posts-service";

import { PostDetailsProps } from "./types";
import "./PostDetail.css";
import { useCallback } from "react";

export function PostDetail({ post, deleteMutation }: PostDetailsProps) {
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

  const renderDeleteStatus = useCallback(() => {
    const { isPending, isError, error, isSuccess } = deleteMutation;

    if (isPending) {
      return <p>Deleting post...</p>;
    }

    if (isError) {
      return <p>Error while deleting post: {error.message}</p>;
    }

    if (isSuccess) {
      return <p>Post was deleted</p>;
    }
  }, [deleteMutation]);

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      <button>Update title</button>
      {renderDeleteStatus()}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {renderComments()}
    </>
  );
}
