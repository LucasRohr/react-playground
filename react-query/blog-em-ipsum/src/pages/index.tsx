import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Posts } from "../components/posts";
import "./App.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <div className="App">
        <h1>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}
