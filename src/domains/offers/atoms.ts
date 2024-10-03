import { atom } from 'recoil';
import { JobOffer } from './types';

const TEST_JOB_OFFERS: JobOffer[] = [
  {
    id: "728ed52f",
    company_name: "Kindo",
    salary: 225000,
    number_of_shares: 91000,
    latest_company_valuation: 55000000,
    vesting_years: 5,
    strike_price: 0.5,
    percentage_ownership: .0025,
  },
  {
    id: "728ed52fgg",
    company_name: "Valon",
    salary: 180000,
    number_of_shares: 3267,
    latest_company_valuation: 584000000,
    vesting_years: 4,
    strike_price: 34.70,
    total_number_of_outstanding_shares: 2698775,
    percentage_ownership: 3267 / 2698775,
  },
  {
    id: "11x",
    company_name: "11x",
    salary: 225000,
    latest_company_valuation: 320000000,
    vesting_years: 4,
    percentage_ownership: .0011,
  },
  {
    id: "together.ai",
    company_name: "Together.ai",
    salary: 240000,
    number_of_shares: 11000,
    latest_company_valuation: 2000000000,
    vesting_years: 4,
    strike_price: 75,
    total_number_of_outstanding_shares: 26829268,
    percentage_ownership: .00041,
  },
]



export const jobOffersState = atom<JobOffer[]>({
  key: 'jobOffersState',
  default: TEST_JOB_OFFERS,
});

