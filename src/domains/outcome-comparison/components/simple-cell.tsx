import { ReactNode } from "react";
import { JobOfferScenario } from "../types";
import { TableCell } from "@/components/ui/table";
import { displayNumber } from "@/domains/offers/utils";
import { LabelCellProps } from "./label-cell";

type ComparisonCellProps = {
  jobOfferScenario: JobOfferScenario;
}

export type ComparisonRowDef = {
  "labelProps": LabelCellProps;
  "cell": (offerScenario: JobOfferScenario) => ReactNode;
}

export const buildSimpleCell = (rowKey: string, options?: Intl.NumberFormatOptions): (offerScenario: JobOfferScenario) => ReactNode => {
  return (offerScenario: JobOfferScenario) => <SimpleCell jobOfferScenario={offerScenario} options={options} rowKey={rowKey} key={`${offerScenario.id}-${rowKey}`} />
}


type SimpleNumberComparisonCellProps = {
  jobOfferScenario: JobOfferScenario;
  rowKey: string;
  options?: Intl.NumberFormatOptions;

}
export const SimpleCell: React.FC<SimpleNumberComparisonCellProps> = ({ jobOfferScenario, options, rowKey }) => {
  return (
    <TableCell key={`${jobOfferScenario.id}-${rowKey}`}> {displayNumber(jobOfferScenario[rowKey as keyof JobOfferScenario], '-', options)}</TableCell >
  )
}
