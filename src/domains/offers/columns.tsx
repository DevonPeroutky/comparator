import { ColumnDef, Row } from "@tanstack/react-table";
import { JobOffer } from "./types";
import { BaseEditableCell, BaseEditableCellProps } from "@/lib/columns/base_columns";
import { useUpdateListItemChanges } from "@/lib/columns/hooks";
import { Primitive } from "react-hook-form";
import { jobOffersState } from "./atoms";
import { IntegerColumnFormatOptions, LargeCurrencyColumnFormatOptions, PercentageColumnFormatOptions, PreciseCurrencyColumnFormatOptions, StringColumnFormatOptions } from "@/lib/columns/constants";


const JobOfferEditableCell: React.FC<BaseEditableCellProps<JobOffer, Primitive>> = ({ row, fieldName, formatOptions }) => {
  const updateListItem = useUpdateListItemChanges(jobOffersState);
  return BaseEditableCell({ row, fieldName, formatOptions, updateListItem });
}

export const columns: ColumnDef<JobOffer>[] = [
  {
    accessorKey: "company_name",
    header: "Company Name",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="company_name" formatOptions={StringColumnFormatOptions} />
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="salary" formatOptions={LargeCurrencyColumnFormatOptions} />
  },
  {
    accessorKey: "number_of_shares",
    header: "Number of Shares",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="number_of_shares" formatOptions={IntegerColumnFormatOptions} />
  },
  {
    accessorKey: "latest_company_valuation",
    header: "Latest Company Valuation",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="latest_company_valuation" formatOptions={LargeCurrencyColumnFormatOptions} />
  },
  {
    accessorKey: "strike_price",
    header: "Strike Price",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="strike_price" formatOptions={PreciseCurrencyColumnFormatOptions} />
  },
  {
    accessorKey: "vesting_years",
    header: "Vesting Years",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="vesting_years" formatOptions={IntegerColumnFormatOptions} />
  },
  {
    accessorKey: "percentage_ownership",
    header: "Percentage Ownership",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="percentage_ownership" formatOptions={PercentageColumnFormatOptions} />
  },
  {
    accessorKey: "total_number_of_outstanding_shares",
    header: "Total Outstanding Shares",
    cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="total_number_of_outstanding_shares" formatOptions={IntegerColumnFormatOptions} />
  },
];

