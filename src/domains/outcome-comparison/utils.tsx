import {
  TableCell,
  TableRow,
} from "@/components/ui/table"

import { ReactNode } from "react";
import { JobOffer } from "../offers/types";
import { JobOfferScenario, ComparisonRowDef } from "./types";
import { displayNumber } from "../offers/utils";

const buildRow = (jobOfferScenarios: JobOfferScenario[], row_label: string, options: Intl.NumberFormatOptions, derive_value?: (jobOfferScenario: JobOfferScenario) => number | string, row_key?: string): ReactNode => {
  if (!derive_value && !row_key) {
    throw new Error("Either derive_value or row_key must be provided");
  }

  if (derive_value && row_key) {
    throw new Error("Only one of derive_value or row_key can be provided");
  }

  const tableCells = (row_key) ? jobOfferScenarios.map(offer => <TableCell key={offer.id}>{displayNumber(offer[row_key as keyof JobOfferScenario], '-', options)}</TableCell>) : jobOfferScenarios.map(offer => <TableCell key={offer.id}>{derive_value && derive_value(offer)}</TableCell>)

  // Prepend the Row Label
  tableCells.unshift(<TableCell key="blank" className="w-fit captialize" > {row_label} </TableCell>)

  return tableCells
}

export const useBuildRows = (rows: ComparisonRowDef[]) => {
  return (jobOffers: JobOfferScenario[]): ReactNode[] => {
    return rows.map(({ row_key, label, options, derive_value }, index) =>
      <TableRow key={index} >
        {buildRow(jobOffers, label, options, derive_value, row_key)}
      </TableRow>
    )
  }
}

export const deriveExerciseCost = (offer: JobOffer): string => {
  if (!offer.strike_price || !offer.number_of_shares) return '-';
  return new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", "currency": "USD" }).format(offer.number_of_shares * offer.strike_price)
}

export const deriveDilutionPercentageOwned = (jobOfferScenario: JobOfferScenario): string => {
  if (!jobOfferScenario.percentage_ownership || !jobOfferScenario.dilution) return '-';
  return new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 4, minimumFractionDigits: 2 }).format(jobOfferScenario.percentage_ownership * jobOfferScenario.dilution)
}

export const deriveEquityValue = (jobOfferScenario: JobOfferScenario): string => {
  if (!jobOfferScenario.percentage_ownership || !jobOfferScenario.dilution) return '-';
  const fullyDilutedPercentage = jobOfferScenario.percentage_ownership * jobOfferScenario.dilution
  const equityValue = jobOfferScenario.valuation * fullyDilutedPercentage
  return new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", "currency": "USD", maximumFractionDigits: 0 }).format(equityValue)
}

export const deriveAnnualEquityValue = (jobOfferScenario: JobOfferScenario): string => {
  if (!jobOfferScenario.percentage_ownership || !jobOfferScenario.dilution) return '-';
  const fullyDilutedPercentage = jobOfferScenario.percentage_ownership * jobOfferScenario.dilution
  const annualEquityValue = (jobOfferScenario.valuation * fullyDilutedPercentage) / jobOfferScenario.vesting_years
  return new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", "currency": "USD", maximumFractionDigits: 0 }).format(annualEquityValue)
}

export const deriveAnnualCompensation = (jobOfferScenario: JobOfferScenario): string => {
  if (!jobOfferScenario.percentage_ownership || !jobOfferScenario.dilution || !jobOfferScenario.valuation) return '-';
  const fullyDilutedPercentage = jobOfferScenario.percentage_ownership * jobOfferScenario.dilution
  const annualEquityValue = (jobOfferScenario.valuation * fullyDilutedPercentage) / jobOfferScenario.vesting_years
  return new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", "currency": "USD", maximumFractionDigits: 0 }).format(annualEquityValue + jobOfferScenario.salary)
}
