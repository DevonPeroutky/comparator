import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { useRecoilState, useRecoilValue } from "recoil";
import { jobOffersState } from "./atoms";
import { dilutionRoundsState } from "../dilution/atoms";
import { Cell } from "recharts";
import { JobOffer } from "./columns";
import { ReactNode } from "react";
import { displayNumber } from "./utils";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

const buildRow = (offers: JobOffer[], row_key: string, row_label: string, options: Intl.NumberFormatOptions): ReactNode => {
  const tableCells = offers.map(offer => <TableCell key={offer.id}>{displayNumber(offer[row_key as keyof JobOffer], '-', options)}</TableCell>)

  // Prepend the Row Label
  tableCells.unshift(<TableCell key="blank" className="w-[100px] captialize">{row_label}</TableCell>)


  return tableCells
}

export const ComparisonTable = () => {
  const jobOffers = useRecoilValue(jobOffersState);
  const dilution = useRecoilValue(dilutionRoundsState);
  const rows = [
    { row_key: "latest_company_valuation", label: "Valuation", options: { style: "currency", currency: "USD", maximumFractionDigits: 0 } },
    { row_key: "salary", label: "Salary", options: { style: "currency", currency: "USD" } },
    { row_key: "strike_price", label: "Strike Price", options: { style: "currency", currency: "USD" } },
    { row_key: "total_number_of_outstanding_shares", label: "# of Outstanding Shares", options: { useGrouping: true, maximumFractionDigits: 0 } },
  ];
  const tableHeaders = jobOffers.map(offer => <TableHead key={offer.id}>{offer.company_name}</TableHead>)

  // Prepend the tableHeaders with a blank Cell
  tableHeaders.unshift(<TableHead key="blank" className="w-[100px]"></TableHead>)

  console.log("jobOffers", jobOffers)


  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            <span>Compare Outcomes</span>
          </div>
        </CardTitle>
        <CardDescription>See how the equity compares round by round</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              {tableHeaders}
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              rows.map(({ row_key, label, options }, index) =>
                <TableRow key={index}>
                  {buildRow(jobOffers, row_key, label, options)}
                </TableRow>
              )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )

}

