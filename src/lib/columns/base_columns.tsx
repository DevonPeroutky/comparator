import { Row } from "@tanstack/react-table";
import { useState } from 'react';
import { ComparatorPrimitive } from "@/domains/types";
import { Primitive } from "zod";
import { RecoilState } from "recoil";

export interface BaseEditableCellProps<T, C> {
  row: Row<T>
  fieldName: string
  formatter: (value: C) => string
  mapValue: (value: string) => C
  validate: (value: C) => boolean
}

export type EditableCellProps<T, C extends Primitive> = BaseEditableCellProps<T, C> & {
  updateListItem: (proposedValue: string, row: Row<T>, fieldName: string, mapValue: (proposedValue: string) => C, validate: (proposedValue: C) => boolean) => C
}

export const BaseEditableCell = <T, C extends Primitive>({ row, fieldName, formatter, mapValue, validate, updateListItem }: EditableCellProps<T, C>) => {
  const rawValue: C = row.getValue(fieldName)
  const [value, setValue] = useState<string>(formatter(rawValue))

  const commitOrRollbackChange = (proposedValue: string) => {
    const newValue: C = updateListItem(proposedValue, row, fieldName, mapValue, validate);
    setValue(formatter(newValue));
  }

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => commitOrRollbackChange(value)}
    />
    // <FormattedInputUnstyled
    //   value={value}
    //   onChange={(e) => setValue(e.target.value)}
    //   formatter="currency"
    //   onBlur={() => commitOrRollbackChange(value)}
    // />
  )
}

