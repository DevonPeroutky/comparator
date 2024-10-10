import { motion } from "framer-motion";
import { defaultJobOfferState, jobOffersState, persistedJobOffersState, userJobOfferState } from './domains/offers/atoms';
import { AppGrid } from './app-grid';
import { useAtomValue } from 'jotai';
import { ShareButton } from './components/app/share-button';
import { TextHoverEffect } from './components/ui/text-hover-effect';
import { HeroHighlight, Highlight } from './components/ui/hero-highlight';
import BoxReveal from "./components/ui/box-reveal";
import { AnimatedButton } from "./animation-test";
import { CheckIcon, ChevronRightIcon, Share } from "lucide-react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { AnimatedSubscribeButton } from "./components/ui/animated-subscribe-button";
import { PinContainer } from "./components/ui/3d-pin";
import { ExampleBorderUsage } from "./components/app/animated-border";
import { FancyBlockquote } from "./components/app/animated-blockquote/3d-blockquote";

export default function App() {
  const d = useAtomValue(defaultJobOfferState);
  const u = useAtomValue(userJobOfferState);
  const s = useAtomValue(jobOffersState);
  const p = useAtomValue(persistedJobOffersState);
  const title = "Comparato<";

  return (
    <div className='relative z-20 py-10 lg:py-40 w-screen flex flex-col items-center'>
      {/* <FancyBlockquote author="Steve Jobs" className="" stemHeight={150}> */}
      {/*   <div className="flex justify-center items-center p-4 w-[200px] h-[200px]"> */}
      {/*     <p className="text-lg italic"> */}
      {/*       "The only way to do great work is to love what you do. */}
      {/*       If you haven't found it yet, keep looking. Don't settle." */}
      {/*     </p> */}
      {/*   </div> */}
      {/* </FancyBlockquote> */}
      {/* <PinContainer title="Steve Jobs" > */}
      {/*   <div className="w-[200px] h-[200px]"> */}
      {/*     <p className="text-lg italic"> */}
      {/*       "The only way to do great work is to love what you do. */}
      {/*       If you haven't found it yet, keep looking. Don't settle." */}
      {/*     </p> */}
      {/*   </div> */}
      {/* </PinContainer> */}
      <div className="flex flex-col items-center text-center mx-auto px-10">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white uppercase">{title}</h1>
        <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
          Free (and <a href='https://github.com/DevonPeroutky/comparator' target='_blank' className='font-medium text-sky-600 dark:text-blue-500 hover:underline'>open-source</a>) way of comparing job offers and equity packages. Your data is only stored in your browser and is <Highlight className="font-medium text-stripeBlack">100% private.</Highlight>
        </p>
        <ShareButton />
      </div>
      <AppGrid />
    </div >
  );
}
