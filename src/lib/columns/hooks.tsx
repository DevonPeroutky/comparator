import { JobOffer } from "@/domains/offers/types";
import { ComparatorPrimitive } from "@/domains/types";
import { Row } from "@tanstack/react-table";
import { RecoilState, useRecoilState } from "recoil";
import { Primitive } from "zod";

export const useUpdateListItemChanges = <T extends ComparatorPrimitive, C extends Primitive>(recoilState: RecoilState<T[]>) => {
  const [items, setItems] = useRecoilState<T[]>(recoilState);


  return (proposedValue: string, row: Row<T>, fieldName: string, mapValue: (proposedValue: string) => C, validate: (proposedValue: C) => boolean): C => {
    const updatedValue = mapValue(proposedValue);
    if (validate(updatedValue)) {

      const updatedJobOffers = items.map(item =>
        item.id === row.original.id ? { ...item, [fieldName]: updatedValue } : item
      );
      setItems(updatedJobOffers);

      return updatedValue;
    } else {
      const item = items.find(item => item.id === row.original.id);
      return item?.[fieldName as keyof JobOffer] as string;
    }
  }
}
