import { z } from "zod";

export type JobOffer = {
  id: string;
  company_name: string;
  salary: number;
  number_of_shares?: number;
  total_number_of_outstanding_shares?: number;
  percentage_ownership: number;
  strike_price?: number;
  latest_company_valuation: number;
  vesting_years: number;
};

