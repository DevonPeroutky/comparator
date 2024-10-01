export enum Metric {
  TotalCompensation = "total_compensation",
  TotalEquityPackage = "total_equity_package",
  AnnualCompensation = "annual_compensation",
  AnnualEquityPackage = "annual_equity_package",
}

export type Scenario = {
  id: string;
  name?: string;
  valuation: number;
  number_of_rounds: number;
};

export type Outcome = {
  scenario_valuation: number;
  total_stock_package_value: number;
  annual_stack_package_value: number;
  total_compensation_value: number
  annual_compensation_value: number
};

export type EquityJourney = {
  [key: string]: Scenario[];
};


