import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { InfinitePeople } from "./components/people/infinite-people";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Infinite SWAPI</h1>
        <InfinitePeople />
      </div>
    </QueryClientProvider>
  );
}

export default App;
