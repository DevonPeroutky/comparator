import { JobOffer } from "../offers/columns";
import { CompanyValuation } from "./columns";
import { Metric } from "./types";



/* TODO: Factor in dilution */
export const calculateOutcome = (scenario: CompanyValuation, offer: JobOffer, metric: Metric): number => {
  const percentage_ownership = offer.percentage_ownership || offer.number_of_shares / offer.total_number_of_outstanding_shares;
  const total_stock_package_value = percentage_ownership * scenario.valuation;
  const total_compensation_value = (offer.salary * offer.vesting_years) + total_stock_package_value;

  switch (metric) {
    case Metric.TotalCompensation:
      return total_compensation_value;
    case Metric.TotalEquityPackage:
      return total_stock_package_value;
    case Metric.AnnualCompensation:
      return total_compensation_value / offer.vesting_years;
    case Metric.AnnualEquityPackage:
      return total_stock_package_value / offer.vesting_years
  }
}

export const buildOutcomeList = (scenario: CompanyValuation, offers: JobOffer[], selectedMetric: Metric) => {
  const outcome: { [key: string]: any } = { scenario_valuation: scenario.valuation };

  offers.filter(o => o.latest_company_valuation <= scenario.valuation).forEach(offer => {
    outcome[offer.company_name] = calculateOutcome(scenario, offer, selectedMetric)
  });

  return outcome
}
