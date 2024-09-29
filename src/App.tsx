import { useRecoilValue } from 'recoil';
import { jobOffersState } from './domains/offers/atoms';
import { LineChartContainer } from './domains/scenarios/charts';
import { JobOfferTable } from './domains/offers/components/job-offers-table';

export default function App() {
  const offers = useRecoilValue(jobOffersState);
  console.log("Offers", offers);

  return (
    <div>
      <JobOfferTable />
      <LineChartContainer title="Offers / Time" description="Look at how your compensation packages increase in value as the companies' valuation increases" />
    </div>
  );
}
