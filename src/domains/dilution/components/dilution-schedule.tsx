import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { useRecoilState } from 'recoil';
import { columns } from '../columns';
import { DEFAULT_DILUTION_ROUNDS, dilutionRoundsState } from '../atoms';
import { Button } from '@/components/ui/button';
import { RefreshCw } from "lucide-react"
import React, { useEffect } from 'react';

export const DilutionTable = () => {
  const [dilutionRounds, setDilutionRounds] = useRecoilState(dilutionRoundsState);

  // Use this to force the DataTable to fully re-render when dilutionRounds change
  const tableKey = React.useMemo(() => JSON.stringify(dilutionRounds), [dilutionRounds]);

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            <span>Dilution Schedule</span>
            <Button onClick={() => setDilutionRounds(DEFAULT_DILUTION_ROUNDS)} variant='outline'><RefreshCw className="mr-2 h-4 w-4" /> Reset</Button>
          </div>
        </CardTitle>
        <CardDescription>This has been aggregate from data published by <a href='https://www.saastr.com/carta-the-actual-real-dilution-from-series-a-b-c-and-d-rounds/' target='_blank' className='text-sky-400 hover:underline hover:cursor-pointer'>Carta</a> and other sources. But feel free to update these</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={dilutionRounds} key={tableKey} />
      </CardContent>
    </Card>
  )
}
