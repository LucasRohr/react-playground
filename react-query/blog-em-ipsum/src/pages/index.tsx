import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Posts } from "../components/posts";
import "./App.css";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}
