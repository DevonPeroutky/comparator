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
import { ReactNode, useState } from "react"
import { useRecoilValue } from "recoil"
import { jobOffersState } from "../offers/atoms"
import { scenarioState } from "./atoms"
import { CompanyValuation } from "./columns"
import { MetricSelect } from "./components/metric-select"
import { Metric } from "./types"
import { buildOutcomeList } from "./utils"

type LineChartContainerProps = {
  title: string
  description: ReactNode
}
export const LineChartContainer: React.FC<LineChartContainerProps> = ({ title, description }) => {
  const offers = useRecoilValue(jobOffersState);
  const scenarios: CompanyValuation[] = useRecoilValue(scenarioState);
  const [selectedMetric, setSelectedMetric] = useState(Metric.TotalCompensation);

  const chartData = scenarios.map(scenario => buildOutcomeList(scenario, offers, selectedMetric))
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
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>{title}</span>
            <MetricSelect selectedMetric={selectedMetric} onMetricChange={setSelectedMetric} />
          </div>
        </CardTitle>
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
                  key={offer.company_name}
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

