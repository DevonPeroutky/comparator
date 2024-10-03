
import React from 'react';
import { Metric } from '../../types';

type OfferGraphProps = {
  selectedMetric: Metric;
};
export const OfferGraphDescription: React.FC<OfferGraphProps> = ({ selectedMetric }) => {

  switch (selectedMetric) {
    case Metric.TotalEquityPackage:
      return (
        <div className='flex items-center'>
          <p className='mr-2'>
            How the total equity package for each offer increases w.r.t to company valuation.
          </p>
          <code className="inline-block bg-gray-100 rounded px-2 py-1 text-xs font-mono">
            Total Equity Package = Percentage of Company Ownership * Company Valuation - (Number of Shares * Strike Price)
          </code>
        </div>
      );
    case Metric.AnnualCompensation:
      return (
        <div className='flex items-center'>
          <p className='mr-2'>
            How the total annual compensation for each offer increases w.r.t to company valuation
          </p>
          <code className="inline-block bg-gray-100 rounded px-2 py-1 text-xs font-mono">
            Annual Compensation = Base Salary + Bonus + (Equity Value / Vesting Period)
          </code>
        </div>
      );
    case Metric.AnnualEquityPackage:
      return (
        <div className='flex items-center'>
          <p className='mr-2'>
            How the annual equity package for each offer increases w.r.t to company valuation
          </p>
          <code className="inline-block bg-gray-100 rounded px-2 py-1 text-xs font-mono">
            Annual Equity Package = Equity Value / Vesting Period
          </code>
        </div>
      );
  }
};
