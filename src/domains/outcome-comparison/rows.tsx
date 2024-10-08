import { TableCell } from "@/components/ui/table";
import { buildSimpleCell, ComparisonRowDef } from "./components/simple-cell";
import { JobOfferScenario } from "./types";
import { deriveAnnualCompensation, deriveAnnualEquityValue, deriveDilutionPercentageOwned, deriveEquityValue, deriveExerciseCost } from "@/lib/calculations";
import { ScenarioSelect } from "./components/scenario-select";
import NumberTicker from "@/components/ui/number-ticker";

export const rowDefs: ComparisonRowDef[] = [
  {
    "labelProps": {
      label: "Salary",
    },
    "cell": buildSimpleCell("salary", { style: "currency", currency: "USD" })
  },
  {
    "labelProps": {
      label: "Current Valuation",
    },
    "cell": buildSimpleCell("latest_company_valuation", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
  },
  {
    "labelProps": {
      label: "Projected Valuation",
    },
    "cell": (offerScenario) => <TableCell key={`projected_valuation_${offerScenario.scenario_id}`}><ScenarioSelect jobOfferId={offerScenario.offer_id} /></TableCell>
  },
  {
    "labelProps": {
      label: "Exercise Cost",
      tooltip: "The cost to exercise your options, not including taxes."
    },
    cell: (offerScenario: JobOfferScenario) => <TableCell key={`exercise_cost_${offerScenario.scenario_id}`}>{(offerScenario.strike_price && offerScenario.number_of_shares) ? new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", currency: "USD" }).format(deriveExerciseCost(offerScenario.strike_price, offerScenario.number_of_shares)) : "-"}</TableCell>
  },
  {
    "labelProps": {
      label: "Fully Diluted Percentage",
      tooltip: "Your estimated ownership percentage of the company after factoring in the dilution from each round of funding in the scenario"
    },
    cell: (offerScenario: JobOfferScenario) => <TableCell key={`fully_diluted_percentage_${offerScenario.scenario_id}`}>{new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 4, minimumFractionDigits: 2 }).format(deriveDilutionPercentageOwned(offerScenario.percentage_ownership, offerScenario.total_dilution))}</TableCell>
  },
  {
    "labelProps": {
      label: "Equity Value",
      tooltip: "The estimated total value of your equity package"
    },
    cell: (offerScenario: JobOfferScenario) => <TableCell key={`equity_value_${offerScenario.scenario_id}`}>{new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(deriveEquityValue(offerScenario.percentage_ownership, offerScenario.total_dilution, offerScenario.valuation))}</TableCell>
  },
  {
    "labelProps": {
      label: "Annual Equity Value",
      tooltip: "The estimated annual value of your equity package"
    },
    cell: (offerScenario: JobOfferScenario) => <TableCell key={`annual_equity_value_${offerScenario.scenario_id}`}>{new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(deriveAnnualEquityValue(offerScenario.percentage_ownership, offerScenario.total_dilution, offerScenario.valuation, offerScenario.vesting_years))}</TableCell>
  }
];

export const footerDefs = [
  // {
  //   "labelProps": {
  //     label: "Total Annual Compensation",
  //     tooltip: "Your estimated total annual compensation including salary and equity for this scenario"
  //   },
  //   cell: (offerScenario: JobOfferScenario) => <TableCell key={`total_annual_compensation_${offerScenario.id}`}>{new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(deriveAnnualCompensation(offerScenario.percentage_ownership, offerScenario.total_dilution, offerScenario.valuation, offerScenario.vesting_years, offerScenario.salary))}</TableCell>
  // },
  {
    "labelProps": {
      label: "Total Annual Compensation",
      tooltip: "Your estimated total annual compensation including salary and equity for this scenario"
    },
    cell: (offerScenario: JobOfferScenario) => <TableCell key={`total_annual_compensation_${offerScenario.scenario_id}`}>
      <NumberTicker formatOptions={{ useGrouping: true, style: "currency", currency: "USD", maximumFractionDigits: 0 }} value={deriveAnnualCompensation(offerScenario.percentage_ownership, offerScenario.total_dilution, offerScenario.valuation, offerScenario.vesting_years, offerScenario.salary)} />
    </TableCell >
  },
];
