import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { Person } from "../person";
import { PersonInterface } from "../../../interfaces/person";
import { PageInterface } from "../../../interfaces/page";

const initialUrl = "https://swapi.dev/api/people/";

const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfinitePeople() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isError,
  } = useInfiniteQuery<PageInterface, PersonInterface>({
    queryKey: ["get-people-paginated"], // Sets the key
    queryFn: ({ pageParam }) => fetchUrl(pageParam), // Fetch function passing the pageParam
    getNextPageParam: (lastPage) => lastPage.next || undefined, // To get the next page param, return from the last page or return undefined
    initialPageParam: initialUrl, // Sets the initial pageParam
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

      return page.results.map(({ name, hair_color, eye_color }, index) => {
        const personProps = {
          name,
          hairColor: hair_color,
          eyeColor: eye_color,
        };

        return <Person key={pageIndex + index} {...personProps} />;
      });
    });
  }, [data, isLoading, isFetchingNextPage, error, isError]);

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={fetchPage}>
      {renderPages()}
    </InfiniteScroll>
  );
}
