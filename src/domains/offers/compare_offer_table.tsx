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

const buildRow = (offers: JobOffer[], row_label: string, options: Intl.NumberFormatOptions, derive_value?: (offer: JobOffer) => number, row_key?: string): ReactNode => {
  if (!derive_value && !row_key) {
    throw new Error("Either derive_value or row_key must be provided");
  }

  if (derive_value && row_key) {
    throw new Error("Only one of derive_value or row_key can be provided");
  }

  const tableCells = (row_key) ? offers.map(offer => <TableCell key={offer.id}>{displayNumber(offer[row_key as keyof JobOffer], '-', options)}</TableCell>) : offers.map(offer => <TableCell key={offer.id}>{derive_value(offer)}</TableCell>)


  // Prepend the Row Label
  tableCells.unshift(<TableCell key="blank" className="w-fit captialize">{row_label}</TableCell>)

  return tableCells
}

const dericeExerciseCost = (offer: JobOffer): string => {
  if (!offer.strike_price || !offer.number_of_shares) return '-';
  return new Intl.NumberFormat("en-US", { useGrouping: true, style: "currency", "currency": "USD" }).format(offer.number_of_shares * offer.strike_price)
}

export const ComparisonTable = () => {
  const jobOffers = useRecoilValue(jobOffersState);
  const dilution = useRecoilValue(dilutionRoundsState);
  const rows = [
    { row_key: "salary", label: "Salary", options: { style: "currency", currency: "USD" } },
    { row_key: "latest_company_valuation", label: "Current Valuation", options: { style: "currency", currency: "USD", maximumFractionDigits: 0 } },
    { row_key: "strike_price", label: "Strike Price", options: { style: "currency", currency: "USD" } },
    { derive_value: dericeExerciseCost, label: "Exercise Cost (w/out Tax)" },
    { derive_value: (offer: JobOffer) => "-", label: "Fully Diluted Percentage" },
    { derive_value: (offer: JobOffer) => "-", label: "Equity Package Value" },
  ];
  const tableHeaders = jobOffers.map(offer => <TableHead key={offer.id}>{offer.company_name}</TableHead>)

  // Prepend the tableHeaders with a blank Cell
  tableHeaders.unshift(<TableHead key="blank" className="w-[250px]"></TableHead>)

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
              rows.map(({ row_key, label, options, derive_value }, index) =>
                <TableRow key={index}>
                  {buildRow(jobOffers, label, options, derive_value, row_key)}
                </TableRow>
              )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total Annual Compensation</TableCell>
              <TableCell className="text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )

}

