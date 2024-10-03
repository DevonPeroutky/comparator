import { useRecoilValue } from "recoil";
import { determineRoundDilution } from "../dilution/utils";
import { JobOffer } from "../offers/types";
import { scenarioMapState } from "./atoms";
import { Scenario } from "./types";
import { Metric } from "./types";
import { jobOffersState } from "../offers/atoms";
import { deriveAnnualCompensation, deriveAnnualEquityValue, deriveDilutionPercentageOwned, deriveEquityValue } from "@/lib/calculations";

/* TODO: Factor in dilution */
export const calculateOutcome = (scenario: Scenario, offer: JobOffer, metric: Metric): number => {
  const dilutedPercentage = deriveDilutionPercentageOwned(offer.percentage_ownership, scenario.dilution);

  switch (metric) {
    case Metric.TotalEquityPackage:
      return deriveEquityValue(offer.percentage_ownership, 1, scenario.valuation);
    case Metric.AnnualCompensation:
      return deriveAnnualCompensation(offer.percentage_ownership, 1, scenario.valuation, offer.vesting_years, offer.salary);
    case Metric.AnnualEquityPackage:
      return deriveAnnualEquityValue(offer.percentage_ownership, 1, scenario.valuation, offer.vesting_years);
  }
}

const determineDilution = (valuations: number[]): number => {
  return valuations.map((valuation, index) => determineRoundDilution(valuation)).map(dilution => 1 - dilution).reduce((a, b) => a * b, 1);
}

export const generateScenarios = (jobOffer: JobOffer): Scenario[] => {
  const numberOfRounds = 5;
  const valuationMultiple = map(jobOffer.latest_company_valuation, 10000000, 50000000000, 75, 1.5);
  const valuations: number[] = generateSteppedArray(jobOffer.latest_company_valuation, jobOffer.latest_company_valuation * valuationMultiple, numberOfRounds)

  return valuations.map((valuation, index) => ({
    id: `${jobOffer.id}-${index}`,
    multiple: valuation / jobOffer.latest_company_valuation,
    valuation: Math.round(valuation / 1000000) * 1000000,
    dilution: determineDilution(valuations.slice(0, index)),
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

export const useBuildScenarioListForGraphing = () => {
  const scenarioMap = useRecoilValue(scenarioMapState);
  const offers = useRecoilValue(jobOffersState);

  return (selectedMetric: Metric): Record<string, number>[] => {
    const scenarios: Scenario[] = Object.values(scenarioMap).flatMap(scenarios => [scenarios[0], scenarios[scenarios.length - 1]]);
    scenarios.sort((a, b) => a.valuation - b.valuation);

    return scenarios.map(scenario => {
      const outcome: { [key: string]: any } = { scenario_valuation: scenario.valuation };

      offers.filter(o => o.latest_company_valuation <= scenario.valuation).forEach(offer => {
        outcome[offer.company_name] = calculateOutcome(scenario, offer, selectedMetric)
      });

      return outcome
    })
  }
}
