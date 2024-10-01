
import { atom, useRecoilState } from 'recoil';
import { Scenario } from './types';

export const DEFAULT_SCENARIOS: Scenario[] = [
  {
    id: "728ed52fa",
    valuation: 320000000,
    number_of_rounds: 1
  },
  {
    id: "728ed52fb",
    valuation: 500000000,
    number_of_rounds: 2
  },
  {
    id: "728ed52fc",
    valuation: 1000000000,
    number_of_rounds: 3
  },
  {
    id: "728ed52fd",
    valuation: 2000000000,
    number_of_rounds: 4
  },
  {
    id: "728ed52fe",
    valuation: 3000000000,
    number_of_rounds: 5
  },
  {
    id: "728ed52ff",
    valuation: 5000000000,
    number_of_rounds: 6
  },
  {
    id: "728ed52fg",
    valuation: 10000000000,
    number_of_rounds: 7
  },
]

export const scenarioState = atom<Scenario[]>({
  key: 'scenarioState',
  default: DEFAULT_SCENARIOS,
});

export const scenarioMapState = atom<Record<string, Scenario[]>>({
  key: 'scenarioMapState',
  default: {},
});

export const useUpdateScenario = () => {
  const [scenarioMap, setScenarioMap] = useRecoilState(scenarioMapState);

  return (offerId: string, scenario: Scenario) => {
    setScenarioMap((prevMap) => ({
      ...prevMap,
      [offerId]: prevMap[offerId]?.map(s => s.id === scenario.id ? scenario : s) || []
    }));
  };
}

export const useAddScenarios = () => {
  const [scenarioMap, setScenarioMap] = useRecoilState(scenarioMapState);

  return (offerId: string, scenarios: Scenario[]) => {
    setScenarioMap((prevMap) => ({
      ...prevMap,
      [offerId]: [...(prevMap[offerId] || []), ...scenarios]
    }));
  };
}
