import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Scenario } from "../types";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { EditableCell, validateNumber, mapNumber, formatNumber } from "@/lib/base_columns";
import { scenarioMapState, scenarioState } from "../atoms";
import { useRecoilValue } from "recoil";
import { useMemo } from "react";
import test from "node:test";

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

export const AggegrateEquityJourneyCard = ({ }) => {
  const scenarioMap = useRecoilValue(scenarioMapState);
  const tableKey = useMemo(() => JSON.stringify(scenarioMap), [scenarioMap]);

  const valuationColumnKey = (company_name: string) => `${company_name.replace(".", "-")}-valuation`;
  const fundingRoundsColumnKey = (company_name: string) => `${company_name.replace(".", "-")}-funding-rounds`;

  const aggegateColumns: ColumnDef<{ [x: string]: number }>[] = useMemo(() => {
    if (Object.keys(scenarioMap).length === 0) {
      return [];
    }

    return Object.entries(scenarioMap).map(([company_name, scenarios]) => ({
      id: company_name,
      header: () => <h2 className="text-xl font-medium">{company_name}</h2>,
      columns: [
        {
          accessorKey: valuationColumnKey(company_name),
          header: "Valuation",
          size: 200,
          cell: ({ row }) => <EditableCell row={row} fieldName={valuationColumnKey(company_name)} mapValue={mapNumber} formatter={formatNumber({ "style": "currency", "currency": "USD", maximumFractionDigits: 0 })} validate={validateNumber} recoilState={scenarioState} />
        },
        {
          accessorKey: fundingRoundsColumnKey(company_name),
          header: "Funding Rounds",
          size: 100,
          cell: ({ row }) => <EditableCell row={row} fieldName={fundingRoundsColumnKey(company_name)} mapValue={mapNumber} formatter={formatNumber({ useGrouping: true, maximumFractionDigits: 0 })} validate={validateNumber} recoilState={scenarioState} />
        }
      ],
    }))
  }, [scenarioMap]);
  console.log('aggegateColumns', aggegateColumns);

  const tData = useMemo(() => {
    const companies = Object.keys(scenarioMap);
    const maxLength = Math.max(...Object.values(scenarioMap).map(scenarios => scenarios.length));

    return Array.from({ length: maxLength }, (_, index) => {
      return companies.reduce((acc, company_name) => {
        const scenario = scenarioMap[company_name][index];
        if (scenario) {
          acc[valuationColumnKey(company_name)] = scenario.valuation;
          acc[fundingRoundsColumnKey(company_name)] = scenario.number_of_rounds;
        }
        return acc;
      }, {} as { [x: string]: number });
    });
  }, [scenarioMap]);
  console.log('tData', tData);
  console.log('tData[0]', tData[0]);

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            <span className="capitalize">Scenario Builder</span>
          </div>
        </CardTitle>
        <CardDescription>This has been aggregate from data published by <a href='https://www.saastr.com/carta-the-actual-real-dilution-from-series-a-b-c-and-d-rounds/' target='_blank' className='text-sky-400 hover:underline hover:cursor-pointer'>Carta</a> and other sources. But feel free to update these</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={aggegateColumns}
          data={tData}
          key={tableKey}
        />
      </CardContent>
    </Card>
  )
}
