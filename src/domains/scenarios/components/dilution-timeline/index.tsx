import { InputProps } from '@/components/ui/input';
import { useAtom, useAtomValue } from 'jotai';
import { Scenario } from '../../types';
import { scenarioMapState, useUpdateScenario } from '../../atoms';
import { Primitive } from 'zod';
import { useState } from 'react';
import { formatLargeCurrency, formatPercentage } from '@/lib/format_utils';
import { cn } from '@/lib/utils';
import { mapNumber, mapPercentage, validateNumber } from '@/lib/columns/column_utils';
import { chartConfigAtom } from '@/domains/offers/atoms';

type EditableTextProps<C extends Primitive> = {
  scenario: Scenario;
  companyName: string
  fieldName: keyof Scenario;
  formatter: (val: C) => string;
  mapValue: (val: string) => C;
} & InputProps;

const EditableText: React.FC<EditableTextProps<Primitive>> = ({ companyName, fieldName, scenario, onChange, placeholder, value, formatter, mapValue, className }) => {
  const updateScenario = useUpdateScenario();
  const pHolder = placeholder || fieldName.toString();

  const commitOrRollbackChange = (proposedValue: string) => {
    const updateValued = mapValue(proposedValue)
    console.log(`Updating ${fieldName} to ${updateValued}`)
    if (validateNumber(updateValued)) {
      const newScenario = { ...scenario, [fieldName]: updateValued }
      console.log("Updating Scenario: ", newScenario)
      updateScenario(companyName, newScenario)

      setFormattedValue(formatter(updateValued))
    } else {
      console.log("Invalid Value: ", proposedValue, " resetting to ", scenario[fieldName as keyof Scenario])
      setFormattedValue(formatter(scenario[fieldName as keyof Scenario]))
    }
  }

  const [formattedValue, setFormattedValue] = useState<string>(formatter(value as string))

  return (
    <input
      id={fieldName}
      type="text"
      value={formattedValue}
      style={{
        width: `${(formattedValue || "").toString().length > 0 ? formattedValue.toString().length : pHolder.length - 1 || 8}ch`, // Adaptive width based on content
      }}
      onBlur={(e) => commitOrRollbackChange(e.target.value)}
      onChange={(e) => setFormattedValue(e.target.value)}
      placeholder={placeholder}
      className={cn("capitalize bg-transparent focus:outline-none placeholder-gray-400 py-0 ", className)}
    />
  );
};

type DilutionTimelineProps = {
  companyName: string;
  scenarios: Scenario[]
}
export const DilutionTimeline: React.FC<DilutionTimelineProps> = ({ companyName, scenarios }) => {
  const chartConfig = useAtomValue(chartConfigAtom);
  console.log("Chart Config: ", chartConfig)
  console.log("SPecific: ", chartConfig[companyName].color)

  return (
    <div className="flex items-start justify-start bg-white flex-col gap-y-4">
      <h4 className='capitalized text-xl text-muted-foreground'>{companyName}</h4>
      <ol className="relative border-s border-blue-200 dark:border-gray-700">
        {scenarios.map((scenario, index) => (
          <li key={scenario.id} className="mb-10 ms-4 text-muted-foreground text-gray-500 dark:text-gray-400">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{(index == 0) ? "Current Valuation" : "Funding Round"}</time>
            <div className="flex text-lg font-semibold dark:text-white text-muted-foreground">
              <EditableText
                value={scenario.valuation}
                formatter={formatLargeCurrency}
                mapValue={mapNumber}
                scenario={scenario}
                companyName={companyName}
                fieldName="valuation"
                onChange={(c) => console.log(c)}
                className='underline underline-offset-3 decoration-green-600 dark:decoration-green-600'
              />
            </div>
            <div className="text-base font-normal ">
              <span>Dilution: </span>
              <EditableText
                value={scenario.round_dilution}
                placeholder='0.00%'
                formatter={formatPercentage}
                mapValue={mapPercentage}
                scenario={scenario}
                companyName={companyName}
                fieldName="round_dilution"
                onChange={(c) => console.log(c)}
                className='underline underline-offset-3 decoration-blue-600 dark:decoration-blue-600'
              />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export const EquityJourney = () => {
  const [scenarioMap, _] = useAtom(scenarioMapState);

  return (
    <div className="flex flex-wrap gap-8 justify-center md:justify-start">
      {Object.entries(scenarioMap).map(([companyName, scenarios]) => (
        <div key={companyName} className="flex-grow-0 flex-shrink-0 items-center justify-center md:justify-start bg-yellow-200">
          <DilutionTimeline companyName={companyName} scenarios={scenarios} />
        </div>
      ))}
    </div>
  );
}
