
export const formatNumber = (options: Intl.NumberFormatOptions) => (value: number): string => {
  return value ? new Intl.NumberFormat("en-US", options).format(value) : "-";
}

export const formatPreciseCurrency = formatNumber({ style: "currency", currency: "USD" });
export const formatLargeCurrency = formatNumber({ style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const formatInteger = formatNumber({ useGrouping: true, maximumFractionDigits: 0 });
export const formatPercentage = formatNumber({ style: "percent", maximumFractionDigits: 4, minimumFractionDigits: 2 });
