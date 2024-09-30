import { Row } from "@tanstack/react-table";
import { useState } from 'react';
import { useRecoilState } from "recoil";
import { displayNumber } from "@/domains/offers/utils";
import { jobOffersState } from "@/domains/offers/atoms";

export interface EditableNumberCellProps<T> {
  row: Row<T>
  fieldName: string
  options: Intl.NumberFormatOptions
  fallback?: string
  handleBlur: (row: Row<T>, fieldName: string, proposedValue: string, setValue: (value: string) => void, options: Intl.NumberFormatOptions) => void
}


export const EditableNumberCell = <T extends { id: string }>({ row, fieldName, options, fallback = '-', handleBlur }: EditableNumberCellProps<T>) => {
  const rawValue: string = row.getValue(fieldName)
  const parsedNumber = displayNumber(rawValue, undefined, options)
  const [v, setV] = useState(parsedNumber)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setV(e.target.value)
  }

  return <input
    className="text-left"
    value={v}
    onSubmit={() => handleBlur(row, fieldName, v, setV, options)}
    onChange={handleChange}
    onBlur={() => handleBlur(row, fieldName, v, setV, options)}
  />
}
