import { OffersGraph } from './domains/scenarios/components/offer-graph';
import { JobOfferTable, JobOfferTableCard } from './domains/offers/components/job-offers-table';
import { AggegrateEquityJourneyCard } from './domains/scenarios/components/equity-journey-card';
import { useRecoilSnapshot, useRecoilValue } from 'recoil';
import { jobOffersState } from './domains/offers/atoms';
import { scenarioMapState, useAddScenarios } from './domains/scenarios/atoms';
import { useEffect } from 'react';
import { generateScenarios } from './domains/scenarios/utils';
import { TextHoverEffect } from './components/ui/text-hover-effect';
import { AppGrid } from './app-grid';
import { DilutionTable } from './domains/dilution/components';
import { ComparisonTableCard } from './domains/outcome-comparison/compare-offer-table';

export default function App() {
  const offers = useRecoilValue(jobOffersState)
  const scenarioMap = useRecoilValue(scenarioMapState)
  const addScenarios = useAddScenarios();

  // TODO: Remove this
  useEffect(() => {
    offers.forEach(offer => {
      const scenarios = generateScenarios(offer);

      addScenarios(offer.company_name, scenarios);
    })
  }, []);



  return (
    <div className='relative z-20 py-10 lg:py-40 mx-auto'>
      <div className="px-8">
        <h1 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Comparator
        </h1>

        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Free (and <a href='https://github.com/DevonPeroutky/comparator' target='_blank'>open-source</a>) way of comparing job offers and equity packages. All the data is stored 100% on client (nothing is sent to a server).
        </p>
      </div>
      <AppGrid />
    </div>
  );
}

const OldApp = () => {
  <>
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Comparator</h1>
    <div className='h-[40rem] w-[300px]'>
      <TextHoverEffect text="Comparator" />
    </div>
    <p className="leading-7 [&:not(:first-child)]:mt-6">
      Free (and <a href='https://github.com/DevonPeroutky/comparator' target='_blank'>open-source</a>) way of comparing job offers and equity packages. All the data is stored 100% on client (nothing is sent to a server).
    </p>
    <div className="max-w-screen flex flex-col gap-y-4">
      <JobOfferTableCard />
      <div className='w-full grid grid-cols-1 md:grid-cols-[1fr,minmax(0,500px)] gap-4'>
        <OffersGraph title="Offers / Time" description="Look at how your compensation packages increase in value as the companies' valuation increases" />
        <DilutionTable />
      </div>
      {offers.length > 0 && Object.keys(scenarioMap).length > 0 &&
        <div className='max-w-screen w-full overflow-x-auto'>
          <AggegrateEquityJourneyCard />
          {/* <div className='grid grid-cols-1 md:grid-cols-[repeat(4,minmax(250px,1fr))] gap-4'> */}
          {/*   {Object.entries(scenarioMap).map(([company_name, scenarios]) => ( */}
          {/*     <EquityJourneyCard key={company_name} company_name={company_name} scenarios={scenarios} /> */}
          {/*   ))} */}
          {/* </div> */}
        </div>
      }
      <ComparisonTableCard />
    </div>
  </>
}
