export const formatNumber = (options: Intl.NumberFormatOptions) => (value: number): string => {
  return value ? new Intl.NumberFormat("en-US", options).format(value) : "";
}

export const formatPreciseCurrency = (value: number): string => value ? `$${formatInteger(value)}` : "";
export const formatLargeCurrency = formatNumber({ style: "currency", currency: "USD", maximumFractionDigits: 0 });
export const formatInteger = formatNumber({ useGrouping: true, maximumFractionDigits: 0 });
// export const formatPercentage = (value: number) => formatNumber({ style: "percent", maximumFractionDigits: 4, minimumFractionDigits: 2 });
export const formatPercentage = formatNumber({ style: "percent", maximumFractionDigits: 4, minimumFractionDigits: 2 });

export const softFormat = (prefix?: string) => (val: string | undefined): string => {
  if (val === undefined || val === '') return '';

  if (val && !isNaN(parseFloat(val)) && val.endsWith('.')) {
    return `${prefix || ''}${Number(val).toLocaleString()}.`;
  }

  if (val && !isNaN(parseFloat(val)) && val.endsWith('.0')) {
    return `${prefix || ''}${Number(val).toLocaleString()}.0`;
  }

  if (val && !isNaN(parseFloat(val))) {
    return `${prefix || ''}${Number(val).toLocaleString()}`;
  }

  if (val && !isNaN(parseFloat(val))) {
    console.log("PARSED FLAOT: ", val);
    return formatNumber({ useGrouping: true })(parseFloat(val));
  }

  console.log("WTF: ", val);
  return val

}

