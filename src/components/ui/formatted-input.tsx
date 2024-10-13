import { useState } from "react";
import { Input } from "./input";
import { ColumnFormattingOptions } from "@/lib/columns/types";
import { Primitive } from "zod";

export interface FormattedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formatOptions: ColumnFormattingOptions<Primitive>
}


export const FormattedInput: React.FC<FormattedInputProps> = ({ placeholder, value, onChange, formatOptions, onBlur: propOnBlur }) => {
  const { formatter, mapValue, softFormat } = formatOptions;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/^\$/, '').replace(/,/g, ''); // Remove leading $ and commas
    const isValidNumber = /^-?\d*\.?\d*$/.test(inputValue);

    console.log("RAW VALUE: ", inputValue, '->', isValidNumber);
    if (isValidNumber) {
      const newValue = inputValue ? mapValue(inputValue) : '';
      onChange(newValue);
    }
  }
  return (
    <Input
      placeholder={placeholder}
      value={formatter(value)}
      onChange={handleChange}
      onBlur={propOnBlur}
    />
  );
}
