import { FormattedInputProps } from "@/components/ui/formatted-input";
import { Row } from "@tanstack/react-table";
import { useState } from 'react';
import { Primitive } from "zod";
import { ColumnFormattingOptions } from "./types";

export interface BaseEditableCellProps<T, C extends Primitive> {
  row: Row<T>
  fieldName: keyof T
  formatOptions: ColumnFormattingOptions<C>
}

export type EditableCellProps<T, C extends Primitive> = BaseEditableCellProps<T, C> & {
  updateListItem: (proposedValue: string, row: Row<T>, fieldName: keyof T, mapValue: (proposedValue: string) => C, validate: (proposedValue: C) => boolean) => C
}

export const BaseEditableCell = <T, C extends Primitive>({ row, fieldName, formatOptions, updateListItem }: EditableCellProps<T, C>) => {
  const { formatter, mapValue, validate, softFormat } = formatOptions;

  const rawValue: C = row.getValue(fieldName)
  const [localValue, setLocalValue] = useState<string>(formatter(rawValue));

  // OnBlur
  const commitOrRollbackChange = (proposedValue: string) => {
    const finalizedValidValue: C = updateListItem(proposedValue, row, fieldName, mapValue, validate);
    console.log("FINALIZED VALUE: ", finalizedValidValue);
    console.log("FORMATTED VALUE: ", formatter(finalizedValidValue));
    setLocalValue(formatter(finalizedValidValue));
  }

  // OnChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[$,%]/g, '');

    console.log("RAW VALUE: ", rawValue);
    console.log("NUMERIC VALUE: ", rawValue);
    console.log("SOft formatted VALUE: ", softFormat(rawValue));

    if (rawValue === '' || /^[0-9]*\.?[0-9]*$/.test(rawValue)) {
      setLocalValue(rawValue);
    }
  };

  // console.log(`LOCAL ${fieldName} VALUE : `, localValue);
  const displayValue = localValue ? localValue : '';
  // console.log(`LOCAL ${fieldName} DIPLAY VALUE : `, displayValue);

  return (
    <input
      value={displayValue}
      onChange={(e) => handleChange(e)}
      onBlur={() => commitOrRollbackChange(displayValue)}
    />
  )
}

export const UnstyledFormattedInput: React.FC<FormattedInputProps> = ({ placeholder, value, onChange, formatter, onBlur: propOnBlur }) => {
  // const formatValue = (val: string | undefined): string => {
  //   if (val === undefined) return '';
  //
  //   switch (formatter) {
  //     case 'currency':
  //       return format_currency(val);
  //     case 'percentage':
  //       return val.toLocaleString();
  //     case 'number':
  //       return val ? `${Math.round(Number(val)).toLocaleString()}` : '';
  //     case 'valuation':
  //       return `$${Math.round(Number(val)).toLocaleString()}`;
  //   }
  // };

  const [displayValue, setDisplayValue] = useState(() => formatter(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[$,%]/g, '');
    const numericValue = parseFloat(rawValue);

    if (rawValue === '' || /^[0-9]*\.?[0-9]*$/.test(rawValue)) {
      setDisplayValue(formatter(rawValue));
    }

    if (numericValue && !isNaN(numericValue)) {
      onChange(numericValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (propOnBlur) {
      propOnBlur(e);
    }
    const numericValue = parseFloat(e.target.value.replace(/[$,%]/g, ''));
    setDisplayValue(formatter(numericValue));
  };

  return (
    <input
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};
