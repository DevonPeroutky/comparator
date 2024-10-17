import { determineRoundDilution } from "../dilution/utils";
import { PrivateJobOffer, PublicJobOffer } from "../offers/types";
import { scenarioMapState } from "./atoms";
import { Scenario } from "./types";
import { Metric } from "./types";
import { jobOffersState } from "../offers/atoms";
import { calcTotalDilution, deriveAnnualCompensation, deriveAnnualEquityValue, deriveEquityValue, determineTotalDilution, projectRoundsOfDilution } from "@/lib/calculations";
import { generateSteppedArray, mapRange } from "@/lib/utils";
import { useAtomValue } from "jotai";

export const calculatePublicOutcome = (scenario: Scenario, offer: PublicJobOffer, metric: Metric): number => {
  switch (metric) {
    case Metric.TotalEquityPackage:
      return scenario.stock_price * offer.number_of_shares;
    case Metric.AnnualCompensation:
      return offer.salary + ((scenario.stock_price * offer.number_of_shares) / offer.vesting_years);
    case Metric.AnnualEquityPackage:
      return ((scenario.stock_price - offer.stock_price) * offer.number_of_shares) / offer.vesting_years;
  }
}

export const calculatePrivateOutcome = (scenario: Scenario, offer: PrivateJobOffer, metric: Metric): number => {
  switch (metric) {
    case Metric.TotalEquityPackage:
      return deriveEquityValue(offer.percentage_ownership, 1, scenario.valuation);
    case Metric.AnnualCompensation:
      return deriveAnnualCompensation(offer.percentage_ownership, 1, scenario.valuation, offer.vesting_years, offer.salary);
    case Metric.AnnualEquityPackage:
      return deriveAnnualEquityValue(offer.percentage_ownership, 1, scenario.valuation, offer.vesting_years);
  }
}

export const generateScenarioForPrivateJobOffer = (jobOffer: PrivateJobOffer): Scenario[] => {
  const numberOfRounds = 5;
  const valuationMultiple = mapRange(jobOffer.latest_company_valuation, 10000000, 50000000000, 75, 1.5);
  const projected_valuation_journey: number[] = generateSteppedArray(jobOffer.latest_company_valuation, jobOffer.latest_company_valuation * valuationMultiple, numberOfRounds)
  const projectTotalDilution = (index: number) => calcTotalDilution(projectRoundsOfDilution(projected_valuation_journey.slice(1, index + 1)));

  return projected_valuation_journey.map((valuation, index) => ({
    id: `${jobOffer.id}-${index}`,
    multiple: valuation / jobOffer.latest_company_valuation,
    valuation: valuation,
    total_dilution: projectTotalDilution(index),
    round_dilution: (index == 0) ? 0 : determineRoundDilution(valuation),
    number_of_rounds: index
  }));
}

export const generateScenarioForPublicJobOffer = (jobOffer: PublicJobOffer): Scenario[] => {
  const numberOfRounds = 5;
  const valuationMultiple = mapRange(jobOffer.latest_company_valuation, 10000000, 50000000000, 75, 1.5);
  const projected_valuation_journey: number[] = generateSteppedArray(jobOffer.latest_company_valuation, jobOffer.latest_company_valuation * valuationMultiple, numberOfRounds)
  return projected_valuation_journey.map((valuation, index) => ({
    id: `${jobOffer.id}-${index}`,
    multiple: valuation / jobOffer.latest_company_valuation,
    valuation: valuation,
    stock_price: Number(((valuation / jobOffer.latest_company_valuation) * jobOffer.stock_price).toFixed(2)),
    number_of_rounds: index
  }));
}

export const useBuildScenarioListForGraphing = () => {
  const scenarioMap = useAtomValue(scenarioMapState);
  const offers = useAtomValue(jobOffersState);

  return (selectedMetric: Metric): Record<string, number>[] => {
    const scenarios: Scenario[] = Object.values(scenarioMap).flatMap(scenarios => scenarios).sort((a, b) => a.valuation - b.valuation);

    return scenarios.map(scenario => {
      const outcome = { scenario_valuation: scenario.valuation };

      offers.forEach(offer => {
        if (offer.latest_company_valuation <= scenario.valuation && scenario.valuation <= 100 * offer.latest_company_valuation) {
          outcome[offer.id] = ("percentage_ownership" in offer) ? calculatePrivateOutcome(scenario, offer as PrivateJobOffer, selectedMetric) : calculatePublicOutcome(scenario, offer as PublicJobOffer, selectedMetric);
        }
      });

      return outcome
    })
  }
}


