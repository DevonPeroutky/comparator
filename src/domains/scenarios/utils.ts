import { useRecoilValue } from "recoil";
import { determineRoundDilution } from "../dilution/utils";
import { JobOffer } from "../offers/types";
import { scenarioMapState } from "./atoms";
import { Scenario } from "./types";
import { Metric } from "./types";
import { jobOffersState } from "../offers/atoms";
import { deriveAnnualCompensation, deriveAnnualEquityValue, deriveDilutionPercentageOwned, deriveEquityValue, determineTotalDilution } from "@/lib/calculations";
import { generateSteppedArray, mapRange } from "@/lib/utils";

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

export const generateScenarios = (jobOffer: JobOffer, projected_valuation_journey: number[]): Scenario[] => {
  return projected_valuation_journey.map((valuation, index) => ({
    id: `${jobOffer.id}-${index}`,
    multiple: valuation / jobOffer.latest_company_valuation,
    valuation: valuation,
    total_dilution: determineTotalDilution(projected_valuation_journey.slice(1, index + 1)),
    round_dilution: (index == 0) ? 0 : determineRoundDilution(valuation),
    number_of_rounds: index
  }));
}

export const generateScenarioForJobOffer = (jobOffer: JobOffer): Scenario[] => {
  const numberOfRounds = 5;
  const valuationMultiple = mapRange(jobOffer.latest_company_valuation, 10000000, 50000000000, 75, 1.5);
  const valuations: number[] = generateSteppedArray(jobOffer.latest_company_valuation, jobOffer.latest_company_valuation * valuationMultiple, numberOfRounds)
  return generateScenarios(jobOffer, valuations);
}

export const useBuildScenarioListForGraphing = () => {
  const scenarioMap = useRecoilValue(scenarioMapState);
  const offers = useRecoilValue(jobOffersState);

  return (selectedMetric: Metric): Record<string, number>[] => {
    const scenarios: Scenario[] = Object.values(scenarioMap).flatMap(scenarios => [scenarios[0], scenarios[scenarios.length - 1]]);
    scenarios.sort((a, b) => a.valuation - b.valuation);
    console.log(`SCENARIOS `, scenarios)

    // TODO: We need to calculate the dilution for this scenario for each offer, otherwise we end up using the base amount

    return scenarios.map(scenario => {
      const outcome: { [key: string]: any } = { scenario_valuation: scenario.valuation };

      offers.filter(o => o.latest_company_valuation <= scenario.valuation).forEach(offer => {
        console.log("Building outcomes for ", outcome.scenario_valuation, scenario, "----", offer)
        outcome[offer.company_name] = calculateOutcome(scenario, offer, selectedMetric)
      });

      return outcome
    })
  }
}


