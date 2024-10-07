import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useAtomValue } from "jotai";
import { chartConfigAtom, jobOffersState } from "../offers/atoms";
import { scenarioMapState, selectedScenarioIdState } from "../scenarios/atoms";
import { JobOfferScenario } from "./types";
import { footerDefs, rowDefs } from "./rows";
import { LabelCell } from "./components/label-cell";


export const ComparisonTable = () => {
  const chartConfig = useAtomValue(chartConfigAtom);
  const jobOffers = useAtomValue(jobOffersState);
  const scenarioMap = useAtomValue(scenarioMapState);
  const selectedScenarioIds = useAtomValue(selectedScenarioIdState);
  var jobOfferScenarios: JobOfferScenario[] = []


  if (Object.keys(scenarioMap).length > 0) {
    jobOfferScenarios = jobOffers.map(offer => {
      const scenarios = scenarioMap[offer.company_name]
      const selectedScenarioId = selectedScenarioIds[offer.company_name]
      const selectedScenario = scenarios.find(scenario => scenario.id === selectedScenarioId) || scenarios[0]
      return { ...offer, ...selectedScenario }
    })
  }

  const getCompanyColor = (companyName: string) => chartConfig[companyName]?.color || "gray"

  console.log("scenarioMap", scenarioMap)
  console.log("jobOffers", jobOffers)

  const tableHeaders = [
    <TableHead key="blank" className="w-[250px]"></TableHead>,
    ...jobOffers.map(offer => <TableHead key={offer.id} className="font-semibold text-xl" style={{ color: getCompanyColor(offer.company_name) }}>{offer.company_name}</TableHead>)
  ];

  return (
    <Table className="border border-solid border-gray-400 rounded-lg overflow-hidden">
      <TableHeader>
        <TableRow>
          {tableHeaders}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rowDefs.map(({ cell, labelProps }, index) => (
          <TableRow key={index}>
            {[<LabelCell {...labelProps} key={labelProps.label} />, ...jobOfferScenarios.map(cell)]}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {footerDefs.map(({ cell, labelProps }, index) => (
          <TableRow key={`footer-${index}`} >
            {[<LabelCell {...labelProps} key={labelProps.label} />, ...jobOfferScenarios.map(cell)]}
          </TableRow>
        ))}
      </TableFooter>
    </Table >
  )
}

