import { QueryKey } from "@tanstack/react-query";
import { queryClient } from "../clients";
export function getDataFromQueryCache(key: QueryKey) {
  const queryCache = queryClient.getQueryCache();
  const data = queryCache.find(key);
  return data?.state?.data as any;
}
