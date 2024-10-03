import { ReactNode } from "react";
import { JobOfferScenario } from "../types";
import { TableCell } from "@/components/ui/table";
import { displayNumber } from "@/domains/offers/utils";

type ComparisonCellProps = {
  jobOfferScenario: JobOfferScenario;
}

export type ComparisonRowDef = {
  "label": ReactNode;
  "cell": (offerScenario: JobOfferScenario) => ReactNode;
}

export const buildSimpleCell = (rowKey: string, options?: Intl.NumberFormatOptions): (offerScenario: JobOfferScenario) => ReactNode => {
  return (offerScenario: JobOfferScenario) => <SimpleCell jobOfferScenario={offerScenario} options={options} rowKey={rowKey} />
}


type SimpleNumberComparisonCellProps = {
  jobOfferScenario: JobOfferScenario;
  rowKey: string;
  options?: Intl.NumberFormatOptions;

}
export const SimpleCell: React.FC<SimpleNumberComparisonCellProps> = ({ jobOfferScenario, options, rowKey }) => {
  return (
    <TableCell key={jobOfferScenario.id}>{displayNumber(jobOfferScenario[rowKey as keyof JobOfferScenario], '-', options)}</TableCell>
  )
}
