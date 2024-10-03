import { TableCell } from "@/components/ui/table";
import { buildSimpleCell, ComparisonRowDef } from "./components/simple-cell";
import { deriveAnnualCompensation, deriveAnnualEquityValue, deriveDilutionPercentageOwned, deriveEquityValue, deriveExerciseCost } from "./utils";
import { JobOfferScenario } from "./types";

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
    "cell": buildSimpleCell("valuation", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
  },
  {
    "label": "Exercise Cost (w/out Tax)",
    cell: (offerScenario: JobOfferScenario) => <TableCell key={offerScenario.id}>{deriveExerciseCost(offerScenario)}</TableCell>
  },
  {
    "label": "Fully Diluted Percentage",
    cell: (offerScenario: JobOfferScenario) => <TableCell key={offerScenario.id}>{deriveDilutionPercentageOwned(offerScenario)}</TableCell>
  },
  {
    "label": "Equity Value",
    cell: (offerScenario: JobOfferScenario) => <TableCell key={offerScenario.id}>{deriveEquityValue(offerScenario)}</TableCell>
  },
  {
    "label": "Annual Equity Value",
    cell: (offerScenario: JobOfferScenario) => <TableCell key={offerScenario.id}>{deriveAnnualEquityValue(offerScenario)}</TableCell>
  }
];

export const footerDefs = [
  {
    label: "Total Annual Compensation",
    cell: (offerScenario: JobOfferScenario) => <TableCell key={offerScenario.id}>{deriveAnnualCompensation(offerScenario)}</TableCell>
  },
];
