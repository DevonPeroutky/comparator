import { ColumnDef } from "@tanstack/react-table";

export type JobOffer = {
  id: string;
  company_name: string;
  salary: number;
  number_of_shares: number;
  total_number_of_outstanding_shares: number;
  percentage_ownership: number;
  strike_price: number;
  latest_company_valuation: number;
  vesting_years: number;
};

export const columns: ColumnDef<JobOffer>[] = [
  // {
  //   accessorKey: "id",
  //   header: "ID",
  // },
  {
    accessorKey: "company_name",
    header: "Company Name",
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => {
      const salary = parseFloat(row.getValue("salary"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(salary)

      return <div className="text-right">{formatted}</div>
    },

  },
  {
    accessorKey: "number_of_shares",
    header: "Number of Shares",
    cell: ({ row }) => {
      const shares = parseFloat(row.getValue("number_of_shares"))
      const formatted = new Intl.NumberFormat("en-US", {
        useGrouping: true,
      }).format(shares)

      return <div className="text-right">{formatted}</div>
    },
  },
  {
    accessorKey: "latest_company_valuation",
    header: "Latest Company Valuation",
    cell: ({ row }) => {
      const latest_company_valuation = parseFloat(row.getValue("latest_company_valuation"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(latest_company_valuation)

      return <div className="text-right">{formatted}</div>
    },
  },
  {
    accessorKey: "strike_price",
    header: "Strike Price",
    cell: ({ row }) => {
      const strikePrice = parseFloat(row.getValue("strike_price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(strikePrice)

      return <div className="text-right">{formatted}</div>
    },
  },
  {
    accessorKey: "vesting_years",
    header: "Vesting Years",
    cell: ({ row }) => {
      const vestingYears = parseFloat(row.getValue("vesting_years"))
      return <div className="text-right">{vestingYears}</div>
    },
  },
  {
    accessorKey: "percentage_ownership",
    header: "Percentage Ownership",
    cell: ({ row }) => {
      const percentageOwnership = parseFloat(row.getValue("percentage_ownership"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(percentageOwnership / 100)

      return <div className="text-right">{formatted}</div>
    },
  },
  {
    accessorKey: "total_number_of_outstanding_shares",
    header: "Total Outstanding Shares",
    cell: ({ row }) => {
      const totalShares = parseFloat(row.getValue("total_number_of_outstanding_shares"))
      const formatted = new Intl.NumberFormat("en-US", {
        useGrouping: true,
      }).format(totalShares)

      return <div className="text-right">{formatted}</div>
    },
  },
];
