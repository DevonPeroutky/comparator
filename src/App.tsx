import { LineChartContainer } from './domains/scenarios/charts';
import { JobOfferTable } from './domains/offers/components/job-offers-table';
import { DilutionTable } from './domains/dilution/components/dilution-schedule';
import { ComparisonTable } from './domains/offers/compare_offer_table';

export default function App() {

  return (
    <div className='w-screen px-[10%]'>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Comparator</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Free (and <a href='https://github.com/DevonPeroutky/comparator' target='_blank'>open-source</a>) way of comparing job offers and equity packages. All the data is stored 100% on client (nothing is sent to a server).
      </p>
      <div className="flex flex-col gap-y-4">
        <div className='w-full grid grid-cols-1 md:grid-cols-[1fr,minmax(0,500px)] gap-4'>
          <JobOfferTable />
          <DilutionTable />
        </div>
        <LineChartContainer title="Offers / Time" description="Look at how your compensation packages increase in value as the companies' valuation increases" />
        <ComparisonTable />
      </div>
    </div>
  );
}
