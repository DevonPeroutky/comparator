import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useRecoilValue } from "recoil";
import { jobOffersState } from "./atoms";
import { ReactNode } from "react";
import { displayNumber } from "./utils";
import { JobOffer } from "./types";
import { scenarioMapState } from "../scenarios/atoms";
import { Scenario } from "../scenarios/types";

type ComparisonRowDef = {
  row_key?: string;
  label: string;
  options?: Intl.NumberFormatOptions;
  derive_value?: (offer: JobOffer) => number;
}

const buildRow = (jobOfferScenarios: JobOfferScenario[], row_label: string, options: Intl.NumberFormatOptions, derive_value?: (jobOfferScenario: JobOfferScenario) => number, row_key?: string): ReactNode => {
  if (!derive_value && !row_key) {
    throw new Error("Either derive_value or row_key must be provided");
  }

  if (derive_value && row_key) {
    throw new Error("Only one of derive_value or row_key can be provided");
  }

  const tableCells = (row_key) ? jobOfferScenarios.map(offer => <TableCell key={offer.id}>{displayNumber(offer[row_key as keyof JobOfferScenario], '-', options)}</TableCell>) : jobOfferScenarios.map(offer => <TableCell key={offer.id}>{derive_value(offer)}</TableCell>)

  // Prepend the Row Label
  tableCells.unshift(<TableCell key="blank" className="w-fit captialize">{row_label}</TableCell>)

  return tableCells
}

const useBuildRows = (rows: ComparisonRowDef[]) => {

  return (jobOffers: JobOffer[]): ReactNode[] => {
    return rows.map(({ row_key, label, options, derive_value }, index) =>
      <TableRow key={index}>
        {buildRow(jobOffers, label, options, derive_value, row_key)}
      </TableRow>
    )
  }
}

const deriveExerciseCost = (offer: JobOffer): string => {
  if (!offer.strike_price || !offer.number_of_shares) return '-';
  return new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", "currency": "USD" }).format(offer.number_of_shares * offer.strike_price)
}

const deriveDilutionPercentageOwned = (jobOfferScenario: JobOfferScenario): string => {
  if (!jobOfferScenario.percentage_ownership || !jobOfferScenario.dilution) return '-';
  return new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 4, minimumFractionDigits: 2 }).format(jobOfferScenario.percentage_ownership * jobOfferScenario.dilution)
}

const deriveEquityValue = (jobOfferScenario: JobOfferScenario): string => {
  if (!jobOfferScenario.percentage_ownership || !jobOfferScenario.dilution) return '-';
  const fullyDilutedPercentage = jobOfferScenario.percentage_ownership * jobOfferScenario.dilution
  const equityValue = jobOfferScenario.valuation * fullyDilutedPercentage
  return new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", "currency": "USD", maximumFractionDigits: 0 }).format(equityValue)
}

const deriveAnnualEquityValue = (jobOfferScenario: JobOfferScenario): string => {
  if (!jobOfferScenario.percentage_ownership || !jobOfferScenario.dilution) return '-';
  const fullyDilutedPercentage = jobOfferScenario.percentage_ownership * jobOfferScenario.dilution
  const annualEquityValue = (jobOfferScenario.valuation * fullyDilutedPercentage) / jobOfferScenario.vesting_years
  return new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", "currency": "USD", maximumFractionDigits: 0 }).format(annualEquityValue)
}

const deriveAnnualCompensation = (jobOfferScenario: JobOfferScenario): string => {
  if (!jobOfferScenario.percentage_ownership || !jobOfferScenario.dilution || !jobOfferScenario.valuation) return '-';
  const fullyDilutedPercentage = jobOfferScenario.percentage_ownership * jobOfferScenario.dilution
  const annualEquityValue = (jobOfferScenario.valuation * fullyDilutedPercentage) / jobOfferScenario.vesting_years
  return new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", "currency": "USD", maximumFractionDigits: 0 }).format(annualEquityValue + jobOfferScenario.salary)
}

type JobOfferScenario = JobOffer & Scenario

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

