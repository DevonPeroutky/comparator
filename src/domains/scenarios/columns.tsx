import { ColumnDef } from "@tanstack/react-table";
import { JobOffer } from "../offers/columns";

export type Scenario = {
  id: string;
  valuation: number
};

export type Outcome = {
  offer: JobOffer;
  scenario: Scenario;
  total_stock_package_value: number;
  annual_stack_package_value: number;
  total_compensation_value: number
  annual_compensation_value: number
}


export const buildScenarioColumns = (outcomes: Outcome[]): ColumnDef<Outcome>[] => {
  return [
    {
      accessorKey: "company_name",
      header: "Company Name",
      cell: ({ row }) => {
        const offer: JobOffer = row.original.offer
        return <div className="text-right">{offer.company_name}</div>
      },
    },
    ...outcomes.map(outcome => {
      const formatted_header = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(outcome.scenario.valuation)
      return {
        accessorKey: `scenario_${outcome.scenario.id}`,
        header: `${formatted_header}`,
        cell: ({ row }) => {
          const outcome: Outcome = row.original
          return <div className="text-right">{outcome.total_compensation_value}</div>
        },
      }
    })
  ]
}
