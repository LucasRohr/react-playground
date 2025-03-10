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
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<PageInterface, PersonInterface>({
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
    if (!data) {
      return null;
    }

    return data.pages.map((page, pageIndex) => {
      return page.results.map(({ name, hair_color, eye_color }, index) => {
        const personProps = {
          name,
          hairColor: hair_color,
          eyeColor: eye_color,
        };

        return <Person key={pageIndex + index} {...personProps} />;
      });
    });
  }, [data]);

  return (
    <InfiniteScroll hasMore={hasNextPage} loadMore={fetchPage}>
      {renderPages()}
    </InfiniteScroll>
  );
}
