import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useRecoilValue } from "recoil";
import { jobOffersState } from "../offers/atoms";
import { scenarioMapState, selectedScenarioIdState } from "../scenarios/atoms";
import { JobOfferScenario } from "./types";
import { footerDefs, rowDefs } from "./rows";


export const ComparisonTable = () => {
  const jobOffers = useRecoilValue(jobOffersState);
  const scenarioMap = useRecoilValue(scenarioMapState);
  const selectedScenarioIds = useRecoilValue(selectedScenarioIdState);

  var jobOfferScenarios: JobOfferScenario[] = []

  if (Object.keys(scenarioMap).length > 0) {
    jobOfferScenarios = jobOffers.map(offer => {
      const scenarios = scenarioMap[offer.company_name]
      const selectedScenarioId = selectedScenarioIds[offer.company_name]
      const selectedScenario = scenarios.find(scenario => scenario.id === selectedScenarioId) || scenarios[0]
      return { ...offer, ...selectedScenario }
    })
  }

  const tableHeaders = [
    <TableHead key="blank" className="w-[250px]"></TableHead>,
    ...jobOffers.map(offer => <TableHead key={offer.id}>{offer.company_name}</TableHead>)
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            <span>Compare Outcomes</span>
          </div>
        </CardTitle>
        <CardDescription>See how the equity compares round by round</CardDescription>
      </CardHeader>
      <CardContent>
        <Table >
          <TableHeader>
            <TableRow>
              {tableHeaders}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rowDefs.map(({ cell, label }, index) => (
              <TableRow key={index}>
                {[<TableCell className="w-fit capitalize" key={`${label}-label`}>{label}</TableCell>, ...jobOfferScenarios.map(cell)]}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {footerDefs.map(({ cell, label }, index) => (
              <TableRow key={index}>
                {[<TableCell className="w-fit capitalize" key={`${label}-label`}> {label}</TableCell>, ...jobOfferScenarios.map(cell)]}
              </TableRow>
            ))}
          </TableFooter>
        </Table>
      </CardContent>
    </Card >
  )

}

