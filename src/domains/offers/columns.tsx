import { mapString, identity, validateString, validateNumber, mapNumber } from "@/lib/columns/column_utils";
import { ColumnDef, Row } from "@tanstack/react-table";
import { JobOffer } from "./types";
import { BaseEditableCell, BaseEditableCellProps } from "@/lib/columns/base_columns";
import { useUpdateListItemChanges } from "@/lib/columns/hooks";
import { Primitive } from "react-hook-form";
import { jobOffersState } from "./atoms";
import { formatInteger, formatLargeCurrency, formatPercentage, formatPreciseCurrency } from "@/lib/format_utils";


const JobOfferEditableCell: React.FC<BaseEditableCellProps<JobOffer, Primitive>> = ({ row, fieldName, formatter, mapValue, validate }) => {
  const updateListItem = useUpdateListItemChanges(jobOffersState);
  return BaseEditableCell({ row, fieldName, formatter, mapValue, validate, updateListItem });
}

export const columns: ColumnDef<JobOffer>[] = [
  {
    accessorKey: "company_name",
    header: "Company Name",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="company_name" mapValue={mapString} formatter={mapString} validate={validateString} />
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="salary" mapValue={mapNumber} formatter={formatLargeCurrency} validate={validateNumber} />
  },
  {
    accessorKey: "number_of_shares",
    header: "Number of Shares",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="number_of_shares" mapValue={mapNumber} formatter={formatInteger} validate={validateNumber} />
  },
  {
    accessorKey: "latest_company_valuation",
    header: "Latest Company Valuation",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="latest_company_valuation" mapValue={mapNumber} formatter={formatLargeCurrency} validate={validateNumber} />
  },
  {
    accessorKey: "strike_price",
    header: "Strike Price",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="strike_price" mapValue={mapNumber} formatter={formatPreciseCurrency} validate={validateNumber} />
  },
  {
    accessorKey: "vesting_years",
    header: "Vesting Years",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="vesting_years" mapValue={mapNumber} formatter={formatInteger} validate={validateNumber} />
  },
  {
    accessorKey: "percentage_ownership",
    header: "Percentage Ownership",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="percentage_ownership" mapValue={mapNumber} formatter={formatPercentage} validate={validateNumber} />
  },
  {
    accessorKey: "total_number_of_outstanding_shares",
    header: "Total Outstanding Shares",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="total_number_of_outstanding_shares" mapValue={mapNumber} formatter={formatInteger} validate={validateNumber} />
  },
];

