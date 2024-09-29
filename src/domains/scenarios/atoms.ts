
import { atom, GetRecoilValue, selector } from 'recoil';
import { Scenario, Outcome } from './columns';
import { jobOffersState } from '../offers/atoms';
import { JobOffer } from '../offers/columns';

const DEFAULT_SCENARIOS: Scenario[] = [
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

export const scenarioState = atom<Scenario[]>({
  key: 'scenarioState',
  default: DEFAULT_SCENARIOS,
});

const calculateOutcome = (scenario: Scenario, offer: JobOffer): Outcome => {
  const percentage_ownership = offer.percentage_ownership || offer.number_of_shares / offer.total_number_of_outstanding_shares;
  const total_stock_package_value = percentage_ownership * scenario.valuation;
  const total_compensation_value = (offer.salary * offer.vesting_years) + total_stock_package_value;

  return {
    offer: offer,
    scenario: scenario,
    total_stock_package_value: total_stock_package_value,
    annual_stack_package_value: total_stock_package_value / offer.vesting_years,
    total_compensation_value: total_compensation_value,
    annual_compensation_value: total_compensation_value / offer.vesting_years,
  }
}

export const outcomesState = selector<Outcome[]>({
  key: 'outcomesState',
  get: ({ get }: { get: GetRecoilValue }) => {
    const scenarios = get(scenarioState);
    const jobOffers = get(jobOffersState);

    return scenarios.flatMap(scenario => {
      return jobOffers.map(offer => calculateOutcome(scenario, offer));
    })
  }
});
