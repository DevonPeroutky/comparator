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
          <code className="inline-block bg-gray-100 rounded px-2 py-1 text-xs font-mono">
            Total Equity Package = Percentage of Company Ownership * Company Valuation - (Number of Shares * Strike Price)
          </code>
        </>
      );
    case Metric.AnnualCompensation:
      return (
        <>
          <code className="inline-block bg-gray-100 rounded px-2 py-1 text-xs font-mono">
            Annual Compensation = Base Salary + (Equity Value / Vesting Period)
          </code>
        </>
      );
    case Metric.AnnualEquityPackage:
      return (
        <>
          <code className="inline-block bg-gray-100 rounded px-2 py-1 text-xs font-mono">
            Annual Equity Package = Equity Value / Vesting Period
          </code>
        </>
      );
  }
};
