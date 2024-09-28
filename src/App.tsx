import React, { useState, useEffect } from 'react';
import { DataTable } from "./components/ui/data-table";
import { columns, JobOffer } from "./domains/offers/columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Scenario } from './domains/scenarios/columns';

async function getJobOffers(): Promise<JobOffer[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      company_name: "Kindo",
      salary: 225000,
      number_of_shares: 91000,
      latest_company_valuation: 55000000,
      vesting_years: 5,
      strike_price: 0.5,
      total_number_of_outstanding_shares: 100000000,
      percentage_ownership: 0.09,
    },
    {
      id: "728ed52fgg",
      company_name: "Valon",
      salary: 180000,
      number_of_shares: 3267,
      latest_company_valuation: 584000000,
      vesting_years: 4,
      strike_price: 0.5,
      total_number_of_outstanding_shares: 100000000,
      percentage_ownership: 0.09,
    },
  ]
}

async function getScenarios(): Promise<Scenario[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52fa",
      valuation: 320000000
    },
    {
      id: "728ed52fb",
      valuation: 500000000
    },
    {
      id: "728ed52fc",
      valuation: 1000000000
    },
    {
      id: "728ed52fd",
      valuation: 2000000000
    },
    {
      id: "728ed52fe",
      valuation: 3000000000
    },
    {
      id: "728ed52ff",
      valuation: 5000000000
    },
    {
      id: "728ed52fg",
      valuation: 10000000000
    },
  ]
}

export default function App() {
  const [offers, setOffers] = useState<JobOffer[]>([]);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);

  const outcomes = scenarios.flatMap(scenario => {
    return offers.map(offer => {
      return {
        offer_id: offer.id,
        scenario_id: scenario.id,
        total_stock_package_value: offer.number_of_shares * scenario.valuation,
        annual_stack_package_value: offer.number_of_shares * scenario.valuation / offer.vesting_years,
        total_compensation_value: offer.salary + offer.number_of_shares * scenario.valuation,
        annual_compensation_value: offer.salary + offer.number_of_shares * scenario.valuation / offer.vesting_years,
      }
    })
  })

  useEffect(() => {
    const fetchScenarios = async () => {
      const result = await getScenarios();
      setScenarios(result);
    };
    const fetchOffers = async () => {
      const result = await getJobOffers();
      setOffers(result);
    };
    fetchScenarios();
    fetchOffers();
  }, []);
  console.log(offers)

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
      <div>
        {outcomes.map(outcome => {
          return (
            <Card key={outcome.offer_id + outcome.scenario_id}>
              <CardHeader>
                <CardTitle>Outcome</CardTitle>
                <CardDescription>Outcome of offer {outcome.offer_id} in scenario {outcome.scenario_id}</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <div>Total Stock Package Value: {outcome.total_stock_package_value}</div>
                  <div>Annual Stock Package Value: {outcome.annual_stack_package_value}</div>
                  <div>Total Compensation Value: {outcome.total_compensation_value}</div>
                  <div>Annual Compensation Value: {outcome.annual_compensation_value}</div>
                </div>
              </CardContent>
            </Card>
          )
        }
        )}
      </div>
    </div>
  );
}
