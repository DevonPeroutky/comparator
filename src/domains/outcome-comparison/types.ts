import { ReactNode } from "react";
import { JobOffer } from "../offers/types";
import { Scenario } from "../scenarios/types";

// Rename the various IDs to be named so there isn't a collison
export type JobOfferScenario = Pick<JobOffer, 'salary' | 'company_name' | 'latest_company_valuation' | 'vesting_years' | 'number_of_shares'> &
  Pick<Scenario, 'valuation' | 'total_dilution'> & {
    offer_id: JobOffer['id'];
    scenario_id: Scenario['id'];
    id: `${JobOffer['id']}-${Scenario['id']}`;
    exercise_cost?: number;
    equity_value: number;
  };

export type ComparisonRowDefOld = {
  cell?: ReactNode;
  label: string;
  options?: Intl.NumberFormatOptions;
  derive_value?: (offer: JobOffer) => number;
}
