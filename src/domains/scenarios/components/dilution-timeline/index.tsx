import { useAtom, useAtomValue } from 'jotai';
import { Scenario } from '../../types';
import { scenarioMapState } from '../../atoms';
import { displayPercentage, mapPercentage } from '@/lib/columns/column_utils';
import { chartConfigAtom, useCompanyName } from '@/domains/offers/atoms';
import { EditableTimelineText } from './input';

type TimelineProps = {
  companyId: string;
  scenario: Scenario
  label: string;
  index: number;
}

export const PublicTimelineItem: React.FC<TimelineProps> = ({ companyId, scenario, index, label }) => {
  const chartConfig = useAtomValue(chartConfigAtom);
  const color = chartConfig[companyId].color

  return (
    <li key={scenario.id} className="mb-10 ms-4 text-muted-foreground text-start text-gray-500 dark:text-gray-400">
      <div className={`absolute w-3 h-3 bg-[${color}] rounded-full mt-1.5 -start-1.5 dark:border-gray-900 dark:bg-gray-700`} style={{ backgroundColor: color }} />
      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{(index == 0) ? `Current ${label}` : label}</time>
      <EditableTimelineText
        numericformatProps={{
          value: scenario.valuation,
          className: "flex text-lg font-semibold dark:text-white text-muted-foreground",
          placeholder: '$25,000,000',
          prefix: '$',
          thousandSeparator: true,
        }}
        scenario={scenario}
        companyId={companyId}
        fieldName="valuation"
      />
    </li>
  )
}

export const PrivateTimelineItem: React.FC<TimelineProps> = ({ companyId, scenario, index, label }) => {
  const chartConfig = useAtomValue(chartConfigAtom);
  const color = chartConfig[companyId].color

  return (
    <li key={scenario.id} className="mb-10 ms-4 text-muted-foreground text-start text-gray-500 dark:text-gray-400">
      <div className={`absolute w-3 h-3 bg-[${color}] rounded-full mt-1.5 -start-1.5 dark:border-gray-900 dark:bg-gray-700`} style={{ backgroundColor: color }} />
      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{(index == 0) ? `Current ${label}` : `Valuation`}</time>
      <EditableTimelineText
        numericformatProps={{
          value: scenario.valuation,
          className: "flex text-lg font-semibold dark:text-white text-muted-foreground",
          placeholder: '$25,000,000',
          prefix: '$',
          thousandSeparator: true,
        }}
        scenario={scenario}
        companyId={companyId}
        fieldName="valuation"
      />
      {(index != 0) ?
        <>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Dilution</time>
          <EditableTimelineText
            numericformatProps={{
              value: scenario.round_dilution,
              className: "flex text-lg font-semibold dark:text-white text-muted-foreground",
              placeholder: '0.00%',
              suffix: '%',
              thousandSeparator: true,
              decimalScale: 1,
            }}
            mapValue={mapPercentage}
            displayValue={displayPercentage}
            scenario={scenario}
            companyId={companyId}
            fieldName="round_dilution"
          />
        </> : null
      }
    </li>
  )
}

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
          (scenario.round_dilution !== undefined) ? <PrivateTimelineItem companyId={companyId} scenario={scenario} index={index} label="Valuation" /> : <PublicTimelineItem companyId={companyId} scenario={scenario} index={index} label="Market Cap" />
        ))}
      </ol>
    </div >
  )
}

export const EquityJourney = () => {
  const [scenarioMap, _] = useAtom(scenarioMapState);

  return (
    <div className="flex flex-wrap gap-8 justify-center md:justify-start">
      {Object.entries(scenarioMap).map(([companyId, scenarios]) => (
        <div key={companyId} className="flex-grow-0 flex-shrink-0 items-center justify-center md:justify-start">
          <DilutionTimeline companyId={companyId} scenarios={scenarios} />
        </div>
      ))}
    </div>
  );
}

export const ScenarioBuilderDescription = () => {
  return (
    <p className="text-center md:text-start text-lg font-normal text-gray-500 dark:text-gray-400 leading-relaxed">
      The dilution has been estimated from data published by <a href='https://www.saastr.com/carta-the-actual-real-dilution-from-series-a-b-c-and-d-rounds/' target='_blank' rel="noopener noreferrer" className='text-sky-600 hover:underline hover:cursor-pointer'>Carta</a> and other sources. Update the <span className='px-1 bg-green-600 rounded py-1 text-white font-medium'>valuations</span> and <span className="px-1 text-white bg-blue-400 rounded dark:bg-blue-600 py-1 font-medium">dilution</span> to compare outcomes in the table below.
    </p>
  )
}
