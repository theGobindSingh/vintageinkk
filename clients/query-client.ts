import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10 //10 mins,
      // staleTime: 1000 * 5,
    }
  }
});
