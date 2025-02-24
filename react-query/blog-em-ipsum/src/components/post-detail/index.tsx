import { useQuery } from "@tanstack/react-query";

import { PostsService } from "../../services/posts-service";

import { PostDetailsProps } from "./types";
import "./PostDetail.css";
import { useCallback } from "react";

export function PostDetail({
  post,
  deleteMutation,
  updateMutation,
}: PostDetailsProps) {
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

  const renderUpdateTitleStatus = useCallback(() => {
    const { isPending, isError, error, isSuccess } = updateMutation;

    if (isPending) {
      return <p>Updating post title...</p>;
    }

    if (isError) {
      return <p>Error while updating post title: {error.message}</p>;
    }

    if (isSuccess) {
      return <p>Post title was updated</p>;
    }
  }, [updateMutation]);

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      <button onClick={() => updateMutation.mutate(post.id)}>
        Update title
      </button>
      {renderDeleteStatus()}
      {renderUpdateTitleStatus()}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {renderComments()}
    </>
  );
}
