import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import { JobOffer, PrivateJobOffer, PublicJobOffer } from './types';
import { atomWithLocation, atomWithHash } from 'jotai-location'
import { Atom, atom, useAtomValue } from 'jotai';
import { ChartConfig } from '@/components/ui/chart';

const TEST_JOB_OFFERS: JobOffer[] = [
  {
    id: "choam",
    company_name: "Choam",
    salary: 225000,
    number_of_shares: 91000,
    latest_company_valuation: 55000000,
    vesting_years: 5,
    strike_price: 0.5,
    percentage_ownership: .0025,
  },
  {
    id: "pied_piper",
    company_name: "Pied Piper",
    salary: 180000,
    number_of_shares: 3267,
    latest_company_valuation: 584000000,
    vesting_years: 4,
    strike_price: 34.70,
    total_number_of_outstanding_shares: 2698775,
    percentage_ownership: 3267 / 2698775,
  },
  {
    id: "wayne_enterprises",
    company_name: "Wayne Enterprises",
    salary: 230000,
    latest_company_valuation: 43000000000,
    vesting_years: 4,
    stock_price: 127.70,
    equity_valuation: 170000 * 4,
    number_of_shares: Math.ceil((170000 * 4) / 127.70),
  },
];

const storage = createJSONStorage(
  () => localStorage, // or sessionStorage, asyncStorage or alike
)
const defaultJobOfferState = atom<JobOffer[]>(TEST_JOB_OFFERS,);
const userJobOfferState = atomWithStorage<JobOffer[] | null>("userJobOfferState", null, storage, { getOnInit: true });
const persistedJobOffersState = atomWithHash<JobOffer[] | null>("userJobOfferURLState", null);
export const jobOffersState = atom<JobOffer[]>(
  (get) => get(persistedJobOffersState) ?? get(userJobOfferState) ?? get(defaultJobOfferState), (get, set, newValue) => {
    const nextValue = typeof newValue === 'function' ? newValue(get(jobOffersState)) : newValue;
    set(userJobOfferState, nextValue)
    set(persistedJobOffersState, nextValue)
  },
);

export const publicJobOffersState: Atom<PublicJobOffer[]> = atom((get) => {
  const offers = get(jobOffersState);
  return offers.filter((offer): offer is PublicJobOffer =>
    'equity_valuation' in offer && 'stock_price' in offer
  );
});

export const privateJobOffersState: Atom<PrivateJobOffer[]> = atom((get) => {
  const offers = get(jobOffersState);
  return offers.filter((offer): offer is PrivateJobOffer =>
    'percentage_ownership' in offer
  );
});

export const chartConfigAtom = atom((get) => {
  const offers = get(jobOffersState);
  return offers.reduce((config, offer, idx) => {
    config[offer.id] = {
      label: offer.company_name,
      color: `var(--color-${idx + 1})`,
    };
    return config;
  }, {} as ChartConfig);
});

export const useCompanyName = () => {
  const jobOffers = useAtomValue(jobOffersState);
  return (id: string) => {
    const offer = jobOffers.find(offer => offer.id === id);
    return offer?.company_name
  }

} 
