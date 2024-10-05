import { DataTable } from '@/components/ui/data-table';
import { useAtom } from 'jotai';
import { jobOffersState } from '../atoms';
import { columns } from '../columns';
import React from 'react';


export const JobOfferTable = () => {
  const [offers, setOffers] = useAtom(jobOffersState);

  // Use this to force the DataTable to fully re-render when offers change
  const tableKey = React.useMemo(() => JSON.stringify(offers), [offers]);

  return (
    <DataTable columns={columns} data={offers} key={tableKey} />
  )
}

