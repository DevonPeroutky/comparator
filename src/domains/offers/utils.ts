import { format } from "path"


export const displayNumber = (rawValue: string, fallback: string = "-", options: Intl.NumberFormatOptions): string => {
  if (!rawValue) return fallback
  const fieldValue = parseFloat(rawValue)
  return new Intl.NumberFormat("en-US", options).format(fieldValue)
}
