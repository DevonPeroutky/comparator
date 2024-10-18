import { ColumnDef } from "@tanstack/react-table";
import { PrivateJobOffer, PublicJobOffer } from "./types";
import { NumericCell, StringCell } from "@/lib/columns/base_columns";
import { jobOffersState } from "./atoms";
import { mapString } from "@/lib/columns/column_utils";

export const PRIVATE_OFFER_COLUMNS: ColumnDef<PrivateJobOffer>[] = [
  {
    accessorKey: "company_name",
    header: "Company Name",
    cell: ({ row }) => <StringCell row={row} fieldName="company_name" mapValue={mapString} state={jobOffersState} />
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <NumericCell row={row} fieldName="salary" numericformatProps={{
      thousandSeparator: true,
      prefix: "$",
      allowNegative: false,
      decimalScale: 0,
      placeholder: "$150,000",
    }} state={jobOffersState} />
  },
  {
    accessorKey: "number_of_shares",
    header: "Shares",
    cell: ({ row }) => <NumericCell row={row} fieldName="number_of_shares" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "10,000",
      decimalScale: 0,
    }}
      state={jobOffersState}
    />
  },
  {
    accessorKey: "latest_company_valuation",
    header: "Latest Company Valuation",
    cell: ({ row }) => <NumericCell row={row} fieldName="latest_company_valuation"
      state={jobOffersState}
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
    cell: ({ row }) => <NumericCell row={row} fieldName="strike_price" numericformatProps={{
      thousandSeparator: true,
      prefix: "$",
      allowNegative: false,
      placeholder: "$1.47",
      decimalScale: 2,
    }}
      state={jobOffersState}
    />
  },
  {
    accessorKey: "vesting_years",
    header: "Vesting Years",
    cell: ({ row }) => <NumericCell row={row} fieldName="vesting_years" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "4",
      decimalScale: 0,
    }}
      state={jobOffersState}
    />
  },
  {
    accessorKey: "percentage_ownership",
    header: "Percentage Ownership",
    // cell: ({ row }) => <JobOfferEditableCell row={row} fieldName="percentage_ownership" formatOptions={PercentageColumnFormatOptions} />
    cell: ({ row }) => <NumericCell row={row} fieldName="percentage_ownership" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: ".25%",
      decimalScale: 4,
      suffix: "%"
    }}
      mapValue={(proposedValue: number) => proposedValue / 100}
      state={jobOffersState}
    />
  },
  {
    accessorKey: "total_number_of_outstanding_shares",
    header: "Outstanding Shares",
    cell: ({ row }) => <NumericCell row={row} fieldName="total_number_of_outstanding_shares" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "25,467,000",
      decimalScale: 0,
    }}
      state={jobOffersState}
    />

  },
];

export const PUBLIC_OFFER_COLUMNS: ColumnDef<PublicJobOffer>[] = [
  {
    accessorKey: "company_name",
    header: "Company Name",
    cell: ({ row }) => <StringCell row={row} fieldName="company_name" mapValue={mapString} state={jobOffersState} />
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <NumericCell row={row} fieldName="salary" numericformatProps={{
      thousandSeparator: true,
      prefix: "$",
      allowNegative: false,
      decimalScale: 0,
      placeholder: "$150,000",
    }}
      state={jobOffersState}
    />
  },
  {
    accessorKey: "equity_valuation",
    header: "RSU Valuation",
    cell: ({ row }) => <NumericCell row={row} fieldName="equity_valuation" numericformatProps={{
      thousandSeparator: true,
      prefix: "$",
      allowNegative: false,
      decimalScale: 0,
      placeholder: "$350,000",
    }}
      state={jobOffersState}
    />
  },
  {
    accessorKey: "number_of_shares",
    header: "Shares",
    cell: ({ row }) => <NumericCell row={row} fieldName="number_of_shares" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "10,000",
      decimalScale: 0,
    }}
      state={jobOffersState}
    />
  },
  {
    accessorKey: "latest_company_valuation",
    header: "Market Cap",
    cell: ({ row }) => <NumericCell row={row} fieldName="latest_company_valuation" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "43,000,000,000",
      decimalScale: 0,
    }}
      state={jobOffersState}
    />
  },
  {
    accessorKey: "stock_price",
    header: "Stock Price",
    cell: ({ row }) => <NumericCell row={row} fieldName="stock_price" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "$45.58",
      decimalScale: 2,
    }}
      state={jobOffersState}
    />
  },
  {
    accessorKey: "vesting_years",
    header: "Vesting Years",
    cell: ({ row }) => <NumericCell row={row} fieldName="vesting_years" numericformatProps={{
      thousandSeparator: true,
      allowNegative: false,
      placeholder: "4",
      decimalScale: 0,
    }}
      state={jobOffersState}
    />
  },
];

