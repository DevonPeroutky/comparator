import { ComparatorPrimitive } from "../types";

export type BaseJobOffer = ComparatorPrimitive & {
  id: string;
  company_name: string;
  salary: number;
  vesting_years: number;

  number_of_shares?: number;
};

export type PrivateJobOffer = {
  latest_company_valuation: number;
  strike_price?: number;

  // Ex. You get 11,000 shares (Together.ai, Valon)
  total_number_of_outstanding_shares?: number;

  // Ex. You get .25% (Kindo & 11x)
  percentage_ownership: number;

} & BaseJobOffer

export type PublicJobOffer = {
  market_cap: number;

  // Ex: Giving you $400,0000 in stock / 4 years.
  equity_valuation?: number;
  stock_price?: number;
} & BaseJobOffer;


type JobOffer = PrivateJobOffer | PublicJobOffer;
