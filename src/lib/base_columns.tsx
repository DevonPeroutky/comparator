import { Row } from "@tanstack/react-table";
import { Dispatch, SetStateAction, useState } from 'react';
import { JobOffer } from "@/domains/offers/types";
import { RecoilState, useRecoilState } from "recoil";
import { ComparatorPrimitive } from "@/domains/types";
import { Primitive } from "zod";

export const validateNumber = (proposedValue: number): Boolean => {
  return !isNaN(proposedValue);
}

export const mapNumber = (proposedValue: string): number => {
  return parseFloat(proposedValue.replace(/[^0-9.-]+/g, ""));
};

export const formatNumber = (options: Intl.NumberFormatOptions) => (value: string): string => {
  return value ? new Intl.NumberFormat("en-US", options).format(parseFloat(value)) : "-";
}

export const validateString = (proposedValue: string): Boolean => {
  return proposedValue !== undefined && proposedValue.trim().length > 0;
}

export const mapString = (proposedValue: string): string => {
  return proposedValue.trim();
};

export function identity<T>(value: T): T {
  return value;
}

export interface EditableCellProps<T> {
  row: Row<T>
  recoilState: RecoilState<T[]>
  fieldName: string
  mapValue: (proposedValue: string) => Primitive
  validate: (proposedValue: Primitive) => Boolean
  formatter: (value: Primitive) => string
}

const useCommitToList = <T extends ComparatorPrimitive>(recoilState: RecoilState<T[]>, fieldName, formatter, mapValue, validate, recoilState) => {
  const [items, setItems] = useRecoilState<T[]>(recoilState);

  return (id: string, proposedValue: string, setValue: Dispatch<SetStateAction<string>>) => {
    const updatedValue = mapValue(proposedValue);
    if (validate(updatedValue)) {

      // Update central state
      const updatedJobOffers = items.map(item =>
        item.id === id ? { ...item, [fieldName]: updatedValue } : item
      );
      setItems(updatedJobOffers);

      // Update local cell state
      setValue(formatter(updatedValue));
    } else {
      console.log("Invalid value, resetting");
      const item = items.find(item => item.id === id);
      setValue(formatter(item?.[fieldName as keyof JobOffer] as string));
    }
  }
}

export const EditableCell = <T extends ComparatorPrimitive>({ row, fieldName, formatter, mapValue, validate, recoilState }: EditableCellProps<T>) => {
  const [items, setItems] = useRecoilState<T[]>(recoilState);

  const rawValue: string = row.getValue(fieldName)
  const [value, setValue] = useState(formatter(rawValue))

  const commitOrRollbackChange = (proposedValue: string) => {
    const updatedValue = mapValue(proposedValue);
    if (validate(updatedValue)) {

      // Update central state
      const updatedJobOffers = items.map(item =>
        item.id === row.original.id ? { ...item, [fieldName]: updatedValue } : item
      );
      setItems(updatedJobOffers);

      // Update local cell state
      setValue(formatter(updatedValue));
    } else {
      console.log("Invalid value, resetting");
      const item = items.find(item => item.id === row.original.id);
      setValue(formatter(item?.[fieldName as keyof JobOffer] as string));
    }
  }

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => commitOrRollbackChange(value)}
    />
  )
}
