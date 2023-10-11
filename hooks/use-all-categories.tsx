import { queryClient } from "../clients";
import { getOwnAllCategories } from "../apis";
import useAppContext from "./use-app-context";
import { useEffect } from "react";
import { getDataFromQueryCache } from "../utils";

export default function useAllCategories() {
  const context = useAppContext();
  const [allCategories, setAllCategories] = context.categories;
  let allCategoriesData: any = getDataFromQueryCache(["allCategories"]);
  useEffect(() => {
    if (allCategories?.length === 0) {
      const fromSession = sessionStorage.getItem("allCategories");
      if (fromSession) {
        setAllCategories(JSON.parse(fromSession));
      } else {
        const catCol = allCategoriesData?.categoriesCollection?.items;
        if (catCol) {
          setAllCategories(catCol);
          sessionStorage.setItem("allCategories", JSON.stringify(catCol));
        } else {
          getOwnAllCategories().then((res) => {
            queryClient.setQueryData(["allCategories"], () => res);
            const dataCol = res?.categoriesCollection?.items;
            if (dataCol) {
              setAllCategories(dataCol);
              sessionStorage.setItem("allCategories", JSON.stringify(dataCol));
            }
          });
        }
      }
    }
  }, [allCategories?.length, allCategoriesData?.categoriesCollection?.items, setAllCategories]);
  return [allCategories, setAllCategories] as [typeof allCategories, typeof setAllCategories];
}
