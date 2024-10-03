import React, { ReactNode } from "react";
import { JobOffer } from "../offers/types";
import { Scenario } from "../scenarios/types";

export type JobOfferScenario = JobOffer & Scenario

export type ComparisonRowDefOld = {
  cell?: ReactNode;
  label: string;
  options?: Intl.NumberFormatOptions;
  derive_value?: (offer: JobOffer) => number;
}
