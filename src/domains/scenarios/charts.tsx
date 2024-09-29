"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ReactNode } from "react"
import { useRecoilValue } from "recoil"
import { jobOffersState } from "../offers/atoms"
import { equityJourniesState, scenarioState } from "./atoms"
import { EquityJourney, Outcome, CompanyValuation } from "./columns"
import { JobOffer } from "../offers/columns"

export const description = "A line chart with a label"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

type LineChartContainerProps = {
  title: string
  description: ReactNode
}
export const LineChartContainer = ({ title, description }: LineChartContainerProps) => {
  const offers = useRecoilValue(jobOffersState);
  const scenarios: CompanyValuation[] = useRecoilValue(scenarioState);
  const equityJournies: EquityJourney[] = useRecoilValue(equityJourniesState);

  // TODO: Implement this for all possible metrics
  const calculateOutcome = (scenario: CompanyValuation, offer: JobOffer): number => {
    const percentage_ownership = offer.percentage_ownership || offer.number_of_shares / offer.total_number_of_outstanding_shares;
    const total_stock_package_value = percentage_ownership * scenario.valuation;
    const total_compensation_value = (offer.salary * offer.vesting_years) + total_stock_package_value;

    return total_stock_package_value
  }

  const buildOutcome = (scenario: CompanyValuation, offers: JobOffer[]) => {
    const outcome: { [key: string]: any } = { scenario_valuation: scenario.valuation };

    offers.filter(o => o.latest_company_valuation <= scenario.valuation).forEach(offer => {
      outcome[offer.company_name] = calculateOutcome(scenario, offer)
    });

    return outcome
  }

  const chartData = scenarios.map(scenario => buildOutcome(scenario, offers))
  const chartConfig = offers.reduce((config, offer, idx) => {
    config[offer.company_name] = {
      label: offer.company_name,
      color: `hsl(var(--chart-${idx + 1}))`,
    };
    return config;
  }, {} as ChartConfig);


  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-8">
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 48,
              right: 48,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="scenario_valuation"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              }).format(value)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {
              offers.map((offer, idx) => (
                <Line
                  dataKey={offer.company_name}
                  type="natural"
                  stroke={`hsl(var(--chart-${idx + 1}))`}
                  strokeWidth={2}
                  dot={{
                    fill: `hsl(var(--chart-${idx + 1}))`,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  {/* <LabelList */}
                  {/*   position="top" */}
                  {/*   offset={12} */}
                  {/*   formatter={(value) => new Intl.NumberFormat("en-US", { */}
                  {/*     style: "currency", */}
                  {/*     currency: "USD", */}
                  {/*   }).format(value)} */}
                  {/*   className="fill-foreground" */}
                  {/* /> */}
                </Line>
              ))
            }
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card >
  )
}

