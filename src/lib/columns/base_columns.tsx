import { FormattedInputProps } from "@/components/ui/formatted-input";
import { Row } from "@tanstack/react-table";
import { useState } from 'react';
import { Primitive } from "zod";
import { NumericFormatProps } from "react-number-format";

export type BaseEditableCellProps<T, C extends Primitive> = {
  row: Row<T>
  fieldName: keyof T
  mapValue: (proposedValue: C) => C
}

export type NumericEditableCellProps<T, C extends Primitive> = {
  numericformatProps: NumericFormatProps
} & BaseEditableCellProps<T, C>

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
    setLocalValue(formatter(finalizedValidValue));
  }

  // OnChange
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[$,%]/g, '');
    setLocalValue(rawValue);
  };

  const displayValue = localValue ? localValue : '';

  return (
    <input
      value={displayValue}
      onChange={(e) => handleChange(e)}
      onBlur={() => commitOrRollbackChange(displayValue)}
      className="bg-white"
    />
  )
}

export const UnstyledFormattedInput: React.FC<FormattedInputProps> = ({ placeholder, value, onChange, formatter, onBlur: propOnBlur }) => {

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
      className="bg-white"
    />
  );
};
