import { JobOffer } from "../offers/types";
import { JobOfferScenario } from "./types";

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
