import { Metric } from '../../types';
import { useAtom } from 'jotai';
import { selectedMetricState } from '../../atoms';

type OfferGraphProps = {
  selectedMetric: Metric;
};
export const OfferGraphDescription = () => {
  const [selectedMetric, setSelectedMetric] = useAtom(selectedMetricState);

  switch (selectedMetric) {
    case Metric.TotalEquityPackage:
      return (
        <>
          {/* <p className='mr-2'> */}
          {/*   How the total equity package for each offer increases w.r.t to company valuation. */}
          {/* </p> */}
          <code className="inline-block bg-gray-100 rounded px-2 py-1 text-xs font-mono">
            Total Equity Package = Percentage of Company Ownership * Company Valuation - (Number of Shares * Strike Price)
          </code>
        </>
      );
    case Metric.AnnualCompensation:
      return (
        <>
          {/* <p className='mr-2'> */}
          {/*   How the total annual compensation for each offer increases w.r.t to company valuation */}
          {/* </p> */}
          <code className="inline-block bg-gray-100 rounded px-2 py-1 text-xs font-mono">
            Annual Compensation = Base Salary + Bonus + (Equity Value / Vesting Period)
          </code>
        </>
      );
    case Metric.AnnualEquityPackage:
      return (
        <>
          {/* <p className='mr-2'> */}
          {/*   How the annual equity package for each offer increases w.r.t to company valuation */}
          {/* </p> */}
          <code className="inline-block bg-gray-100 rounded px-2 py-1 text-xs font-mono">
            Annual Equity Package = Equity Value / Vesting Period
          </code>
        </>
      );
  }
};
