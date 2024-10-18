import { isPrivateJobOffer, JobOffer, PrivateJobOffer } from "@/domains/offers/types";
import { Scenario } from "@/domains/scenarios/types";
import { JobOfferScenario } from "../types";
import { deriveDilutionPercentageOwned, deriveEquityValue, deriveExerciseCost, derivePublicEquityValue } from "@/lib/calculations";

export const deriveJobOfferScenario = (offer: JobOffer, scenario: Scenario): JobOfferScenario => {
  return {
    id: `${offer.id}-${scenario.id}`,
    scenario_id: scenario.id,
    offer_id: offer.id,

    salary: offer.salary,
    company_name: offer.company_name,
    latest_company_valuation: offer.latest_company_valuation,
    vesting_years: offer.vesting_years,
    number_of_shares: offer.number_of_shares,

    valuation: scenario.valuation,
    total_dilution: (isPrivateJobOffer(offer)) ? deriveDilutionPercentageOwned(scenario.total_dilution, (offer as PrivateJobOffer).percentage_ownership) : null,
    exercise_cost: (isPrivateJobOffer(offer)) ? deriveExerciseCost((offer as PrivateJobOffer).strike_price, offer.number_of_shares) : null,
    equity_value: (isPrivateJobOffer(offer)) ? deriveEquityValue((offer as PrivateJobOffer).percentage_ownership, scenario.total_dilution, scenario.valuation) : derivePublicEquityValue(scenario.stock_price, offer.number_of_shares),
  }
}
