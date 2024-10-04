import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { ReactNode, useState } from "react"
import { useRecoilValue } from "recoil"
import { jobOffersState } from "../../../offers/atoms"
import { MetricSelect } from "../metric-select"
import { Metric } from "../../types"
import { useBuildScenarioListForGraphing } from "../../utils"
import { OfferGraphDescription } from "./graph-description"
import { FeatureDescription, FeatureDescriptionContainer } from "@/components/ui/bento-grid"

type OffersGraphProps = {
  title: string
  description: ReactNode
}
export const OffersGraph: React.FC<OffersGraphProps> = ({ title, description }) => {
  const offers = useRecoilValue(jobOffersState);
  const buildScenarioList = useBuildScenarioListForGraphing()
  const [selectedMetric, setSelectedMetric] = useState(Metric.TotalEquityPackage);

  const chartData = buildScenarioList(selectedMetric)
  const chartConfig = offers.reduce((config, offer, idx) => {
    config[offer.company_name] = {
      label: offer.company_name,
      color: `hsl(var(--chart-${idx + 1}))`,
    };
    return config;
  }, {} as ChartConfig);

  return (
    <div>
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
          <CartesianGrid vertical={true} horizontal={true} />
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
            content={<ChartTooltipContent indicator="line" x="scenario_valuation" />}
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
      <div>
        <blockquote className="italic text-muted-foreground">
          "Money can't buy happiness, but it can make you awfully comfortable while you're being miserable." - Clare Boothe Luce
        </blockquote>
      </div>
    </div >
  )
}


export const OfferGraphTitle = () => {
  const [selectedMetric, setSelectedMetric] = useState(Metric.TotalEquityPackage);

  return (
    <div>
      <MetricSelect selectedMetric={selectedMetric} onMetricChange={setSelectedMetric} />
      <FeatureDescriptionContainer className="mt-4">
        <OfferGraphDescription selectedMetric={selectedMetric} />
      </FeatureDescriptionContainer>
    </div>
  );
};
