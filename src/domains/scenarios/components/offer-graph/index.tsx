import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useAtom, useAtomValue } from "jotai"
import { chartConfigAtom, jobOffersState } from "../../../offers/atoms"
import { MetricSelect } from "../metric-select"
import { useBuildScenarioListForGraphing } from "../../utils"
import { OfferGraphDescription } from "./graph-description"
import { FeatureDescriptionContainer } from "@/components/ui/bento-grid"
import { selectedMetricState } from "../../atoms"
import { FancyBlockquote } from "@/components/app/animated-blockquote/3d-blockquote"

export const OffersGraph = () => {
  const offers = useAtomValue(jobOffersState);
  const [selectedMetric, setSelectedMetric] = useAtom(selectedMetricState);
  const buildScenarioList = useBuildScenarioListForGraphing()

  const chartData = buildScenarioList(selectedMetric)
  const chartConfig = useAtomValue(chartConfigAtom);

  return (
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
          <YAxis
            tickLine={true}
            axisLine={true}
            tickMargin={8}
            tickFormatter={(value) => new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumFractionDigits: 0,
            }).format(value)}
          />
          <XAxis
            dataKey="scenario_valuation"
            scale={"auto"}
            // type={"number"}
            // domain={['dataMin - 100', 'dataMax + 100']}
            tickLine={true}
            axisLine={true}
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
                stroke={`var(--color-${idx + 1})`}
                strokeWidth={2}
                dot={{
                  fill: `var(--color-${idx + 1})`,
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
      <div className="flex flex-col items-center justify-center text-center mt-4">
        <FancyBlockquote author="Clare Booth Luce" containerClassName="" stemHeight={50} className="flex justify-center items-center w-[800px]">
          <blockquote className="italic p-4">
            "Money can't buy happiness, but it can make you awfully comfortable while you're being miserable."
          </blockquote>
        </FancyBlockquote>
      </div>
    </>
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
