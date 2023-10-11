import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

interface BestCategory {
  name: string;
  products: string[];
}
interface Category {
  title: string;
  picture: { url: string };
}
interface AppContextProps {
  categories: [Category[], Dispatch<SetStateAction<Category[]>>];
  bestCategory: [BestCategory, Dispatch<SetStateAction<BestCategory>>];
}
const contextInit: AppContextProps = {
  categories: [[], () => void 0],
  bestCategory: [{ name: "Loading...", products: [] }, () => void 0]
};
export const WholeAppContext = createContext<AppContextProps>(contextInit);

export function AppContext(props: PropsWithChildren) {
  const [allCategories, setAllCategories] = useState<Category[]>(contextInit.categories[0]);
  const [bestCategory, setBestCategory] = useState<BestCategory>(contextInit.bestCategory[0]);
  const { children } = props;
  return (
    <WholeAppContext.Provider
      value={{
        categories: [allCategories, setAllCategories],
        bestCategory: [bestCategory, setBestCategory]
      }}
    >
      {children}
    </WholeAppContext.Provider>
  );
}
