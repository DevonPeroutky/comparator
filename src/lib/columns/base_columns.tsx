import { Row } from "@tanstack/react-table";
import { useState } from 'react';
import { ComparatorPrimitive } from "@/domains/types";
import { Primitive } from "zod";
import { jobOffersState } from "@/domains/offers/atoms";
import { useUpdateListItemChanges } from "./hooks";
import { RecoilState } from "recoil";

export interface BaseEditableCellProps<T, C> {
  row: Row<T>
  fieldName: string
  formatter: (value: C) => string
  mapValue: (value: string) => C
  validate: (value: C) => boolean
}

export type EditableCellProps<T extends ComparatorPrimitive, C extends Primitive> = BaseEditableCellProps<T, C> & {
  updateListItem: (proposedValue: string, row: Row<T>, fieldName: string, mapValue: (proposedValue: string) => C, validate: (proposedValue: C) => boolean) => C
}

export type EditableCellBuilderProps<T extends ComparatorPrimitive, C extends Primitive> = BaseEditableCellProps<T, C> & {
  recoilState: RecoilState<T[]>
}

export const BaseEditableCell = <T extends ComparatorPrimitive, C extends Primitive>({ row, fieldName, formatter, mapValue, validate, updateListItem }: EditableCellProps<T, C>) => {
  const rawValue: C = row.getValue(fieldName)
  const [value, setValue] = useState<string>(formatter(rawValue))

  const commitOrRollbackChange = (proposedValue: string) => {
    // const updatedValue: C = mapValue(proposedValue);
    const newValue: C = updateListItem(proposedValue, row, fieldName, mapValue, validate);
    setValue(formatter(newValue));
  }

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      // onBlur={() => commitOrRollbackChange(value)}
      onBlur={() => commitOrRollbackChange(value)}
    />
  )
}

export const EditableCell = <T extends ComparatorPrimitive, C extends Primitive>({ row, fieldName, formatter, mapValue, validate, recoilState }: EditableCellBuilderProps<T, C>) => {
  return BaseEditableCell({ row, fieldName, formatter, mapValue, validate, updateListItem: useUpdateListItemChanges(recoilState) });
}
