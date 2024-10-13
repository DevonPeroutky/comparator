import { defaultJobOfferState, jobOffersState, persistedJobOffersState, userJobOfferState } from './domains/offers/atoms';
import { AppGrid } from './app-grid';
import { useAtomValue } from 'jotai';
import { ShareButton } from './components/app/share-button';
import SparklesText from "./components/ui/sparkles-text";
import { scenarioMapState } from './domains/scenarios/atoms';

export default function App() {
  const d = useAtomValue(defaultJobOfferState);
  const u = useAtomValue(userJobOfferState);
  const s = useAtomValue(jobOffersState);
  const p = useAtomValue(persistedJobOffersState);
  const sc = useAtomValue(scenarioMapState);
  const title = "Comparator";
  console.log(s)
  console.log("ScenarioMap: ", sc)

  return (
    <div className='relative z-20 py-10 lg:py-40 w-screen flex flex-col items-center'>
      <div className="flex flex-col items-center text-center mx-auto px-10">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white capitalize">{title}</h1>
        <div className="flex flex-wrap items-center justify-center mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
          <p>Free (and</p>
          <a href='https://github.com/DevonPeroutky/comparator' target='_blank' className='mx-1 font-medium text-sky-600 dark:text-blue-500 hover:underline'>open-source</a>
          <p>) way of comparing job offers and equity packages. Your data is</p>
          <SparklesText text="only stored in your browser" sparklesCount={5} duration={5} className="mx-1" />
          <p>and is</p>
          <SparklesText text="100% private." sparklesCount={5} duration={5} className="mx-1" />
        </div>
        <ShareButton />
      </div>
      <AppGrid />
    </div >
  );
}
