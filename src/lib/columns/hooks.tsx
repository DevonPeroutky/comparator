import { ComparatorPrimitive } from "@/domains/types";
import { Row } from "@tanstack/react-table";
import { Atom, useAtom } from "jotai";
import { Primitive } from "zod";

export const useUpdateListItem = <T extends ComparatorPrimitive, C extends Primitive>(atomState: Atom<T[]>) => {
  const [items, setItems] = useAtom<T[]>(atomState);

  return (proposedValue: C, row: Row<T>, fieldName: keyof T) => {
    const updatedJobOffers = items.map(item =>
      item.id === row.original.id ? { ...item, [fieldName]: proposedValue } : item
    );
    setItems(updatedJobOffers);
  }
}
