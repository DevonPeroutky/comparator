import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useAtomValue } from "jotai";
import { jobOffersState } from "../offers/atoms";
import { scenarioMapState, selectedScenarioIdState } from "../scenarios/atoms";
import { JobOfferScenario } from "./types";
import { footerDefs, rowDefs } from "./rows";
import { LabelCell } from "./components/label-cell";


export const ComparisonTable = () => {
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

  console.log("scenarioMap", scenarioMap)
  console.log("jobOffers", jobOffers)

  const tableHeaders = [
    <TableHead key="blank" className="w-[250px]"></TableHead>,
    ...jobOffers.map(offer => <TableHead key={offer.id}>{offer.company_name}</TableHead>)
  ];

  return (
    <Table >
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

