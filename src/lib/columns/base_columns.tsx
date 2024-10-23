import { Row } from "@tanstack/react-table";
import { useState } from 'react';
import { Primitive } from "zod";
import { NumberFormatValues, NumericFormat, NumericFormatProps } from "react-number-format";
import { ComparatorPrimitive } from "@/domains/types";
import { useUpdateListItem } from "./hooks";
import { GlobalInputProps } from "@/components/app/global-inputs/types";

export type BaseEditableCellProps<T extends ComparatorPrimitive, C extends Primitive> = {
  row: Row<T>
} & GlobalInputProps<T, C>

export type NumericEditableCellProps<T extends ComparatorPrimitive, C extends Primitive> = {

  numericformatProps: NumericFormatProps
} & BaseEditableCellProps<T, C>

export type EditableCellProps<T, C extends Primitive> = BaseEditableCellProps<T, C> & {
  updateListItem: (proposedValue: string, row: Row<T>, fieldName: keyof T, mapValue: (proposedValue: string) => C, validate: (proposedValue: C) => boolean) => C
}

export const StringCell = <T extends ComparatorPrimitive>({ row, fieldName, mapValue, state }: BaseEditableCellProps<T, string>) => {
  const updateListItem = useUpdateListItem(state);
  const [value, setValue] = useState<string | undefined>(row.getValue(fieldName));

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const updatedValue = mapValue(e.target.value);
    updateListItem(updatedValue, row, fieldName);
  }

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      className="bg-white"
    />
  )
}

export const NumericCell = <T extends ComparatorPrimitive>({ row, fieldName, mapValue, state, numericformatProps, displayValue }: NumericEditableCellProps<T, number>): React.ReactElement => {
  const updateListItem = useUpdateListItem(state);
  const [values, setValues] = useState<NumberFormatValues>();

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { floatValue } = values;

    const mappedValue = mapValue ? mapValue(floatValue) : floatValue;
    updateListItem(mappedValue, row, fieldName);
  }

  return (
    <NumericFormat
      onValueChange={(values) => setValues(values)}
      onBlur={handleBlur}
      className="bg-white"
      {...numericformatProps}
      value={displayValue ? displayValue(row.getValue(fieldName)) : row.getValue(fieldName)}
    />
  )
}
