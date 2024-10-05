import { Primitive } from "zod";

export type ColumnFormattingType = 'string' | 'large_currency' | 'precise_currency' | 'integer' | 'percentage';

export type ColumnFormattingOptions<C extends Primitive> = {
  formatter: (value: C) => string
  mapValue: (value: string) => C
  validate: (value: C) => boolean
  softFormat: (val: string | undefined) => string
}
