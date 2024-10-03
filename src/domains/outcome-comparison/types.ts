import { JobOffer } from "../offers/types";
import { Scenario } from "../scenarios/types";

export type JobOfferScenario = JobOffer & Scenario

export type ComparisonRowDef = {
  row_key?: string;
  label: string;
  options?: Intl.NumberFormatOptions;
  derive_value?: (offer: JobOffer) => number;
}
