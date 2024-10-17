import { DataTable } from '@/components/ui/data-table';
import { useAtom } from 'jotai';
import { jobOffersState } from '../atoms';
import { PRIVATE_OFFER_COLUMNS, PUBLIC_OFFER_COLUMNS } from '../columns';
import React from 'react';
import { PrivateJobOffer, PublicJobOffer } from '../types';
import { ChartBarSquareIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import { AddOfferModal } from './add-offer-modal/add-offer-modal';
import { ClearOffersTableButton } from './clear-table-button';


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
    <>
      <div className="flex flex-col-reverse gap-y-2 md:flex-row justify-between">
        <ul className="flex flex-wrap -mb-px">
          <li className="">
            <h2
              onClick={() => handleTabClick('startup')}
              className={`md:text-4xl font-bold flex items-center gap-x-2 cursor-pointer p-4 border-b-2 rounded-t-lg ${activeTab === 'startup'
                ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                : 'hover:text-blue-400 border-transparent hover:border-blue-300 dark:text-gray-400 dark:hover:text-blue-300'
                }`}
            >
              <RocketLaunchIcon className="h-6 w-6 mt-1" />
              Startup Offers
            </h2>
          </li>
          <li>
            <h2
              onClick={() => handleTabClick('public')}
              className={`font-bold md:text-4xl cursor-pointer flex items-center gap-x-2 p-4 border-b-2 rounded-t-lg ${activeTab === 'public'
                ? 'text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500'
                : 'hover:text-blue-400 border-transparent hover:border-blue-300 dark:text-gray-400 dark:hover:text-blue-300'
                }`}
            >
              <ChartBarSquareIcon className="h-6 w-6 mt-1" />
              Public Offers
            </h2>
          </li>
        </ul>
        <div className="flex gap-y-2 items-center gap-x-4">
          <AddOfferModal />
          <ClearOffersTableButton />
        </div>
      </div>
      <DataTable
        columns={activeTab === 'startup' ? PRIVATE_OFFER_COLUMNS : PUBLIC_OFFER_COLUMNS}
        data={rows}
        key={tableKey}
      />
    </>
  )
}

