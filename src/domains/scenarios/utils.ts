import { determineRoundDilution } from "../dilution/utils";
import { JobOffer } from "../offers/types";
import { scenarioMapState } from "./atoms";
import { Scenario } from "./types";
import { Metric } from "./types";
import { jobOffersState } from "../offers/atoms";
import { calcTotalDilution, deriveAnnualCompensation, deriveAnnualEquityValue, deriveEquityValue, determineTotalDilution, projectRoundsOfDilution } from "@/lib/calculations";
import { generateSteppedArray, mapRange } from "@/lib/utils";
import { useAtomValue } from "jotai";

/* TODO: Factor in dilution */
export const calculateOutcome = (scenario: Scenario, offer: JobOffer, metric: Metric): number => {
  switch (metric) {
    case Metric.TotalEquityPackage:
      return deriveEquityValue(offer.percentage_ownership, 1, scenario.valuation);
    case Metric.AnnualCompensation:
      return deriveAnnualCompensation(offer.percentage_ownership, 1, scenario.valuation, offer.vesting_years, offer.salary);
    case Metric.AnnualEquityPackage:
      return deriveAnnualEquityValue(offer.percentage_ownership, 1, scenario.valuation, offer.vesting_years);
  }
}

const generateScenarios = (jobOffer: JobOffer, projected_valuation_journey: number[]): Scenario[] => {
  console.log(`Generating scenarios for job offer: `, jobOffer)
  if ('percentage_ownership' in jobOffer) {
    // This is a PrivateJobOffer
    const projectTotalDilution = (index: number) => calcTotalDilution(projectRoundsOfDilution(projected_valuation_journey.slice(1, index + 1)));
    return projected_valuation_journey.map((valuation, index) => ({
      id: `${jobOffer.id}-${index}`,
      multiple: valuation / jobOffer.latest_company_valuation,
      valuation: valuation,
      total_dilution: projectTotalDilution(index),
      round_dilution: (index == 0) ? 0 : determineRoundDilution(valuation),
      number_of_rounds: index
    }));
  } else {
    // This is a PublicJobOffer
    return projected_valuation_journey.map((valuation, index) => ({
      id: `${jobOffer.id}-${index}`,
      // multiple: stock_price / jobOffer.current_stock_price,
      valuation: valuation,
      stock_price: jobOffer.stock_price,
      number_of_rounds: index
    }));
  }
}

export const generateScenarioForJobOffer = (jobOffer: JobOffer): Scenario[] => {
  const numberOfRounds = 5;
  const valuationMultiple = mapRange(jobOffer.latest_company_valuation, 10000000, 50000000000, 75, 1.5);
  const valuations: number[] = generateSteppedArray(jobOffer.latest_company_valuation, jobOffer.latest_company_valuation * valuationMultiple, numberOfRounds)
  return generateScenarios(jobOffer, valuations);
}

export const useBuildScenarioListForGraphing = () => {
  const scenarioMap = useAtomValue(scenarioMapState);
  const offers = useAtomValue(jobOffersState);

  console.log(`SCENARIO MAP: `, scenarioMap)
  return (selectedMetric: Metric): Record<string, number>[] => {
    const scenarios: Scenario[] = Object.values(scenarioMap).flatMap(scenarios => [scenarios[0], scenarios[scenarios.length - 1]]);
    // const scenarios: Scenario[] = Object.values(scenarioMap).flatMap(scenarios => ...scenarios]);
    scenarios.sort((a, b) => a.valuation - b.valuation);

    console.log(`SCENARIOS --> `, scenarios);
    return scenarios.map(scenario => {
      const outcome: { [key: string]: any } = { scenario_valuation: scenario.valuation };

      offers.filter(o => o.latest_company_valuation <= scenario.valuation).forEach(offer => {
        outcome[offer.id] = calculateOutcome(scenario, offer, selectedMetric)
      });

      return outcome
    })
  }
}


