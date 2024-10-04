import { TableCell } from "@/components/ui/table";
import { buildSimpleCell, ComparisonRowDef } from "./components/simple-cell";
import { JobOfferScenario } from "./types";
import { deriveAnnualCompensation, deriveAnnualEquityValue, deriveDilutionPercentageOwned, deriveEquityValue, deriveExerciseCost } from "@/lib/calculations";
import { ScenarioSelect } from "./components/scenario-select";

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
    "cell": (offerScenario) => <TableCell key={`projected_valuation_${offerScenario.id}`}><ScenarioSelect jobOffer={offerScenario} /></TableCell>
  },
  {
    "labelProps": {
      label: "Exercise Cost",
      tooltip: "The cost to exercise your options, not including taxes."
    },
    cell: (offerScenario: JobOfferScenario) => <TableCell key={`exercise_cost_${offerScenario.id}`}>{(offerScenario.strike_price && offerScenario.number_of_shares) ? new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", currency: "USD" }).format(deriveExerciseCost(offerScenario.strike_price, offerScenario.number_of_shares)) : "-"}</TableCell>
  },
  {
    "labelProps": {
      label: "Fully Diluted Percentage",
      tooltip: "The estimated percentage of the company given your starting percentage and dilution from the funding rounds from the scenario"
    },
    cell: (offerScenario: JobOfferScenario) => <TableCell key={`fully_diluted_percentage_${offerScenario.id}`}>{new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 4, minimumFractionDigits: 2 }).format(deriveDilutionPercentageOwned(offerScenario.percentage_ownership, offerScenario.dilution))}</TableCell>
  },
  {
    "labelProps": {
      label: "Equity Value",
      tooltip: "The estimated total value of your equity package"
    },
    cell: (offerScenario: JobOfferScenario) => <TableCell key={`equity_value_${offerScenario.id}`}>{new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(deriveEquityValue(offerScenario.percentage_ownership, offerScenario.dilution, offerScenario.valuation))}</TableCell>
  },
  {
    "labelProps": {
      label: "Annual Equity Value",
      tooltip: "The estimated annual value of your equity package"
    },
    cell: (offerScenario: JobOfferScenario) => <TableCell key={`annual_equity_value_${offerScenario.id}`}>{new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(deriveAnnualEquityValue(offerScenario.percentage_ownership, offerScenario.dilution, offerScenario.valuation, offerScenario.vesting_years))}</TableCell>
  }
];

export const footerDefs = [
  {
    "labelProps": {
      label: "Total Annual Compensation",
      tooltip: "Your estimated total annual compensation including salary and equity for this scenario"
    },
    cell: (offerScenario: JobOfferScenario) => <TableCell key={`total_annual_compensation_${offerScenario.id}`}>{new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(deriveAnnualCompensation(offerScenario.percentage_ownership, offerScenario.dilution, offerScenario.valuation, offerScenario.vesting_years, offerScenario.salary))}</TableCell>
  },
];
