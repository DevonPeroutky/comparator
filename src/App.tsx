import React, { useState, useEffect } from 'react';
import { DataTable } from "./components/ui/data-table";
import { columns, JobOffer } from "./domains/offers/columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { useRecoilState, useRecoilValue } from 'recoil';
import { jobOffersState } from './domains/offers/atoms';
import { LineChartContainer } from './domains/scenarios/charts';
import { scenarioState } from './domains/scenarios/atoms';

export default function App() {
  const offers = useRecoilValue(jobOffersState);
  const scenarios = useRecoilValue(scenarioState);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Offers</CardTitle>
          <CardDescription>Add your job offers here</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={offers} />
        </CardContent>
      </Card>
      <LineChartContainer title="Offers / Time" description="Look at how your compensation packages increase in value as the companies' valuation increases" />
      {/* <div> */}
      {/*   <Card> */}
      {/*     <CardHeader> */}
      {/*       <CardTitle>Outcomes</CardTitle> */}
      {/*       <CardDescription>Add various scenarios here</CardDescription> */}
      {/*     </CardHeader> */}
      {/*     <CardContent> */}
      {/*       <DataTable columns={scenario_columns} data={outcomes} /> */}
      {/*     </CardContent> */}
      {/*   </Card> */}
      {/* </div> */}
    </div>
  );
}
