import { LineChartContainer } from './domains/scenarios/charts';
import { JobOfferTable } from './domains/offers/components/job-offers-table';
import { DilutionTable } from './domains/dilution/components/dilution-schedule';
import { ComparisonTable } from './domains/offers/compare_offer_table';
import { EquityJourneyCard } from './domains/scenarios/components/equity-journey-card';
import { useRecoilState, useRecoilValue } from 'recoil';
import { jobOffersState } from './domains/offers/atoms';
import { scenarioMapState, scenarioState, useAddScenarios } from './domains/scenarios/atoms';
import { useEffect } from 'react';
import { generateScenarios } from './domains/scenarios/utils';
import { Scenario } from './domains/scenarios/types';

export default function App() {
  const offers = useRecoilValue(jobOffersState)
  const scenarios = useRecoilValue(scenarioState)
  const scenarioMap = useRecoilValue(scenarioMapState)
  const addScenarios = useAddScenarios();

  useEffect(() => {
    console.log('GENERATING SCENARIOS', scenarios)
    offers.forEach(offer => {
      const scenarios = generateScenarios(offer);
      addScenarios(offer.company_name, scenarios);
    })
  }, []);

  console.log('scenarios', scenarios)
  console.log('scenarioMap: ', scenarioMap)

  return (
    <div className='w-screen px-[10%]'>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Comparator</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Free (and <a href='https://github.com/DevonPeroutky/comparator' target='_blank'>open-source</a>) way of comparing job offers and equity packages. All the data is stored 100% on client (nothing is sent to a server).
      </p>
      <div className="max-w-screen flex flex-col gap-y-4">
        <JobOfferTable />
        <div className='w-full grid grid-cols-1 md:grid-cols-[1fr,minmax(0,500px)] gap-4'>
          <LineChartContainer title="Offers / Time" description="Look at how your compensation packages increase in value as the companies' valuation increases" />
          <DilutionTable />
        </div>
        {offers.length > 0 && scenarios.length > 0 &&
          <div className='max-w-screen w-full overflow-x-auto'>
            <div className='grid grid-cols-1 md:grid-cols-[repeat(4,minmax(250px,1fr))] gap-4'>
              {Object.entries(scenarioMap).map(([company_name, scenarios]) => (
                <EquityJourneyCard key={company_name} company_name={company_name} scenarios={scenarios} />
              ))}
              {/* {offers.map(offer => <EquityJourneyCard jobOffer={offer} scenarios={scenarios} />)} */}
            </div>
          </div>
        }
        <ComparisonTable />
      </div>
    </div>
  );
}
