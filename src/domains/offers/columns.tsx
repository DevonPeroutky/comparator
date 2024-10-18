import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PrivateJobOffer, PublicJobOffer } from "./types";
import { BaseEditableCellProps, NumericEditableCellProps } from "@/lib/columns/base_columns";
import { useUpdateListItem, useUpdateListItemChanges } from "@/lib/columns/hooks";
import { Primitive } from "react-hook-form";
import { jobOffersState } from "./atoms";
import { NumberFormatValues, NumericFormat, NumericFormatProps } from "react-number-format";
import { mapString } from "@/lib/columns/column_utils";

const JobOfferCell: React.FC<NumericEditableCellProps<PublicJobOffer | PrivateJobOffer, Primitive>> = ({ row, fieldName, numericformatProps, mapValue }) => {
  const updateListItem = useUpdateListItem(jobOffersState);
  const [values, setValues] = useState<NumberFormatValues>();

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { floatValue } = values;

    const mappedValue = mapValue ? mapValue(floatValue) : floatValue;
    updateListItem(mappedValue, row, fieldName);
  }

  return (
    <NumericFormat
      value={row.getValue(fieldName)}
      onValueChange={(values) => setValues(values)}
      onBlur={handleBlur}
      className="bg-white"
      {...numericformatProps}
    />
  )
}

const JobOfferStringCell: React.FC<BaseEditableCellProps<PublicJobOffer | PrivateJobOffer, Primitive>> = ({ row, fieldName, mapValue }) => {
  const updateListItem = useUpdateListItem(jobOffersState);
  const [value, setValue] = useState<string | undefined>(row.getValue(fieldName));

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const updatedValue = mapValue(e.target.value);
    updateListItem(updatedValue, row, fieldName);
  }

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      className="bg-white"
    />
  )
}

export const PRIVATE_OFFER_COLUMNS: ColumnDef<PrivateJobOffer>[] = [
  {
    accessorKey: "company_name",
    header: "Company Name",
    cell: ({ row }) => <JobOfferStringCell row={row} fieldName="company_name" mapValue={mapString} />
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <JobOfferCell row={row} fieldName="salary" numericformatProps={{
      thousandSeparator: true,
      prefix: "$",
      allowNegative: false,
      decimalScale: 0,
      placeholder: "$150,000",
    }} />
  },
  {
    accessorKey: "number_of_shares",
    header: "Shares",
    cell: ({ row }) => <JobOfferCell row={row} fieldName="number_of_shares" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "10,000",
      decimalScale: 0,
    }} />
  },
  {
    accessorKey: "latest_company_valuation",
    header: "Latest Company Valuation",
    cell: ({ row }) => <JobOfferCell row={row} fieldName="latest_company_valuation"
      numericformatProps={{
        thousandSeparator: true,
        prefix: "$",
        allowNegative: false,
        placeholder: "$56,000,000",
        decimalScale: 0,
      }}
    />
  },
  {
    accessorKey: "strike_price",
    header: "Strike Price",
    cell: ({ row }) => <JobOfferCell row={row} fieldName="strike_price" numericformatProps={{
      thousandSeparator: true,
      prefix: "$",
      allowNegative: false,
      placeholder: "$1.47",
      decimalScale: 2,
    }} />
  },
  {
    accessorKey: "vesting_years",
    header: "Vesting Years",
    cell: ({ row }) => <JobOfferCell row={row} fieldName="vesting_years" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "4",
      decimalScale: 0,
    }} />
  },
  {
    accessorKey: "percentage_ownership",
    header: "Percentage Ownership",
    // cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="percentage_ownership" formatOptions={PercentageColumnFormatOptions} />
    cell: ({ row }) => <JobOfferCell row={row} fieldName="percentage_ownership" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: ".25%",
      decimalScale: 4,
      suffix: "%"
    }}
      mapValue={(proposedValue: number) => proposedValue / 100}
    />
  },
  {
    accessorKey: "total_number_of_outstanding_shares",
    header: "Outstanding Shares",
    cell: ({ row }) => <JobOfferCell row={row} fieldName="total_number_of_outstanding_shares" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "25,467,000",
      decimalScale: 0,
    }} />
  },
];

export const PUBLIC_OFFER_COLUMNS: ColumnDef<PublicJobOffer>[] = [
  {
    accessorKey: "company_name",
    header: "Company Name",
    cell: ({ row }) => <JobOfferStringCell row={row} fieldName="company_name" mapValue={mapString} />
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <JobOfferCell row={row} fieldName="salary" numericformatProps={{
      thousandSeparator: true,
      prefix: "$",
      allowNegative: false,
      decimalScale: 0,
      placeholder: "$150,000",
    }} />
  },
  {
    accessorKey: "equity_valuation",
    header: "RSU Valuation",
    cell: ({ row }) => <JobOfferCell row={row} fieldName="equity_valuation" numericformatProps={{
      thousandSeparator: true,
      prefix: "$",
      allowNegative: false,
      decimalScale: 0,
      placeholder: "$350,000",
    }} />
  },
  {
    accessorKey: "number_of_shares",
    header: "Shares",
    cell: ({ row }) => <JobOfferCell row={row} fieldName="number_of_shares" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "10,000",
      decimalScale: 0,
    }}
    />
  },
  {
    accessorKey: "latest_company_valuation",
    header: "Market Cap",
    cell: ({ row }) => <JobOfferCell row={row} fieldName="latest_company_valuation" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "43,000,000,000",
      decimalScale: 0,
    }} />
  },
  {
    accessorKey: "stock_price",
    header: "Stock Price",
    cell: ({ row }) => <JobOfferCell row={row} fieldName="stock_price" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "$45.58",
      decimalScale: 2,
    }} />
  },
  {
    accessorKey: "vesting_years",
    header: "Vesting Years",
    cell: ({ row }) => <JobOfferCell row={row} fieldName="vesting_years" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "4",
      decimalScale: 0,
    }} />
  },
];

