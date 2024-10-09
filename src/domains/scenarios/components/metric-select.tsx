import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Metric } from "../types"
import { useAtom } from "jotai";
import { selectedMetricState } from "../atoms";

export const MetricSelect: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useAtom(selectedMetricState);

  return (
    <Select value={selectedMetric} onValueChange={(value) => setSelectedMetric(value as Metric)}>
      <SelectTrigger className="w-fit text-2xl gap-x-2 text-stripeNavy dark:text-white">
        <SelectValue placeholder="Select Metric" className="text-4xl font-bold dark:text-white" />
      </SelectTrigger>
      <SelectContent className="cursor-pointer">
        {/* <SelectItem value="total_compensation" className="cursor-pointer">Total Compensation</SelectItem> */}
        <SelectItem value="total_equity_package" className="cursor-pointer">Total Equity Package</SelectItem>
        <SelectItem value="annual_compensation" className="cursor-pointer">Annual Compensation</SelectItem>
        <SelectItem value="annual_equity_package" className="cursor-pointer">Annual Equity Package</SelectItem>
      </SelectContent>
    </Select>
  )
}
