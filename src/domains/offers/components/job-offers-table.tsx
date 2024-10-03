import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { useRecoilState, useRecoilValue } from 'recoil';
import { jobOffersState } from '../atoms';
import { columns } from '../columns';
import { AddOfferModal } from './add-offer-modal/add-offer-modal';
import React from 'react';


export const JobOfferTable = () => {
  const [offers, setOffers] = useRecoilState(jobOffersState);

  // Use this to force the DataTable to fully re-render when offers change
  const tableKey = React.useMemo(() => JSON.stringify(offers), [offers]);

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            <span>Offers</span>
            <AddOfferModal />
          </div>
        </CardTitle>
        <CardDescription>Add your job offers here</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={offers} key={tableKey} />
      </CardContent>
    </Card>
  )
}
