import { Input } from "@/components/ui/input";
import { ColumnDef, Row } from "@tanstack/react-table";
import { useState } from 'react';
import { useRecoilState } from "recoil";
import { jobOffersState } from "./atoms";
import { displayNumber } from "./utils";
import { Edit } from "lucide-react";

export type JobOffer = {
  id: string;
  company_name: string;
  salary: number;
  number_of_shares?: number;
  total_number_of_outstanding_shares?: number;
  percentage_ownership?: number;
  strike_price?: number;
  latest_company_valuation: number;
  vesting_years: number;
};

const EditableCurrencyCell: React.FC<{ row: Row<JobOffer>, fieldName: string, fall_back?: string, options?: Intl.NumberFormatOptions }> = ({ row, fieldName, options, fall_back = '-' }) => {
  const rawValue: string = row.getValue(fieldName)
  const parsedNumber = displayNumber(rawValue, '-', options)
  const [v, setV] = useState(parsedNumber)
  const [jobOffers, setJobOffers] = useRecoilState(jobOffersState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setV(e.target.value)
  }

  const handleBlur = () => {
    const updatedValue = parseFloat(v.replace(/[^0-9.-]+/g, ""))
    console.log(updatedValue)
    if (!isNaN(updatedValue)) {
      const updatedJobOffers = jobOffers.map(offer =>
        offer.id === row.original.id ? { ...offer, [fieldName]: updatedValue } : offer
      )
      setJobOffers(updatedJobOffers)
    } else {
      console.log("Invalid value, resetting")
      const offer = jobOffers.find(offer => offer.id === row.original.id)
      console.log(offer)
      setV(new Intl.NumberFormat("en-US", options).format(offer?.salary))
    }
  }

  return <input
    className="text-right"
    value={v}
    onSubmit={handleBlur}
    onChange={handleChange}
    onBlur={handleBlur}
  />
}

export const columns: ColumnDef<JobOffer>[] = [
  {
    accessorKey: "company_name",
    header: "Company Name",
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <EditableCurrencyCell fieldName="salary" row={row} options={{
      style: "currency",
      currency: "USD",
    }} />
  },
  {
    accessorKey: "number_of_shares",
    header: "Number of Shares",
    cell: ({ row }) => <EditableCurrencyCell fieldName="number_of_shares" row={row} options={{
      useGrouping: true,
      maximumFractionDigits: 0,
    }} />
  },
  {
    accessorKey: "latest_company_valuation",
    header: "Latest Company Valuation",
    cell: ({ row }) => <EditableCurrencyCell fieldName="latest_company_valuation" row={row} options={{
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }} />
  },
  {
    accessorKey: "strike_price",
    header: "Strike Price",
    cell: ({ row }) => <EditableCurrencyCell fieldName="strike_price" row={row} options={{
      style: "currency",
      currency: "USD",
    }} />
  },
  {
    accessorKey: "vesting_years",
    header: "Vesting Years",
    cell: ({ row }) => <EditableCurrencyCell fieldName="vesting_years" row={row} options={{
      useGrouping: true,
    }} />
  },
  {
    accessorKey: "percentage_ownership",
    header: "Percentage Ownership",
    cell: ({ row }) => <EditableCurrencyCell fieldName="percentage_ownership" row={row} options={{
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }} />
  },
  {
    accessorKey: "total_number_of_outstanding_shares",
    header: "Total Outstanding Shares",
    cell: ({ row }) => <EditableCurrencyCell fieldName="total_number_of_outstanding_shares" row={row} options={{
      useGrouping: true,
    }} />
  },
];
