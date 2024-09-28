import { ColumnDef } from "@tanstack/react-table";

export type JobOffer = {
  id: string;
  company_name: string;
  salary: number;
  number_of_shares: number;
  latest_company_valuation: number;
};

export const columns: ColumnDef<JobOffer>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "company_name",
    header: "Company Name",
  },
  {
    accessorKey: "salary",
    header: "Salary",
  },
  {
    accessorKey: "number_of_shares",
    header: "Number of Shares",
  },
  {
    accessorKey: "latest_company_valuation",
    header: "Latest Company Valuation",
  },
];
