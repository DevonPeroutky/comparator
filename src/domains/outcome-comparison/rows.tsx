import { TableCell } from "@/components/ui/table";
import { buildSimpleCell, ComparisonRowDef } from "./components/simple-cell";
import { JobOfferScenario } from "./types";
import { deriveAnnualCompensation, deriveAnnualEquityValue, deriveDilutionPercentageOwned, deriveEquityValue, deriveExerciseCost } from "@/lib/calculations";
import { ScenarioSelect } from "./components/scenario-select";

export const rowDefs: ComparisonRowDef[] = [
  {
    "label": "Salary",
    "cell": buildSimpleCell("salary", { style: "currency", currency: "USD" })
  },
  {
    "label": "Current Valuation",
    "cell": buildSimpleCell("latest_company_valuation", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
  },
  {
    "label": "Projected Valuation",
    "cell": (offerScenario) => <TableCell key={offerScenario.id}><ScenarioSelect jobOffer={offerScenario} /></TableCell>
  },
  {
    "label": "Exercise Cost (w/out Tax)",
    cell: (offerScenario: JobOfferScenario) => <TableCell key={offerScenario.id}>{(offerScenario.strike_price && offerScenario.number_of_shares) ? new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", currency: "USD" }).format(deriveExerciseCost(offerScenario.strike_price, offerScenario.number_of_shares)) : "-"}</TableCell>
  },
  {
    "label": "Fully Diluted Percentage",
    cell: (offerScenario: JobOfferScenario) => <TableCell key={offerScenario.id}>{new Intl.NumberFormat("en-US", { style: "percent", maximumFractionDigits: 4, minimumFractionDigits: 2 }).format(deriveDilutionPercentageOwned(offerScenario.percentage_ownership, offerScenario.dilution))}</TableCell>
  },
  {
    "label": "Equity Value",
    cell: (offerScenario: JobOfferScenario) => <TableCell key={offerScenario.id}>{new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(deriveEquityValue(offerScenario.percentage_ownership, offerScenario.dilution, offerScenario.valuation))}</TableCell>
  },
  {
    "label": "Annual Equity Value",
    cell: (offerScenario: JobOfferScenario) => <TableCell key={offerScenario.id}>{new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(deriveAnnualEquityValue(offerScenario.percentage_ownership, offerScenario.dilution, offerScenario.valuation, offerScenario.vesting_years))}</TableCell>
  }
];

export const footerDefs = [
  {
    label: "Total Annual Compensation",
    cell: (offerScenario: JobOfferScenario) => <TableCell key={offerScenario.id}>{new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(deriveAnnualCompensation(offerScenario.percentage_ownership, offerScenario.dilution, offerScenario.valuation, offerScenario.vesting_years, offerScenario.salary))}</TableCell>
  },
];
