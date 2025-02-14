import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { PostDetail } from "../post-detail";
import { PostInterface } from "../../interfaces/post";
import { PostsService } from "../../services/posts-service";

const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<PostInterface>(null);

  const postsService = PostsService.getInstance();

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<PostInterface[]>({
    queryKey: ["get-posts"],
    queryFn: () => postsService.getPosts({ pageNum: 1 }),
  });

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
        <button disabled onClick={() => {}}>
          Previous page
        </button>
        <span>Page {currentPage + 1}</span>
        <button disabled onClick={() => {}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} />}
    </>
  );
}
