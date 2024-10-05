import { formatInteger, formatLargeCurrency, formatPercentage, formatPreciseCurrency, softFormat } from "../format_utils";
import { mapNumber, mapPercentage, mapString, validateNumber, validateString } from "./column_utils";
import { ColumnFormattingOptions } from "./types";

export const StringColumnFormatOptions: ColumnFormattingOptions<string> = {
  formatter: mapString,
  mapValue: mapString,
  validate: validateString,
  softFormat: mapString,
}

const BaseNumberColumnFormatOptions: ColumnFormattingOptions<number> = {
  formatter: formatInteger,
  mapValue: mapNumber,
  validate: validateNumber,
  softFormat: softFormat()
}

export const PercentageColumnFormatOptions: ColumnFormattingOptions<number> = {
  ...BaseNumberColumnFormatOptions,
  mapValue: mapPercentage,
  formatter: formatPercentage,
  softFormat: softFormat('')
}

export const PreciseCurrencyColumnFormatOptions: ColumnFormattingOptions<number> = {
  ...BaseNumberColumnFormatOptions,
  formatter: formatPreciseCurrency,
  softFormat: softFormat('$')
}

export const LargeCurrencyColumnFormatOptions: ColumnFormattingOptions<number> = {
  ...BaseNumberColumnFormatOptions,
  formatter: formatLargeCurrency,
  softFormat: softFormat('$')
}

export const IntegerColumnFormatOptions: ColumnFormattingOptions<number> = {
  ...BaseNumberColumnFormatOptions,
  formatter: formatInteger,
  softFormat: softFormat('')
}
