import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { mapNumber, validateNumber } from "@/lib/columns/column_utils";
import { scenarioMapState } from "../../atoms";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { EquityJourneyPlanCell } from "@/domains/scenarios/components/equity-journey-card/columns";
import { Scenario } from "../../types";
import { formatInteger, formatLargeCurrency, formatPercentage } from "@/lib/format_utils";
import { FlattenedScenarios } from "./types";


export const AggegrateEquityJourneyCard = () => {
  const scenarioMap = useAtomValue(scenarioMapState);
  const tableKey = useMemo(() => JSON.stringify(scenarioMap), [scenarioMap]);
  const columnKey = (column_name: string, company_name: string) => `${company_name.replace(".", "-")}-${column_name}`;

  const aggegateColumns: ColumnDef<FlattenedScenarios>[] = useMemo(() => {
    if (Object.keys(scenarioMap).length === 0) {
      return [];
    }

    return Object.entries(scenarioMap).map(([company_name, scenarios]) => ({
      id: company_name,
      header: () => <h2 className="text-xl font-medium">{company_name}</h2>,
      columns: [
        {
          accessorKey: columnKey("valuation", company_name),
          header: "Valuation",
          size: 200,
          cell: ({ row }) => <EquityJourneyPlanCell row={row} companyName={company_name} fieldName="valuation" formatter={formatLargeCurrency} validate={validateNumber} mapValue={mapNumber} />
        },
        {
          accessorKey: columnKey("number_of_rounds", company_name),
          header: "Funding Rounds",
          size: 100,
          cell: ({ row }) => <EquityJourneyPlanCell row={row} companyName={company_name} fieldName="number_of_rounds" mapValue={mapNumber} formatter={formatInteger} validate={validateNumber} />
        },
        {
          accessorKey: columnKey("dilution", company_name),
          header: "Dilution",
          size: 100,
          cell: ({ row }) => <EquityJourneyPlanCell row={row} companyName={company_name} fieldName="dilution" mapValue={mapNumber} formatter={formatPercentage} validate={validateNumber} />
        }
      ],
    }))
  }, [scenarioMap]);

  const flattenedScenarios = useMemo(() => {
    const companies = Object.keys(scenarioMap)
    const maxLength = Math.max(...Object.values(scenarioMap).map(scenarios => scenarios.length))

    if (maxLength === 0) {
      return [];
    }
    return Array.from({ length: maxLength }, (_, index) => {
      return companies.reduce((acc, company_name) => {
        const scenario = scenarioMap[company_name][index];
        acc[company_name] = scenario;
        return acc;
      }, {} as Record<string, Scenario>)
    })
  }, [scenarioMap]);

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
          data={flattenedScenarios}
          key={tableKey}
        />
      </CardContent>
    </Card>
  )
}

export const ScenarioBuilder = () => {
  const scenarioMap = useAtomValue(scenarioMapState);
  const tableKey = useMemo(() => JSON.stringify(scenarioMap), [scenarioMap]);
  const columnKey = (column_name: string, company_name: string) => `${company_name.replace(".", "-")}-${column_name}`;

  const aggegateColumns: ColumnDef<FlattenedScenarios>[] = useMemo(() => {
    if (Object.keys(scenarioMap).length === 0) {
      return [];
    }

    return Object.entries(scenarioMap).map(([company_name, scenarios]) => ({
      id: company_name,
      header: () => <h2 className="text-xl font-medium">{company_name}</h2>,
      columns: [
        {
          accessorKey: columnKey("valuation", company_name),
          header: "Valuation",
          size: 200,
          cell: ({ row }) => <EquityJourneyPlanCell row={row} companyName={company_name} fieldName="valuation" formatter={formatLargeCurrency} validate={validateNumber} mapValue={mapNumber} />
        },
        {
          accessorKey: columnKey("number_of_rounds", company_name),
          header: "Funding Rounds",
          size: 100,
          cell: ({ row }) => <EquityJourneyPlanCell row={row} companyName={company_name} fieldName="number_of_rounds" mapValue={mapNumber} formatter={formatInteger} validate={validateNumber} />
        },
        {
          accessorKey: columnKey("dilution", company_name),
          header: "Dilution",
          size: 100,
          cell: ({ row }) => <EquityJourneyPlanCell row={row} companyName={company_name} fieldName="dilution" mapValue={mapNumber} formatter={formatPercentage} validate={validateNumber} />
        }
      ],
    }))
  }, [scenarioMap]);

  const flattenedScenarios = useMemo(() => {
    const companies = Object.keys(scenarioMap)
    const maxLength = Math.max(...Object.values(scenarioMap).map(scenarios => scenarios.length))

    if (maxLength === 0) {
      return [];
    }
    return Array.from({ length: maxLength }, (_, index) => {
      return companies.reduce((acc, company_name) => {
        const scenario = scenarioMap[company_name][index];
        acc[company_name] = scenario;
        return acc;
      }, {} as Record<string, Scenario>)
    })
  }, [scenarioMap]);

  return (
    <DataTable
      columns={aggegateColumns}
      data={flattenedScenarios}
      key={tableKey}
    />
  )

}

export const ScenarioBuilderDescription = () => {
  return (
    <p className="w-full pb-4">
      The dilution has been estimated from data published by <a href='https://www.saastr.com/carta-the-actual-real-dilution-from-series-a-b-c-and-d-rounds/' target='_blank' className='text-sky-400 hover:underline hover:cursor-pointer'>Carta</a> and other sources. But you update the potential valuations and dilutions as you would like.
    </p>
  )
}
