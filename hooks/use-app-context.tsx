import { useContext } from "react";
import { WholeAppContext } from "../context/app-context";

export default function useAppContext() {
  const context = useContext(WholeAppContext);
  return context;
}
