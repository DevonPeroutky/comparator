import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { JobOffer } from "@/domains/offers/types";
import { Scenario } from "../types";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { EditableCell, validateNumber, mapNumber, formatNumber } from "@/lib/base_columns";

export const columns: ColumnDef<Scenario>[] = [
  {
    accessorKey: "valuation",
    header: "Valuation",
    cell: ({ row }) => <EditableCell row={row} fieldName="latest_company_valuation" mapValue={mapNumber} formatter={formatNumber({ "style": "currency", "currency": "USD", maximumFractionDigits: 0 })} validate={validateNumber} recoilState={jobOffersState} />
  },
  {
    accessorKey: "dilution",
    header: "Dilution",
    cell: ({ row }) => <EditableCell row={row} fieldName="percentage_ownership" mapValue={mapNumber} formatter={formatNumber({ style: "percent", maximumFractionDigits: 4, minimumFractionDigits: 2 })} validate={validateNumber} recoilState={jobOffersState} />
  },
];

export const EquityJourneyCard: React.FC<{ jobOffer: JobOffer; scenarios: Scenario[] }> = ({ jobOffer, scenarios }) => {
  return (
    <Card>
      <Card className='h-fit'>
        <CardHeader>
          <CardTitle>
            <div className='flex items-center justify-between'>
              <span>Dilution Schedule</span>
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
      <Card>
      </Card>
    </Card>
  )
}
