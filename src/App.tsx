import { defaultJobOfferState, jobOffersState, persistedJobOffersState, userJobOfferState } from './domains/offers/atoms';
import { AppGrid } from './app-grid';
import { useAtom, useAtomValue } from 'jotai';
import { ShareButton } from './components/app/share-button';
import { TextHoverEffect } from './components/ui/text-hover-effect';

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
      <div className="flex flex-col items-center px-8">
        <h1 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Comparator
        </h1>
        <div className='h-[72px]'>
          <TextHoverEffect text="ACET" />
        </div>
        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Free (and <a href='https://github.com/DevonPeroutky/comparator' target='_blank'>open-source</a>) way of comparing job offers and equity packages. Your data is only stored in your browser and is 100% private.
        </p>
        <ShareButton />
      </div>
      <AppGrid />
    </div>
  );
}
