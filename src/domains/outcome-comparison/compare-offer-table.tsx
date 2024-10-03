import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useRecoilValue } from "recoil";
import { jobOffersState } from "../offers/atoms";
import { scenarioMapState } from "../scenarios/atoms";
import { deriveAnnualCompensation, useBuildRows, deriveDilutionPercentageOwned, deriveEquityValue, deriveExerciseCost, deriveAnnualEquityValue } from "./utils";
import { JobOfferScenario } from "./types";


export const ComparisonTable = () => {
  const jobOffers = useRecoilValue(jobOffersState);
  const scenarioMap = useRecoilValue(scenarioMapState);
  var jobOfferScenarios: JobOfferScenario[] = []

  if (Object.keys(scenarioMap).length > 0) {
    jobOfferScenarios = jobOffers.map(offer => {
      const scenarios = scenarioMap[offer.company_name]
      // TODO: Replace with Selected Scenario
      return { ...offer, ...scenarios[4] }
    })
  }

  const rowDefs = [
    { row_key: "salary", label: "Salary", options: { style: "currency", currency: "USD" } },
    { row_key: "latest_company_valuation", label: "Current Valuation", options: { style: "currency", currency: "USD", maximumFractionDigits: 0 } },
    // TODO: Replace basic cell with SelectMenu to 
    { row_key: "valuation", label: "Projected Valuation", options: { style: "currency", currency: "USD", maximumFractionDigits: 0 } },
    { derive_value: deriveExerciseCost, label: "Exercise Cost (w/out Tax)" },
    { derive_value: deriveDilutionPercentageOwned, label: "Fully Diluted Percentage" },
    { derive_value: deriveEquityValue, label: "Equity Value" },
    { derive_value: deriveAnnualEquityValue, label: "Annual Equity Value" },
  ];
  const footerDefs = [
    { derive_value: deriveAnnualCompensation, label: "Total Annual Compensation" },
  ];

  // TODO: Pass the appropriate scenario to each column w/JobOffer 

  const buildRows = useBuildRows(rowDefs);
  const buildFooter = useBuildRows(footerDefs);
  const tableHeaders = jobOffers.map(offer => <TableHead key={offer.id}>{offer.company_name}</TableHead>)

  // Prepend the tableHeaders with a blank Cell
  tableHeaders.unshift(<TableHead key="blank" className="w-[250px]"></TableHead>)

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
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders}
            </TableRow>
          </TableHeader>
          <TableBody>
            {buildRows(jobOfferScenarios)}
          </TableBody>
          <TableFooter>
            {buildFooter(jobOfferScenarios)}
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )

}

