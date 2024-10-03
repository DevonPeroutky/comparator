import { useState } from 'react';
import { Scenario } from "../../types";
import { Row } from "@tanstack/react-table";
import { useUpdateScenario } from "../../atoms";
import { FlattenedScenarios } from './types';

type EquityJourneyPlanCellProps = {
  row: Row<FlattenedScenarios>
  companyName: string
  fieldName: string
  mapValue: (value: string) => number
  validate: (value: number) => boolean
  formatter: (value: number) => string
}
export const EquityJourneyPlanCell: React.FC<EquityJourneyPlanCellProps> = ({ row, companyName, fieldName, formatter, mapValue, validate }) => {
  const scenario: Scenario = row["original"][companyName]
  const [value, setValue] = useState<string>(formatter(scenario[fieldName as keyof Scenario]))
  const updateScenario = useUpdateScenario()

  const commitOrRollbackChange = (proposedValue: string) => {
    const updateValue = mapValue(proposedValue)
    if (validate(updateValue)) {
      const newScenario = { ...scenario, [fieldName]: updateValue }
      updateScenario(companyName, newScenario)
    } else {
      console.log("Invalid Value: ", proposedValue, " resetting to ", scenario[fieldName as keyof Scenario])
      setValue(formatter(scenario[fieldName as keyof Scenario]))
    }
  }

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      // onBlur={() => commitOrRollbackChange(value)}
      onBlur={() => commitOrRollbackChange(value)}
    />
  )
}


