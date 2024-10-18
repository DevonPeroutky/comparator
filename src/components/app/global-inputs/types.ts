import { ComparatorPrimitive } from "@/domains/types"
import { WritableAtom } from "jotai"
import { NumericFormatProps } from "react-number-format"
import { Primitive } from "zod"

export type GlobalInputProps<T extends ComparatorPrimitive, C extends Primitive> = {
  state: WritableAtom<T[], unknown[], unknown>
  fieldName: keyof T
  mapValue?: (proposedValue: C) => C
  displayValue?: (val: C) => C
}

export type GlobalNumericInputProps<T extends ComparatorPrimitive, C extends Primitive> = {
  numericformatProps: NumericFormatProps
} & GlobalInputProps<T, C>
