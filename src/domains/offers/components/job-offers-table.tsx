import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { useRecoilValue } from 'recoil';
import { jobOffersState } from '../atoms';
import { columns } from '../columns';
import { AddOfferModal } from './add-offer-modal';


export const JobOfferTable = () => {
  const offers = useRecoilValue(jobOffersState);
  return (
    <Card>
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
        <DataTable columns={columns} data={offers} />
      </CardContent>
    </Card>
  )
}
