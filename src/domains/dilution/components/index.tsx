import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { useRecoilState } from 'recoil';
import { columns } from '../columns';
import { DEFAULT_DILUTION_ROUNDS, dilutionRoundsState } from '../atoms';
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export const DilutionTable = () => {
  const [dilutionRounds, setDilutionRounds] = useRecoilState(dilutionRoundsState);

  // Use this to force the DataTable to fully re-render when dilutionRounds change
  const tableKey = React.useMemo(() => JSON.stringify(dilutionRounds), [dilutionRounds]);

  return (
    <DataTable columns={columns} data={dilutionRounds} key={tableKey} />
  )
}

export const DilutionDescription = () => {
  const [dilutionRounds, setDilutionRounds] = useRecoilState(dilutionRoundsState);
  return (
    <div className='flex items-center justify-between'>
      <Button onClick={() => setDilutionRounds(DEFAULT_DILUTION_ROUNDS)} variant='outline'><RefreshCw className="mr-2 h-4 w-4" /> Reset</Button>
    </div>
  )
}

export const DilutionTitle = () => {
  const [dilutionRounds, setDilutionRounds] = useRecoilState(dilutionRoundsState);
  return (
    <div className='flex items-center justify-between'>
      <span>Dilution Schedule</span>
      <Button onClick={() => setDilutionRounds(DEFAULT_DILUTION_ROUNDS)} variant='outline'><RefreshCw className="mr-2 h-4 w-4" /> Reset</Button>
    </div>
  )
}
