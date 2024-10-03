export const validateNumber = (proposedValue: number): boolean => {
  return !isNaN(proposedValue);
}

export const mapNumber = (proposedValue: string): number => {
  return parseFloat(proposedValue.replace(/[^0-9.-]+/g, ""));
};

export const formatNumber = (options: Intl.NumberFormatOptions) => (value: number): string => {
  return value ? new Intl.NumberFormat("en-US", options).format(value) : "-";
}

export const validateString = (proposedValue: string): boolean => {
  return proposedValue !== undefined && proposedValue.trim().length > 0;
}

export const mapString = (proposedValue: string): string => {
  return proposedValue.trim();
};

export function identity<T>(value: T): T {
  return value;
}
