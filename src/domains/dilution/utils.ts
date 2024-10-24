import { useAtom } from "jotai";
import { JobOffer, PrivateJobOffer } from "../offers/types";
import { scenarioMapState } from "../scenarios/atoms";
import { calcTotalDilution } from "@/lib/calculations";

export const determineRoundDilution = (valuation: number): number => {
  if (valuation < 10000000) {
    return .35;
  } else if (valuation < 18000000) {
    return .30;
  } else if (valuation < 100000000) {
    return .25;
  } else if (valuation < 500000000) {
    return .20;
  } else if (valuation < 1000000000) {
    return .15;
  } else if (valuation < 5000000000) {
    return .10;
  } else {
    return .05;
  }
}


export const useEstimateDilutionForScenario = () => {
  const [scenarioMap] = useAtom(scenarioMapState);

  return (valuation: number, offer: PrivateJobOffer): number => {
    if (valuation == offer.latest_company_valuation) { return 1; }

    const scenarios = Object.values(scenarioMap[offer.id]);
    let selectedScenarios = scenarios.filter(s => s.valuation <= valuation);

    let latestScenario = selectedScenarios[selectedScenarios.length - 1];
    while (latestScenario.valuation * 2 < valuation) {
      const newScenario = { ...latestScenario, valuation: latestScenario.valuation * 2 };
      selectedScenarios.push(newScenario);
      latestScenario = newScenario;
    }

    const roundsOfDilution: number[] = selectedScenarios.map(s => s.valuation).map(determineRoundDilution);
    return calcTotalDilution(roundsOfDilution);
  };
};
