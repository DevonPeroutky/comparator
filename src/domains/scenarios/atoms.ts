
import { atom } from 'jotai';
import { Scenario } from './types';

export const DEFAULT_SCENARIOS: Scenario[] = [
  {
    id: "728ed52fa",
    valuation: 320000000,
    multiple: 1,
    dilution: 0.1,
    number_of_rounds: 1
  },
  {
    id: "728ed52fb",
    valuation: 500000000,
    number_of_rounds: 2,
    dilution: 0.1,
    multiple: 500000000 / 320000000,
  },
  {
    id: "728ed52fc",
    valuation: 1000000000,
    multiple: 1000000000 / 320000000,
    dilution: 0.1,
    number_of_rounds: 3
  },
  {
    id: "728ed52fd",
    valuation: 2000000000,
    multiple: 2000000000 / 320000000,
    dilution: 0.1,
    number_of_rounds: 4
  },
  {
    id: "728ed52fe",
    valuation: 3000000000,
    multiple: 3000000000 / 320000000,
    dilution: 0.1,
    number_of_rounds: 5
  },
  {
    id: "728ed52ff",
    valuation: 5000000000,
    multiple: 5000000000 / 320000000,
    dilution: 0.1,
    number_of_rounds: 6
  },
  {
    id: "728ed52fg",
    valuation: 10000000000,
    multiple: 10000000000 / 320000000,
    dilution: 0.1,
    number_of_rounds: 7
  },
]

// Which scenario is selected for each column in the CompareOffer table
export const selectedScenarioIdAtom = atom<Record<string, string>>({});

// Possible scenarios for each offer.
export const scenarioMapAtom = atom<Record<string, Scenario[]>>({});

export const useUpdateScenario = () => {
  const [scenarioMap, setScenarioMap] = useAtom(scenarioMapAtom);

  return (offerId: string, scenario: Scenario) => {
    setScenarioMap((prevMap) => ({
      ...prevMap,
      [offerId]: prevMap[offerId]?.map(s => s.id === scenario.id ? scenario : s) || []
    }));
  };
}

export const useAddScenarios = () => {
  const [scenarioMap, setScenarioMap] = useAtom(scenarioMapAtom);

  return (offerId: string, scenarios: Scenario[]) => {
    setScenarioMap((prevMap) => ({
      ...prevMap,
      [offerId]: scenarios
    }));
  };
}
