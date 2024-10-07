import { motion } from "framer-motion";
import { defaultJobOfferState, jobOffersState, persistedJobOffersState, userJobOfferState } from './domains/offers/atoms';
import { AppGrid } from './app-grid';
import { useAtomValue } from 'jotai';
import { ShareButton } from './components/app/share-button';
import { TextHoverEffect } from './components/ui/text-hover-effect';
import { HeroHighlight, Highlight } from './components/ui/hero-highlight';
import BoxReveal from "./components/ui/box-reveal";

export default function App() {
  const d = useAtomValue(defaultJobOfferState);
  const u = useAtomValue(userJobOfferState);
  const s = useAtomValue(jobOffersState);
  const p = useAtomValue(persistedJobOffersState);
  console.log("============")
  console.log(d)
  console.log(u)
  console.log(s)
  console.log(p)

  return (
    <div className='relative z-20 py-10 lg:py-40 mx-auto w-screen'>
      <div className="flex flex-col items-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Comparator</h1>
        <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
          Free (and <a href='https://github.com/DevonPeroutky/comparator' target='_blank' className='font-medium text-sky-600 dark:text-blue-500 hover:underline'>open-source</a>) way of comparing job offers and equity packages. Your data is only stored in your browser and is 100% private.
        </p>
        <ShareButton />
        <AppGrid />
      </div >
    </div>
  );
}
