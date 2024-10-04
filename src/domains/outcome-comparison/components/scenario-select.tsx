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
import { formatLargeCurrency } from "@/lib/format_utils";
import { useAtom, useAtomValue } from "jotai";

export interface ScenarioSelectProps {
  jobOffer: JobOffer;
}

export const ScenarioSelect: React.FC<ScenarioSelectProps> = ({ jobOffer }) => {
  const scenarios: Scenario[] = useAtomValue(scenarioMapState)[jobOffer.company_name]
  const [selectedScenarioIds, setSelectedScenarioIds] = useAtom(selectedScenarioIdState);

  const selectedScenarioId = selectedScenarioIds[jobOffer.company_name];
  const selectedScenario = scenarios.find(scenario => scenario.id === selectedScenarioId) || scenarios[0];

  return (
    <Select value={selectedScenario.id} onValueChange={(id: string) => {
      setSelectedScenarioIds(selectedScenarioIdMap => ({
        ...selectedScenarioIdMap,
        [jobOffer.company_name]: id
      }))
    }}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Scenario" className="font-bold text-2xl" />
      </SelectTrigger>
      <SelectContent className="cursor-pointer">
        {scenarios.map(scenario => (
          <SelectItem key={scenario.id} value={scenario.id} className="cursor-pointer">{formatLargeCurrency(scenario.valuation)}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
