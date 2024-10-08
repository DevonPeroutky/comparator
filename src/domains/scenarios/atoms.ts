import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { atom, useAtom } from 'jotai';
import { Scenario } from './types';
import { jobOffersState } from '../offers/atoms';
import { generateScenarioForJobOffer } from './utils';
import { calcTotalDilution } from '@/lib/calculations';

// Which scenario is selected for each column in the CompareOffer table
export const selectedScenarioIdState = atomWithStorage<Record<string, string>>("selectedScenarioIdState", {});

// Possible scenarios for each offer.
export const defaultScenarioMapState = atom<Record<string, Scenario[]>>(
  (get) => {
    const scenarioMap = get(jobOffersState).reduce((acc, offer) => {
      const scenarios = generateScenarioForJobOffer(offer);
      acc[offer.id] = scenarios;
      return acc;
    }, {} as Record<string, Scenario[]>);
    return scenarioMap;
  },
)

const storage = createJSONStorage(
  () => localStorage, // or sessionStorage, asyncStorage or alike
)
export const userScenarioMapState = atomWithStorage<Record<string, Scenario[]> | null>("userScenarioMapState", null, storage, { getOnInit: true });
export const scenarioMapState = atom<Record<string, Scenario[]>>(
  (get) => get(userScenarioMapState) ?? get(defaultScenarioMapState),
  (get, set, newValue) => {
    const nextValue = typeof newValue === 'function' ? newValue(get(scenarioMapState)) : newValue;
    set(userScenarioMapState, nextValue)
  },
)

export const useUpdateScenario = () => {
  const [scenarioMap, setScenarioMap] = useAtom(scenarioMapState);

  // TODO: Recalculate the total dilution for the scenario
  return (offerId: string, scenario: Scenario) => {
    // Get list of scenarios up until this current scenario
    const scenarios: Scenario[] = scenarioMap[offerId];
    const currentScenarioIndex = scenarios.findIndex(s => s.id === scenario.id);
    const scenariosUpToCurrent = [...scenarios.slice(0, currentScenarioIndex), scenario];

    // Recalculate the total dilution for the scenario
    const roundsOfDilution: number[] = scenariosUpToCurrent.map(s => s.round_dilution);
    const totalDilution = calcTotalDilution(roundsOfDilution);

    setScenarioMap((prevMap) => ({
      ...prevMap,
      [offerId]: prevMap[offerId]?.map(s => s.id === scenario.id ? { ...scenario, "total_dilution": totalDilution } : s) || []
    }));
  };
}

export const useAddScenarios = () => {
  const [scenarioMap, setScenarioMap] = useAtom(scenarioMapState);

  return (offerId: string, scenarios: Scenario[]) => {
    setScenarioMap((prevMap) => ({
      ...prevMap,
      [offerId]: scenarios
    }));
  };
}
