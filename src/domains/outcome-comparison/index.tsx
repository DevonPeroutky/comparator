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
import { FancyBlockquote } from "@/components/app/animated-blockquote/3d-blockquote";
import { deriveJobOfferScenario } from "./lib/utils";


export const ComparisonTable = () => {
  const chartConfig = useAtomValue(chartConfigAtom);
  const jobOffers = useAtomValue(jobOffersState);
  const scenarioMap = useAtomValue(scenarioMapState);
  const selectedScenarioIds = useAtomValue(selectedScenarioIdState);
  var jobOfferScenarios: JobOfferScenario[] = []

  if (Object.keys(scenarioMap).length > 0) {
    jobOfferScenarios = jobOffers.map(offer => {
      const scenarios = scenarioMap[offer.id]
      const selectedScenarioId = selectedScenarioIds[offer.id]
      const selectedScenario = scenarios.find(scenario => scenario.id === selectedScenarioId) || scenarios[0]
      return deriveJobOfferScenario(offer, selectedScenario)
    })
  }

  console.log("scenarios", scenarioMap)
  console.log("jobOfferScenarios", jobOfferScenarios)

  const getCompanyColor = (companyId: string) => chartConfig[companyId]?.color || "gray"

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


export const ComparisonDescription = () => {
  return (
    <div className="max-w-prose md:max-w-4xl md:flex flex-col mx-auto my-4 px-4 text-muted-foreground italic text-center">
      <FancyBlockquote author="Steve Jobs" containerClassName="" stemHeight={75} className="flex justify-center items-center w-[800px] p-4">
        <blockquote className="p-4">
          "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven’t found it yet, keep looking. Don’t settle. As with all matters of the heart, you’ll know when you find it.”
        </blockquote>
      </FancyBlockquote>
    </div >
  )
}
