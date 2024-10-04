import { defaultJobOfferState, jobOffersState, userJobOfferState } from './domains/offers/atoms';
import { defaultScenarioMapState, scenarioMapState, useAddScenarios, userScenarioMapState } from './domains/scenarios/atoms';
import { useEffect } from 'react';
import { generateScenarioForJobOffer } from './domains/scenarios/utils';
import { AppGrid } from './app-grid';
import { useAtom, useAtomValue } from 'jotai';

export default function App() {
  const d = useAtomValue(defaultJobOfferState);
  const u = useAtomValue(userJobOfferState);
  const s = useAtomValue(jobOffersState);
  console.log("============")
  console.log(d)
  console.log(u)
  console.log(s)
  // const offers = useAtomValue(jobOffersState)
  // const addScenarios = useAddScenarios();
  //
  // // TODO: Remove this
  // useEffect(() => {
  //   offers.forEach(offer => {
  //     const scenarios = generateScenarioForJobOffer(offer);
  //     addScenarios(offer.company_name, scenarios);
  //   })
  // }, []);
  //


  return (
    <div className='relative z-20 py-10 lg:py-40 mx-auto w-screen'>
      <div className="px-8">
        <h1 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Comparator
        </h1>
        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Free (and <a href='https://github.com/DevonPeroutky/comparator' target='_blank'>open-source</a>) way of comparing job offers and equity packages. Your data is stored in your browser and is 100% private.
        </p>
      </div>
      <AppGrid />
    </div>
  );
}
