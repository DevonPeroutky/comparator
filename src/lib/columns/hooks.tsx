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

      // Update central state
      const updatedJobOffers = items.map(item =>
        item.id === row.original.id ? { ...item, [fieldName]: updatedValue } : item
      );
      setItems(updatedJobOffers);

      // Update local cell state
      // setValue(formatter(updatedValue));
      return updatedValue;
    } else {
      // console.log("Invalid value, resetting");
      const item = items.find(item => item.id === row.original.id);
      // setValue(formatter(item?.[fieldName as keyof JobOffer] as string));
      return item?.[fieldName as keyof JobOffer] as string;
    }
  }
}

export const useUpdateKeyValuePairChanges = <K extends string, V extends ComparatorPrimitive, C extends Primitive>(recoilState: RecoilState<Record<K, V[]>>) => {
  const [items, setItems] = useRecoilState<Record<K, V[]>>(recoilState);
  const updateKeyValueListPair = useUpdateKeyValueListPair(recoilState);


  return (proposedValue: string, row: Row<T>, fieldName: string, mapValue: (proposedValue: string) => C, validate: (proposedValue: C) => boolean): C => {
    const updatedValue = mapValue(proposedValue);
    if (validate(updatedValue)) {

      // Update central state
      const updatedJobOffers = items.map(item =>
        item.id === row.original.id ? { ...item, [fieldName]: updatedValue } : item
      );
      setItems(updatedJobOffers);

      // Update local cell state
      // setValue(formatter(updatedValue));
      return updatedValue;
    } else {
      // console.log("Invalid value, resetting");
      const item = items.find(item => item.id === row.original.id);
      // setValue(formatter(item?.[fieldName as keyof JobOffer] as string));
      return item?.[fieldName as keyof JobOffer] as string;
    }
  }
}


export const useUpdateKeyValueListPair = <V extends ComparatorPrimitive>(recoilState: RecoilState<Record<string, V[]>>) => {
  const [items, setItems] = useRecoilState(recoilState);

  return (key: string, newValue: V) => {
    setItems((prevMap) => ({
      ...prevMap,
      [key]: prevMap[key]?.map(item => item.id === newValue.id ? newValue : item) || []
    }));
  };
}
