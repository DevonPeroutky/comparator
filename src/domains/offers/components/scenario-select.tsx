import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Scenario } from "@/domains/scenarios/types";

export interface ScenarioSelectProps {
  scenarios: Scenario[];
  selectedScenario: Scenario;
  onScenarioChange: (scenario: Scenario) => void;
}

export const ScenarioSelect: React.FC<ScenarioSelectProps> = ({ selectedScenario, onScenarioChange, scenarios }) => {
  return (
    <Select value={selectedScenario.id} onValueChange={(value) => onScenarioChange(value as Scenario)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Scenario" className="font-bold text-2xl" />
      </SelectTrigger>
      <SelectContent className="cursor-pointer">
        {scenarios.map(scenario => (
          <SelectItem key={scenario.id} value={scenario.id} className="cursor-pointer">{scenario.valuation}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

