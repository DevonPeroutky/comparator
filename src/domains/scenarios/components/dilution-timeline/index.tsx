import { InputProps } from '@/components/ui/input';
import { useRecoilState } from 'recoil';
import { Scenario } from '../../types';
import { scenarioMapState } from '../../atoms';
import { Primitive } from 'zod';
import { useState } from 'react';
import { formatLargeCurrency, formatPercentage } from '@/lib/format_utils';
import { cn } from '@/lib/utils';

type EditableTextProps = {
  formatter: (c: Primitive) => string;
} & InputProps;

const EditableText: React.FC<EditableTextProps> = ({ id, onChange, placeholder, value, formatter, className }) => {
  const [formattedValue, setFormattedValue] = useState<string>(formatter(value as string))
  return (
    <input
      id={id}
      type="text"
      value={formattedValue}
      style={{
        width: `${(formattedValue || "").toString().length > 0 ? formattedValue.toString().length : placeholder.length - 1 || 8}ch`, // Adaptive width based on content
      }}
      onChange={(e) => setFormattedValue(e.target.value)}
      placeholder={placeholder}
      className={cn("bg-transparent focus:outline-none placeholder-gray-400 py-0 ", className)}
    />
  );
};

type DilutionTimelineProps = {
  company_name: string;
  scenarios: Scenario[]
}
export const DilutionTimeline: React.FC<DilutionTimelineProps> = ({ company_name, scenarios }) => {
  console.log('scenarios', scenarios);

  return (
    <div className="flex items-start justify-start bg-white flex-col gap-y-4">
      <h4 className='capitalized text-xl text-muted-foreground'>{company_name}</h4>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {scenarios.map((round, index) => (
          <li className="mb-10 ms-4 text-muted-foreground text-gray-500 dark:text-gray-400">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700" />
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{(index == 0) ? "Current Valuation" : "Funding Round"}</time>
            <div className="flex text-lg font-semibold dark:text-white text-muted-foreground">
              <EditableText id="valuation" value={round.valuation} placeholder="Valuation" formatter={formatLargeCurrency} onChange={(c) => console.log(c)} className='underline underline-offset-3 decoration-green-600 dark:decoration-green-600' />
            </div>
            <div className="text-base font-normal ">
              <span>Dilution: </span>
              <EditableText id="dilution" value={round.dilution} className='underline underline-offset-3 decoration-blue-400 dark:decoration-blue-600' placeholder="Dilution" formatter={formatPercentage} onChange={(c) => console.log(c)} />
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export const EquityJourney = () => {
  const [scenarioMap, setScenarioMap] = useRecoilState(scenarioMapState);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start justify-center bg-white md:mr-auto">
      {Object.entries(scenarioMap).map(([company_name, scenarios]) => (
        <div key={company_name} className="w-full max-w-sm flex items-center justify-start">
          <DilutionTimeline company_name={company_name} scenarios={scenarios} />
        </div>
      ))}
    </div>
  );
}
