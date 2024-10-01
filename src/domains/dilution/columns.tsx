import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { validateNumber, mapNumber, formatNumber, EditableCell } from "@/lib/base_columns";
import { FundingRound } from "./types";
import { dilutionRoundsState } from "./atoms";

export const columns: ColumnDef<FundingRound>[] = [
  {
    accessorKey: "label",
    header: "Funding Round",
  },
  {
    accessorKey: "dilution_amount",
    header: "Dilution amount",
    cell: ({ row }) => <EditableCell row={row} recoilState={dilutionRoundsState} fieldName="dilution_amount" mapValue={mapNumber} formatter={formatNumber({ style: "percent", maximumFractionDigits: 4, minimumFractionDigits: 2 })} validate={validateNumber} />
  },

]
