import { InputProps } from '@/components/ui/input';
import { useAtom, useAtomValue } from 'jotai';
import { Scenario } from '../../types';
import { scenarioMapState, useUpdateScenario } from '../../atoms';
import { Primitive } from 'zod';
import { useState } from 'react';
import { formatLargeCurrency, formatPercentage } from '@/lib/format_utils';
import { cn } from '@/lib/utils';
import { mapNumber, mapPercentage, validateNumber } from '@/lib/columns/column_utils';
import { chartConfigAtom, useCompanyName } from '@/domains/offers/atoms';
import { ComputedAttribute } from '@react-three/drei';

type EditableTextProps<C extends Primitive> = {
  scenario: Scenario;
  companyId: string
  fieldName: keyof Scenario;
  formatter: (val: C) => string;
  mapValue: (val: string) => C;
} & InputProps;

const EditableText: React.FC<EditableTextProps<Primitive>> = ({ companyId, fieldName, scenario, onChange, placeholder, value, formatter, mapValue, className }) => {
  const updateScenario = useUpdateScenario();
  const pHolder = placeholder || fieldName.toString();

  const commitOrRollbackChange = (proposedValue: string) => {
    const updateValued = mapValue(proposedValue)
    console.log(`Updating ${fieldName} to ${updateValued}`)
    if (validateNumber(updateValued)) {
      const newScenario = { ...scenario, [fieldName]: updateValued }
      console.log("Updating Scenario: ", newScenario)
      updateScenario(companyId, newScenario)

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
      // style={{
      //   width: `${(formattedValue || "").toString().length > 0 ? formattedValue.toString().length : pHolder.length - 1 || 8}ch`, // Adaptive width based on content
      // }}
      onBlur={(e) => commitOrRollbackChange(e.target.value)}
      onChange={(e) => setFormattedValue(e.target.value)}
      placeholder={placeholder}
      className={cn("capitalize bg-transparent focus:outline-none placeholder-gray-400 py-0 ", className)}
    />
  );
};

type DilutionTimelineProps = {
  companyId: string;
  scenarios: Scenario[]
}
export const DilutionTimeline: React.FC<DilutionTimelineProps> = ({ companyId, scenarios }) => {
  const chartConfig = useAtomValue(chartConfigAtom);
  const color = chartConfig[companyId].color
  const companyName = useCompanyName()(companyId);


  return (
    <div className="flex items-start justify-start bg-white flex-col gap-y-4 max-w-[225px]">
      <h4 className='capitalized text-xl text-muted-foreground' style={{ color: color }}>{companyName}</h4>
      <ol className={`relative border-l border-solid  border-[${color}] dark:border-gray-700`} style={{ borderLeftColor: color }}>
        {scenarios.map((scenario, index) => (
          <li key={scenario.id} className="mb-10 ms-4 text-muted-foreground text-gray-500 dark:text-gray-400">
            <div className={`absolute w-3 h-3 bg-[${color}] rounded-full mt-1.5 -start-1.5 dark:border-gray-900 dark:bg-gray-700`} style={{ backgroundColor: color }} />
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{(index == 0) ? "Current Valuation" : "Funding Round"}</time>
            <div className="flex text-lg font-semibold dark:text-white text-muted-foreground">
              <EditableText
                value={scenario.valuation}
                formatter={formatLargeCurrency}
                mapValue={mapNumber}
                scenario={scenario}
                companyId={companyId}
                fieldName="valuation"
                onChange={(c) => console.log(c)}
              />
            </div>
            <div className="text-base font-normal flex gap-x-1">
              <span>Dilution: </span>
              <EditableText
                value={scenario.round_dilution}
                placeholder='0.00%'
                formatter={formatPercentage}
                mapValue={mapPercentage}
                scenario={scenario}
                companyId={companyId}
                fieldName="round_dilution"
                onChange={(c) => console.log(c)}
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
      {Object.entries(scenarioMap).map(([companyId, scenarios]) => (
        <div key={companyId} className="flex-grow-0 flex-shrink-0 items-center justify-center md:justify-start bg-yellow-200">
          <DilutionTimeline companyId={companyId} scenarios={scenarios} />
        </div>
      ))}
    </div>
  );
}

export const ScenarioBuilderDescription = () => {
  return (
    <span className="text-center text-lg font-normal text-gray-500 dark:text-gray-400 leading-relaxed">
      The dilution has been estimated from data published by <a href='https://www.saastr.com/carta-the-actual-real-dilution-from-series-a-b-c-and-d-rounds/' target='_blank' className='text-sky-600 hover:underline hover:cursor-pointer'>Carta</a> and other sources. Update the <mark className='px-1 bg-green-600 rounded py-1 text-white font-medium'>valuations</mark> and <mark className="px-1 text-white bg-blue-400 rounded dark:bg-blue-600 py-1 font-medium" >dilution</mark> to compare outcomes in the table below.
    </span>
  )
}
