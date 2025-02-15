import { useContext } from "react";
import { typeSelectContext } from "../components/TypeSelect/TypeSelect";

export function useTypeSelect() {
  return useContext(typeSelectContext);
}
