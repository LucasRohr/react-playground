import InfiniteScroll from "react-infinite-scroller";
import { Species } from "../species";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PageInterface } from "../../../interfaces/page";
import { useCallback } from "react";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<PageInterface<any>>({
    queryKey: ["get-species-paginated"],
    queryFn: ({ pageParam }) => fetchUrl(pageParam),
    getNextPageParam: (lastPage) => lastPage.next || undefined,
    initialPageParam: initialUrl,
  });

  const fetchPage = useCallback(() => {
    if (!isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isFetchingNextPage, fetchNextPage]);

  const renderPages = useCallback(() => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <span>{error}</span>;
    }

    if (!data) {
      return <span>No Star Wars data to present :(</span>;
    }

    return data.pages.map((page, pageIndex) => {
      const isLastPage = pageIndex === data.pages.length - 1;
      const shouldShowLoader = isFetchingNextPage && isLastPage;

      if (shouldShowLoader) {
        return <div>Loading...</div>;
      }

      return page.results.map(
        ({ name, language, average_life_span }, index) => {
          const personProps = {
            name,
            language: language,
            averageLifespan: average_life_span,
          };

          return <Species key={pageIndex + index} {...personProps} />;
        }
      );
    });
  }, [data, isLoading, isFetchingNextPage, error, isError]);

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={fetchPage}>
      {renderPages()}
    </InfiniteScroll>
  );
}
