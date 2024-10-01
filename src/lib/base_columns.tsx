import { ColumnDef, Row } from "@tanstack/react-table";
import { ReactNode, useState } from 'react';
import { displayNumber } from "@/domains/offers/utils";
import { JobOffer } from "@/domains/offers/types";
import { useRecoilState } from "recoil";
import { jobOffersState } from "@/domains/offers/atoms";

export interface EditableJobOfferCellProps<T> {
  row: Row<JobOffer>
  fieldName: string
  mapValue: (proposedValue: string) => T
  validate: (proposedValue: T) => Boolean
  formatter: (value: T) => string
}

export interface EditableNumberCellProps<T> {
  row: Row<T>
  fieldName: string
  options: Intl.NumberFormatOptions
  handleBlur: (row: Row<T>, fieldName: string, proposedValue: string, setValue: (value: string) => void, options: Intl.NumberFormatOptions) => void
  fallback?: string
}

export const EditableJobOfferColumn: React.FC<EditableJobOfferCellProps<T>> = ({ row, fieldName, formatter, mapValue, validate }) => {
  const [jobOffers, setJobOffers] = useRecoilState(jobOffersState);

  const rawValue: string = row.getValue(fieldName)
  const [value, setValue] = useState(formatter(rawValue))

  const commitOrRollbackChange = (proposedValue: string) => {
    const updatedValue = mapValue(proposedValue);
    if (validate(updatedValue)) {

      // Update central state
      const updatedJobOffers = jobOffers.map(offer =>
        offer.id === row.original.id ? { ...offer, [fieldName]: updatedValue } : offer
      );
      setJobOffers(updatedJobOffers);

      // Update local cell state
      setValue(formatter(updatedValue));
    } else {
      console.log("Invalid value, resetting");
      const offer = jobOffers.find(offer => offer.id === row.original.id);
      setValue(formatter(offer?.[fieldName as keyof JobOffer] as string));
    }
  }

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => commitOrRollbackChange(value)}
    />
  )
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
    onSubmit={() => handleBlur(row, fieldName, v, setV)}
    onChange={handleChange}
    onBlur={() => handleBlur(row, fieldName, v, setV)}
  />
}
