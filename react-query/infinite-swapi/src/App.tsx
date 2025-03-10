import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { InfinitePeople } from "./components/people/infinite-people";

import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <div className="App">
        <h1>Infinite SWAPI</h1>
        <InfinitePeople />
      </div>
    </QueryClientProvider>
  );
}

export default App;
