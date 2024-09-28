import { ColumnDef } from "@tanstack/react-table";

export type Scenario = {
  id: string;
  valuation: number
};

export type Outcome = {
  offer_id: string;
  scenario_id: string;
  total_stock_package_value: number;
  annual_stack_package_value: number;
  total_compensation_value: number
  annual_compensation_value: number
}
