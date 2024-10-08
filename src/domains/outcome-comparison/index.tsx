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

  console.log("Selected Scenario Ids: ", selectedScenarioIds)

  if (Object.keys(scenarioMap).length > 0) {
    jobOfferScenarios = jobOffers.map(offer => {
      const scenarios = scenarioMap[offer.id]
      const selectedScenarioId = selectedScenarioIds[offer.id]
      const selectedScenario = scenarios.find(scenario => scenario.id === selectedScenarioId) || scenarios[0]
      return { ...offer, ...selectedScenario, offer_id: offer.id, scenario_id: selectedScenario.id }
    })
  }

  const getCompanyColor = (companyId: string) => chartConfig[companyId]?.color || "gray"

  console.log("scenarioMap", scenarioMap)
  console.log("jobOffers", jobOffers)

  const tableHeaders = [
    <TableHead key="blank" className="w-[250px]"></TableHead>,
    ...jobOffers.map(offer => <TableHead key={offer.id} className="font-normal text-xl" style={{ color: getCompanyColor(offer.id) }}>{offer.company_name}</TableHead>)
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

