import InfiniteScroll from "react-infinite-scroller";
import { Species } from "../species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
  const response = await fetch(url);
  return response.json();
};

export function InfiniteSpecies() {
  // TODO: get data for InfiniteScroll via React Query
  return <InfiniteScroll />;
}
