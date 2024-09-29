import { atom } from 'recoil';
import { JobOffer } from './columns';

const TEST_JOB_OFFERS: JobOffer[] = [
  {
    id: "728ed52f",
    company_name: "Kindo",
    salary: 225000,
    number_of_shares: 91000,
    latest_company_valuation: 55000000,
    vesting_years: 5,
    strike_price: 0.5,
    total_number_of_outstanding_shares: 100000000,
    percentage_ownership: 0.09,
  },
  {
    id: "728ed52fgg",
    company_name: "Valon",
    salary: 180000,
    number_of_shares: 3267,
    latest_company_valuation: 584000000,
    vesting_years: 4,
    strike_price: 0.5,
    total_number_of_outstanding_shares: 100000000,
    percentage_ownership: 0.09,
  },
]



export const jobOffersState = atom<JobOffer[]>({
  key: 'jobOffersState',
  default: TEST_JOB_OFFERS,
});
