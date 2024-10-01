import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { JobOffer } from "@/domains/offers/types";
import { Scenario } from "../types";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { EditableCell, validateNumber, mapNumber, formatNumber } from "@/lib/base_columns";
import { scenarioState } from "../atoms";

export const columns: ColumnDef<Scenario>[] = [
  {
    accessorKey: "valuation",
    header: "Valuation",
    size: 200,
    cell: ({ row }) => <EditableCell row={row} fieldName="valuation" mapValue={mapNumber} formatter={formatNumber({ "style": "currency", "currency": "USD", maximumFractionDigits: 0 })} validate={validateNumber} recoilState={scenarioState} />
  },
  {
    accessorKey: "number_of_rounds",
    header: "Funding Rounds",
    size: 100,
    cell: ({ row }) => <EditableCell row={row} fieldName="number_of_rounds" mapValue={mapNumber} formatter={formatNumber({ useGrouping: true, maximumFractionDigits: 0 })} validate={validateNumber} recoilState={scenarioState} />
  },
];

export const EquityJourneyCard: React.FC<{ company_name: string; scenarios: Scenario[] }> = ({ company_name, scenarios }) => {
  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            <span className="capitalize">{company_name}</span>
          </div>
        </CardTitle>
        <CardDescription>This has been aggregate from data published by <a href='https://www.saastr.com/carta-the-actual-real-dilution-from-series-a-b-c-and-d-rounds/' target='_blank' className='text-sky-400 hover:underline hover:cursor-pointer'>Carta</a> and other sources. But feel free to update these</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={columns}
          data={scenarios}
        />
      </CardContent>
    </Card>
  )
}
