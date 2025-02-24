import { useCallback, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { PostDetail } from "../post-detail";
import { PostInterface } from "../../interfaces/post";
import { PostsService } from "../../services/posts-service";

const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPost, setSelectedPost] = useState<PostInterface>(null);

  const postsService = PostsService.getInstance();

  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<PostInterface[]>({
    queryKey: ["get-posts", currentPage],
    queryFn: () => postsService.getPosts({ pageNum: currentPage }),
    staleTime: 2000,
  });

  useEffect(() => {
    const hasNextPage = currentPage < maxPostPage;

    if (hasNextPage) {
      const nextPage = currentPage + 1;

      queryClient.prefetchQuery({
        queryKey: ["get-posts", nextPage],
        queryFn: () => postsService.getPosts({ pageNum: nextPage }),
      });
    }
  }, [currentPage, queryClient.prefetchQuery]);

  const renderPosts = useCallback(() => {
    const hasError = isError || !posts;

    if (isLoading) {
      return <span>Loading...</span>;
    }

    if (hasError) {
      return <span>{error.message}</span>;
    }

    return posts.map((post) => (
      <li
        key={post.id}
        className="post-title"
        onClick={() => setSelectedPost(post)}
      >
        {post.title}
      </li>
    ));
  }, [posts, isLoading, isError, error]);

  return (
    <>
      <ul>{renderPosts()}</ul>
      <div className="pages">
        <button
          disabled={currentPage == 1}
          onClick={() => {
            setCurrentPage((prevPage) => prevPage - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage >= maxPostPage}
          onClick={() => {
            setCurrentPage((prevPage) => prevPage + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
