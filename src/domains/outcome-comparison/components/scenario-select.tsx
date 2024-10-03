import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { JobOffer } from "@/domains/offers/types";
import { scenarioMapState, selectedScenarioIdState } from "@/domains/scenarios/atoms";
import { Scenario } from "@/domains/scenarios/types";
import { formatNumber } from "@/lib/columns/column_utils";
import { useRecoilState, useRecoilValue } from "recoil";

export interface ScenarioSelectProps {
  jobOffer: JobOffer;
}

export const ScenarioSelect: React.FC<ScenarioSelectProps> = ({ jobOffer }) => {
  const scenarios: Scenario[] = useRecoilValue(scenarioMapState)[jobOffer.company_name]
  const [selectedScenarioId, setSelectedScenarioId] = useRecoilState(selectedScenarioIdState);
  const selectedScenario = scenarios.find(scenario => scenario.id === selectedScenarioId) || scenarios[0];

  return (
    <Select value={selectedScenario.id} onValueChange={(id: string) => {
      setSelectedScenarioId(id);
    }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Scenario" className="font-bold text-2xl" />
      </SelectTrigger>
      <SelectContent className="cursor-pointer">
        {scenarios.map(scenario => (
          <SelectItem key={scenario.id} value={scenario.id} className="cursor-pointer">{formatNumber({
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0
          })(scenario.valuation)}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
