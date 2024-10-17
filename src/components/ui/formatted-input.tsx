import { Input } from "./input";
import { ColumnFormattingOptions } from "@/lib/columns/types";
import { useEffect, useState } from "react";
import { Primitive } from "zod";

export interface FormattedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formatOptions: ColumnFormattingOptions<Primitive>
}

export const FormattedInput: React.FC<FormattedInputProps> = ({ placeholder, value, onChange, formatOptions, onBlur: propOnBlur }) => {
  const { formatter, mapValue, softFormat, validate } = formatOptions;
  const [localValue, setLocalValue] = useState(formatter(value));

  useEffect(() => {
    if (!localValue) {
      setLocalValue(formatter(value));
    }
  }, [value, formatter]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[$,%]/g, '');
    const isValidInput = /\d*(\.\d*)?$/.test(inputValue);
    if (isValidInput) {
      const mappedValue = mapValue(inputValue)

      if (validate(mappedValue) && (e.target.value.endsWith('.') || e.target.value.endsWith('0'))) {
        console.log(`Updating value: ${mappedValue}`);
        setLocalValue(e.target.value)
        onChange(mappedValue);
      } else if (validate(mappedValue)) {
        console.log(`CHANGIN? `, mappedValue)
        setLocalValue(e.target.value)
        onChange(mappedValue);
      } else {
        console.log(`local? `)
        setLocalValue(e.target.value);
      }
    }
  }

  return (
    <Input
      placeholder={placeholder}
      value={localValue}
      onChange={handleChange}
    // onBlur={() => onBlur(value)}
    />
  );
}
