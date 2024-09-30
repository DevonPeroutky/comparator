import { EditableNumberCell } from "@/lib/base_columns";
import { ColumnDef, Row } from "@tanstack/react-table";
import { JobOffer } from "./types";
import { useRecoilState, useRecoilValue } from "recoil";
import { jobOffersState } from "./atoms";

const useUpdateJobOffer = () => {
  const [jobOffers, setJobOffers] = useRecoilState(jobOffersState);

  return (row: Row<JobOffer>, fieldName: string, propsedValue: string, setValue: (value: string) => void, options: Intl.NumberFormatOptions) => {
    const updatedValue = parseFloat(propsedValue.replace(/[^0-9.-]+/g, ""));
    if (!isNaN(updatedValue)) {
      const updatedJobOffers = jobOffers.map(offer =>
        offer.id === row.original.id ? { ...offer, [fieldName]: updatedValue } : offer
      );
      setValue(new Intl.NumberFormat("en-US", options).format(updatedValue));
      setJobOffers(updatedJobOffers);
    } else {
      console.log("Invalid value, resetting");
      const offer = jobOffers.find(offer => offer.id === row.original.id);
      setValue(new Intl.NumberFormat("en-US", options).format(offer?.[fieldName as keyof JobOffer] as number));
    }
  };
};

export const columns: ColumnDef<JobOffer>[] = [
  {
    accessorKey: "company_name",
    header: "Company Name",
  },
  {
    accessorKey: "salary",
    header: "Salary",
    cell: ({ row }) => <EditableNumberCell fieldName="salary" row={row} handleBlur={useUpdateJobOffer()}
      options={{
        style: "currency",
        currency: "USD",
      }} />
  },
  {
    accessorKey: "number_of_shares",
    header: "Number of Shares",
    cell: ({ row }) => <EditableNumberCell fieldName="number_of_shares" row={row} handleBlur={useUpdateJobOffer()}
      options={{
        useGrouping: true,
        maximumFractionDigits: 0,
      }} />
  },
  {
    accessorKey: "latest_company_valuation",
    header: "Latest Company Valuation",
    cell: ({ row }) => <EditableNumberCell fieldName="latest_company_valuation" row={row} handleBlur={useUpdateJobOffer()}
      options={{
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }} />
  },
  {
    accessorKey: "strike_price",
    header: "Strike Price",
    cell: ({ row }) => <EditableNumberCell fieldName="strike_price" row={row} handleBlur={useUpdateJobOffer()}
      options={{
        style: "currency",
        currency: "USD",
      }} />
  },
  {
    accessorKey: "vesting_years",
    header: "Vesting Years",
    cell: ({ row }) => <EditableNumberCell fieldName="vesting_years" row={row} handleBlur={useUpdateJobOffer()}
      options={{
        useGrouping: true,
      }} />
  },
  {
    accessorKey: "percentage_ownership",
    header: "Percentage Ownership",
    cell: ({ row }) => <EditableNumberCell fieldName="percentage_ownership" row={row} handleBlur={useUpdateJobOffer()}
      options={{
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
      }} />
  },
  {
    accessorKey: "total_number_of_outstanding_shares",
    header: "Total Outstanding Shares",
    cell: ({ row }) => <EditableNumberCell fieldName="total_number_of_outstanding_shares" row={row} handleBlur={useUpdateJobOffer()}
      options={{
        useGrouping: true,
      }} />
  },
];

