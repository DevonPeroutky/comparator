import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { FundingRound } from "./types";
import { dilutionRoundsState } from "./atoms";
import { validateNumber, mapNumber, formatNumber } from "@/lib/columns/column_utils";
import { BaseEditableCell, BaseEditableCellProps } from "@/lib/columns/base_columns";
import { useUpdateListItemChanges } from "@/lib/columns/hooks";

const FundingRoundEditableCell: React.FC<BaseEditableCellProps<FundingRound, number>> = ({ row, fieldName, formatter, mapValue, validate }) => {
  const updateListItem = useUpdateListItemChanges(dilutionRoundsState);
  return BaseEditableCell({ row, fieldName, formatter, mapValue, validate, updateListItem });
}

export const columns: ColumnDef<FundingRound>[] = [
  {
    accessorKey: "label",
    header: "Funding Round",
  },
  {
    accessorKey: "dilution_amount",
    header: "Dilution amount",
    // cell: ({ row }) => <EditableCell row={row} recoilState={dilutionRoundsState} fieldName="dilution_amount" mapValue={mapNumber} formatter={formatNumber({ style: "percent", maximumFractionDigits: 4, minimumFractionDigits: 2 })} validate={validateNumber} />
    cell: ({ row }) => <FundingRoundEditableCell row={row} fieldName="dilution_amount" mapValue={mapNumber} formatter={formatNumber({ style: "percent", maximumFractionDigits: 4, minimumFractionDigits: 2 })} validate={validateNumber} />
  },

]
