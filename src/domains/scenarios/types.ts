export enum Metric {
  // TotalCompensation = "total_compensation",
  TotalEquityPackage = "total_equity_package",
  AnnualCompensation = "annual_compensation",
  AnnualEquityPackage = "annual_equity_package",
}

export type Scenario = {
  id: string;
  name?: string;
  multiple: number;
  valuation: number;
  total_dilution?: number;
  round_dilution?: number;
  number_of_rounds?: number;
  stock_price?: number;
};

export type EquityJourney = {
  [key: string]: Scenario[];
};


