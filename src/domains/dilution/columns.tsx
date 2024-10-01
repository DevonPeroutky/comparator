import { Column, ColumnDef, Row } from "@tanstack/react-table";
import { EditableNumberCell } from "@/lib/base_columns";
import { FundingRound } from "./types";
import { useRecoilState } from "recoil";
import { dilutionRoundsState } from "./atoms";

const useUpdateDilutionRounds = () => {
  const [dilutionRounds, setDilutionRounds] = useRecoilState(dilutionRoundsState);

  return (row: Row<FundingRound>, fieldName: string, propsedValue: string, setValue: (value: string) => void, options: Intl.NumberFormatOptions) => {
    const updatedValue = parseFloat(propsedValue.replace(/[^0-9.-]+/g, ""));
    if (!isNaN(updatedValue)) {
      const updatedDilutionRounds = dilutionRounds.map(offer =>
        offer.id === row.original.id ? { ...offer, [fieldName]: updatedValue } : offer
      );
      setValue(new Intl.NumberFormat("en-US", options).format(updatedValue));
      setDilutionRounds(updatedDilutionRounds);
    } else {
      console.log("Invalid value, resetting");
      const funding_round = dilutionRounds.find(r => r.id === row.original.id);
      console.log(funding_round);
      setValue(new Intl.NumberFormat("en-US", options).format(funding_round?.[fieldName as keyof FundingRound] as number));
    }
  };
};

export const columns: ColumnDef<FundingRound>[] = [
  {
    accessorKey: "label",
    header: "Funding Round",
  },
  {
    accessorKey: "dilution_amount",
    header: "Dilution Amount",
    cell: ({ row }) => <EditableNumberCell fieldName="dilution_amount" row={row} options={{
      style: "percent",
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }}
      handleBlur={useUpdateDilutionRounds()}
    />
  },

]
