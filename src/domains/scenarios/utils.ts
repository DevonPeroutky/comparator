import { JobOffer } from "../offers/types";
import { Scenario } from "./types";
import { Metric } from "./types";



/* TODO: Factor in dilution */
export const calculateOutcome = (scenario: Scenario, offer: JobOffer, metric: Metric): number => {
  const percentage_ownership = offer.percentage_ownership;
  const total_stock_package_value = percentage_ownership * scenario.valuation;
  const total_compensation_value = (offer.salary * offer.vesting_years) + total_stock_package_value;

  switch (metric) {
    case Metric.TotalCompensation:
      return Math.round(total_compensation_value);
    case Metric.TotalEquityPackage:
      return Math.round(total_stock_package_value);
    case Metric.AnnualCompensation:
      return Math.round(total_compensation_value / offer.vesting_years);
    case Metric.AnnualEquityPackage:
      return Math.round(total_stock_package_value / offer.vesting_years);
  }
}

export const buildOutcomeList = (scenario: Scenario, offers: JobOffer[], selectedMetric: Metric) => {
  const outcome: { [key: string]: any } = { scenario_valuation: scenario.valuation };

  offers.filter(o => o.latest_company_valuation <= scenario.valuation).forEach(offer => {
    outcome[offer.company_name] = calculateOutcome(scenario, offer, selectedMetric)
  });

  return outcome
}

export const generateScenarios = (jobOffer: JobOffer): Scenario[] => {
  const numberOfRounds = 5;
  const valuationMultiple = map(jobOffer.latest_company_valuation, 10000000, 50000000000, 75, 1.5);
  const valuations: number[] = generateSteppedArray(jobOffer.latest_company_valuation, jobOffer.latest_company_valuation * valuationMultiple, numberOfRounds)

  return valuations.map((valuation, index) => ({
    id: `${jobOffer.id}-${index}`,
    multiple: valuation / jobOffer.latest_company_valuation,
    valuation: Math.round(valuation / 1000000) * 1000000,
    number_of_rounds: index
  }));
}

function map(
  value: number,
  start1: number,
  stop1: number,
  start2: number,
  stop2: number
): number {
  const normalizedValue = (Math.log(value) - Math.log(start1)) / (Math.log(stop1) - Math.log(start1));
  return Math.exp(Math.log(start2) + normalizedValue * (Math.log(stop2) - Math.log(start2)));
}

export function generateSteppedArray(start: number, end: number, steps: number): number[] {
  const stepSize = (end - start) / (steps - 1);
  return Array.from({ length: steps }, (_, i) => start + i * stepSize);
}
