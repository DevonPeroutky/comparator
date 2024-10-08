import { ReactNode } from "react";
import { JobOffer } from "../offers/types";
import { Scenario } from "../scenarios/types";

// Rename the various IDs to be named so there isn't a collison
export type JobOfferScenario = Omit<JobOffer, 'id'> & Omit<Scenario, 'id'> & { offer_id: JobOffer['id']; scenario_id: Scenario['id'] };

export type ComparisonRowDefOld = {
  cell?: ReactNode;
  label: string;
  options?: Intl.NumberFormatOptions;
  derive_value?: (offer: JobOffer) => number;
}
