import { ComparatorPrimitive } from "@/domains/types"
import { GlobalNumericInputProps } from "./types";
import { useUpdateListItem } from "@/lib/columns/hooks";
import { useState } from "react";
import { NumberFormatValues, NumericFormat } from "react-number-format";

export const NumericCell = <T extends ComparatorPrimitive>({ fieldName, mapValue, state, numericformatProps }: GlobalNumericInputProps<T, number>): React.ReactElement => {
  const updateListItem = useUpdateListItem(state);
  const [values, setValues] = useState<NumberFormatValues>();

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { floatValue } = values;

    const mappedValue = mapValue ? mapValue(floatValue) : floatValue;
    updateListItem(mappedValue, row, fieldName);
  }

  return (
    <NumericFormat
      value={row.getValue(fieldName)}
      onValueChange={(values) => setValues(values)}
      onBlur={handleBlur}
      className="bg-white"
      {...numericformatProps}
    />
  )
}
