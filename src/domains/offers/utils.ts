export const displayNumber = (rawValue: string, fallback: string | undefined, options: Intl.NumberFormatOptions): string | undefined => {
  if (!rawValue) return fallback
  const fieldValue = parseFloat(rawValue)
  return new Intl.NumberFormat("en-US", options).format(fieldValue)
}
