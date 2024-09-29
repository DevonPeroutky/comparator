
export type CompanyValuation = {
  id: string;
  valuation: number
};

export type Outcome = {
  scenario_valuation: number;
  total_stock_package_value: number;
  annual_stack_package_value: number;
  total_compensation_value: number
  annual_compensation_value: number
};

export type EquityJourney = {
  offer_id: string;
  company_name: string;
  outcomes: Outcome[]
}

