import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { JobOffer } from './types';
import { atomWithLocation, atomWithHash } from 'jotai-location'
import { atom } from 'jotai';
import { ChartConfig } from '@/components/ui/chart';

const TEST_JOB_OFFERS: JobOffer[] = [
  {
    id: "acme",
    company_name: "Acme",
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

const storage = createJSONStorage(
  () => localStorage, // or sessionStorage, asyncStorage or alike
)
export const defaultJobOfferState = atom<JobOffer[]>(TEST_JOB_OFFERS,);
export const userJobOfferState = atomWithStorage<JobOffer[] | null>("userJobOfferState", null, storage, { getOnInit: true });
export const persistedJobOffersState = atomWithHash<JobOffer[] | null>("userJobOfferURLState", null);
export const jobOffersState = atom<JobOffer[]>(
  (get) => get(persistedJobOffersState) ?? get(userJobOfferState) ?? get(defaultJobOfferState),
  (get, set, newValue) => {
    const nextValue = typeof newValue === 'function' ? newValue(get(jobOffersState)) : newValue;
    set(userJobOfferState, nextValue)
    set(persistedJobOffersState, nextValue)
  },
);

export const chartConfigAtom = atom((get) => {
  const offers = get(jobOffersState);
  return offers.reduce((config, offer, idx) => {
    config[offer.company_name] = {
      label: offer.company_name,
      color: `hsl(var(--chart-${idx + 1}))`,
    };
    return config;
  }, {} as ChartConfig);
});
