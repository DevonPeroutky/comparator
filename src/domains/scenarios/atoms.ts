
import { atom, GetRecoilValue, selector } from 'recoil';
import { CompanyValuation, Outcome, EquityJourney } from './columns';
import { jobOffersState } from '../offers/atoms';
import { JobOffer } from '../offers/types';

const DEFAULT_SCENARIOS: CompanyValuation[] = [
  {
    id: "728ed52fa",
    valuation: 320000000
  },
  {
    id: "728ed52fb",
    valuation: 500000000
  },
  {
    id: "728ed52fc",
    valuation: 1000000000
  },
  {
    id: "728ed52fd",
    valuation: 2000000000
  },
  {
    id: "728ed52fe",
    valuation: 3000000000
  },
  {
    id: "728ed52ff",
    valuation: 5000000000
  },
  {
    id: "728ed52fg",
    valuation: 10000000000
  },
]

export const scenarioState = atom<CompanyValuation[]>({
  key: 'scenarioState',
  default: DEFAULT_SCENARIOS,
});

const calculateOutcome = (scenario: CompanyValuation, offer: JobOffer): Outcome => {
  const total_stock_package_value = offer.percentage_ownership * scenario.valuation;
  const total_compensation_value = (offer.salary * offer.vesting_years) + total_stock_package_value;

  return {
    scenario_valuation: scenario.valuation,
    total_stock_package_value: total_stock_package_value,
    annual_stack_package_value: total_stock_package_value / offer.vesting_years,
    total_compensation_value: total_compensation_value,
    annual_compensation_value: total_compensation_value / offer.vesting_years,
  }
}

export const equityJourniesState = selector<EquityJourney[]>({
  key: 'equityJourniesState',
  get: ({ get }: { get: GetRecoilValue }) => {
    const scenarios = get(scenarioState);
    const jobOffers = get(jobOffersState);

    return jobOffers.map(offer => {
      const outcomes: Outcome[] = scenarios.map(scenario => calculateOutcome(scenario, offer));
      return {
        offer_id: offer.id,
        company_name: offer.company_name,
        outcomes: outcomes
      };
    });
  }
});
