import { DataTable } from '@/components/ui/data-table';
import { useAtom } from 'jotai';
import { jobOffersState } from '../atoms';
import { PRIVATE_OFFER_COLUMNS, PUBLIC_OFFER_COLUMNS } from '../columns';
import React from 'react';
import { PrivateJobOffer, PublicJobOffer } from '../types';


export const JobOfferTable = () => {
  const [offers, setOffers] = useAtom(jobOffersState);
  const [activeTab, setActiveTab] = React.useState('startup');

  const privateJobOffers: PrivateJobOffer[] = offers.filter((offer): offer is PrivateJobOffer => 'percentage_ownership' in offer);
  const publicJobOffers: PublicJobOffer[] = offers.filter((offer): offer is PublicJobOffer => 'equity_valuation' in offer && 'stock_price' in offer);
  const rows = activeTab === 'startup' ? privateJobOffers : publicJobOffers

  // Use this to force the DataTable to fully re-render when offers change
  const tableKey = React.useMemo(() => JSON.stringify(rows), [rows]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };


  return (
    <div>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          <li className="me-2">
            <a
              href="#"
              onClick={() => handleTabClick('startup')}
              className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'startup'
                ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                : 'border-transparent'
                }`}
            >
              Startup Offers
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleTabClick('public')}
              className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 ${activeTab === 'public'
                ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                : 'border-transparent'
                }`}
            >
              Public Company Offers
            </a>
          </li>
        </ul>
      </div>
      <DataTable
        columns={activeTab === 'startup' ? PRIVATE_OFFER_COLUMNS : PUBLIC_OFFER_COLUMNS}
        data={rows}
        key={tableKey}
      />
    </div>
  )
}

