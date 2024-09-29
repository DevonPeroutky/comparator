import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Metric } from "../types"


export interface MetricSelectProps {
  selectedMetric: Metric;
  onMetricChange: (metric: Metric) => void;
}

export const MetricSelect: React.FC<MetricSelectProps> = ({ selectedMetric, onMetricChange }) => {
  return (
    <Select value={selectedMetric} onValueChange={(value) => onMetricChange(value as Metric)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Metric" />
      </SelectTrigger>
      <SelectContent className="cursor-pointer">
        <SelectItem value="total_compensation" className="cursor-pointer">Total Compensation</SelectItem>
        <SelectItem value="total_equity_package" className="cursor-pointer">Total Equity Package</SelectItem>
        <SelectItem value="annual_compensation" className="cursor-pointer">Annual Compensation</SelectItem>
        <SelectItem value="annual_equity_package" className="cursor-pointer">Annual Equity Package</SelectItem>
      </SelectContent>
    </Select>
  )
}
