import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useState } from "react"
import { useAtom, useAtomValue } from "jotai"
import { chartConfigAtom, jobOffersState } from "../../../offers/atoms"
import { MetricSelect } from "../metric-select"
import { Metric } from "../../types"
import { useBuildScenarioListForGraphing } from "../../utils"
import { OfferGraphDescription } from "./graph-description"
import { FeatureDescriptionContainer } from "@/components/ui/bento-grid"
import BoxReveal from "@/components/ui/box-reveal"
import { selectedMetricState } from "../../atoms"

export const OffersGraph = () => {
  const offers = useAtomValue(jobOffersState);
  const [selectedMetric, setSelectedMetric] = useAtom(selectedMetricState);
  const buildScenarioList = useBuildScenarioListForGraphing()

  console.log("Selected Metric: ", selectedMetric);
  const chartData = buildScenarioList(selectedMetric)
  const chartConfig = useAtomValue(chartConfigAtom);
  console.log(chartData);
  // const chartConfig = offers.reduce((config, offer, idx) => {
  //   config[offer.company_name] = {
  //     label: offer.company_name,
  //     color: `hsl(var(--chart-${idx + 1}))`,
  //   };
  //   return config;
  // }, {} as ChartConfig);

  return (
    <BoxReveal duration={0.5} boxColorClass="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500">
      <>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 40,
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
                  key={offer.id}
                  dataKey={offer.id}
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
                </Line>
              ))
            }
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
        <div className="flex flex-col items-center justify-center mt-10 gap-y-2 text-center text-muted-foreground italic">
          <blockquote className="">
            "Money can't buy happiness, but it can make you awfully comfortable while you're being miserable."
          </blockquote>
          <div>- Clare Boothe Luce</div>
        </div>
      </>
    </BoxReveal >
  )
}


export const OfferGraphTitle = () => {
  return (
    <div className="flex flex-col items-center md:items-start">
      <MetricSelect />
      <FeatureDescriptionContainer className="mt-4">
        <OfferGraphDescription />
      </FeatureDescriptionContainer>
    </div>
  );
};
