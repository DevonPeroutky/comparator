import { useState } from "react";
import { Input } from "./input";

interface FormattedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  formatter: 'currency' | 'percentage' | 'number' | 'valuation'
}

const format_currency = (val: string | undefined): string => {
  if (val === undefined || val === '') return '';


  // Handle case where user is typing a decimal
  if (val && !isNaN(parseFloat(val)) && val.endsWith('.')) {
    return `$${Number(val).toLocaleString()}.`;
  }

  if (val && !isNaN(parseFloat(val)) && val.endsWith('.0')) {
    return `$${Number(val).toLocaleString()}.0`;
  }

  if (val && !isNaN(parseFloat(val))) {
    return `$${Number(val).toLocaleString()}`;
  }

  return val

}

export const FormattedInput: React.FC<FormattedInputProps> = ({ placeholder, value, onChange, formatter, onBlur: propOnBlur }) => {
  const formatValue = (val: string | undefined): string => {
    if (val === undefined) return '';

    switch (formatter) {
      case 'currency':
        return format_currency(val);
      case 'percentage':
        return val.toLocaleString();
      case 'number':
        return val ? `${Math.round(Number(val)).toLocaleString()}` : '';
      case 'valuation':
        return `$${Math.round(Number(val)).toLocaleString()}`;
    }
  };

  const [displayValue, setDisplayValue] = useState(() => formatValue(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[$,%]/g, '');
    const numericValue = parseFloat(rawValue);

    if (rawValue === '' || /^[0-9]*\.?[0-9]*$/.test(rawValue)) {
      setDisplayValue(formatValue(rawValue));
    }

    if (numericValue && !isNaN(numericValue)) {
      onChange(numericValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (formatter === 'percentage' && e.target.value) {
      const numericValue = parseFloat(e.target.value.replace(/[$,%]/g, ''));
      setDisplayValue(`${numericValue.toFixed(2)}%`);
    }
    if (propOnBlur) {
      propOnBlur(e);
    }
  };

  return (
    <Input
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export const FormattedInputUnstyled: React.FC<FormattedInputProps> = ({ placeholder, value, onChange, formatter, onBlur: propOnBlur }) => {
  const formatValue = (val: string | undefined): string => {
    if (val === undefined) return '';

    switch (formatter) {
      case 'currency':
        return format_currency(val);
      case 'percentage':
        return val.toLocaleString();
      case 'number':
        return val ? `${Math.round(Number(val)).toLocaleString()}` : '';
      case 'valuation':
        return `$${Math.round(Number(val)).toLocaleString()}`;
    }
  };

  const [displayValue, setDisplayValue] = useState(() => formatValue(value));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[$,%]/g, '');
    const numericValue = parseFloat(rawValue);

    if (rawValue === '' || /^[0-9]*\.?[0-9]*$/.test(rawValue)) {
      setDisplayValue(formatValue(rawValue));
    }

    if (numericValue && !isNaN(numericValue)) {
      onChange(numericValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (formatter === 'percentage' && e.target.value) {
      const numericValue = parseFloat(e.target.value.replace(/[$,%]/g, ''));
      setDisplayValue(`${numericValue.toFixed(2)}%`);
    }
    if (propOnBlur) {
      propOnBlur(e);
    }
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
