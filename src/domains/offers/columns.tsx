import { EditableJobOfferColumn, EditableNumberCell } from "@/lib/base_columns";
import { ColumnDef, Row } from "@tanstack/react-table";
import { JobOffer } from "./types";

const validateNumber = (proposedValue: number): Boolean => {
  console.log(`proposedValue ${typeof (proposedValue)}`, proposedValue);
  return !isNaN(proposedValue);
}

const mapNumber = (proposedValue: string): number => {
  return parseFloat(proposedValue.replace(/[^0-9.-]+/g, ""));
};

const formatNumber = (options: Intl.NumberFormatOptions) => (value: string): string => {
  return value ? new Intl.NumberFormat("en-US", options).format(parseFloat(value)) : "-";
}

const validateString = (proposedValue: string): Boolean => {
  return proposedValue !== undefined && proposedValue.trim().length > 0;
}

const mapString = (proposedValue: string): string => {
  return proposedValue.trim();
};

function identity<T>(value: T): T {
  return value;
}



export const columns: ColumnDef<JobOffer>[] = [
  {
    accessorKey: "company_name",
    header: "Company Name",
    cell: ({ row }) => <EditableJobOfferColumn row={row} fieldName="company_name" mapValue={mapString} formatter={identity} validate={validateString} />
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <EditableJobOfferColumn row={row} fieldName="salary" mapValue={mapNumber} formatter={formatNumber({ style: "currency", currency: "USD" })} validate={validateNumber} />
  },
  {
    accessorKey: "number_of_shares",
    header: "Number of Shares",
    cell: ({ row }) => <EditableJobOfferColumn row={row} fieldName="number_of_shares" mapValue={mapNumber} formatter={formatNumber({ useGrouping: true, maximumFractionDigits: 0 })} validate={validateNumber} />
  },
  {
    accessorKey: "latest_company_valuation",
    header: "Latest Company Valuation",
    cell: ({ row }) => <EditableJobOfferColumn row={row} fieldName="latest_company_valuation" mapValue={mapNumber} formatter={formatNumber({ "style": "currency", "currency": "USD", maximumFractionDigits: 0 })} validate={validateNumber} />
  },
  {
    accessorKey: "strike_price",
    header: "Strike Price",
    cell: ({ row }) => <EditableJobOfferColumn row={row} fieldName="strike_price" mapValue={mapNumber} formatter={formatNumber({ style: "currency", "currency": "USD" })} validate={validateNumber} />
  },
  {
    accessorKey: "vesting_years",
    header: "Vesting Years",
    cell: ({ row }) => <EditableJobOfferColumn row={row} fieldName="vesting_years" mapValue={mapNumber} formatter={formatNumber({ useGrouping: true })} validate={validateNumber} />
  },
  {
    accessorKey: "percentage_ownership",
    header: "Percentage Ownership",
    cell: ({ row }) => <EditableJobOfferColumn row={row} fieldName="percentage_ownership" mapValue={mapNumber} formatter={formatNumber({ style: "percent", maximumFractionDigits: 4, minimumFractionDigits: 2 })} validate={validateNumber} />
  },
  {
    accessorKey: "total_number_of_outstanding_shares",
    header: "Total Outstanding Shares",
    cell: ({ row }) => <EditableJobOfferColumn row={row} fieldName="total_number_of_outstanding_shares" mapValue={mapNumber} formatter={formatNumber({ useGrouping: true })} validate={validateNumber} />
  },
];

