import { atom } from 'jotai';
import { JobOffer } from './types';

const TEST_JOB_OFFERS: JobOffer[] = [
  {
    id: "kindo",
    company_name: "Kindo",
    salary: 225000,
    number_of_shares: 91000,
    latest_company_valuation: 55000000,
    vesting_years: 5,
    strike_price: 0.5,
    percentage_ownership: .0025,
  },
  {
    id: "valon",
    company_name: "Valon",
    salary: 180000,
    number_of_shares: 3267,
    latest_company_valuation: 584000000,
    vesting_years: 4,
    strike_price: 34.70,
    total_number_of_outstanding_shares: 2698775,
    percentage_ownership: 3267 / 2698775,
  },
  // Commented out offers remain the same
];

export const jobOffersAtom = atom<JobOffer[]>(TEST_JOB_OFFERS);

