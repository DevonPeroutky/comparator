import { motion } from "framer-motion";
import { defaultJobOfferState, jobOffersState, persistedJobOffersState, userJobOfferState } from './domains/offers/atoms';
import { AppGrid } from './app-grid';
import { useAtomValue } from 'jotai';
import { ShareButton } from './components/app/share-button';
import { TextHoverEffect } from './components/ui/text-hover-effect';
import { HeroHighlight, Highlight } from './components/ui/hero-highlight';
import BoxReveal from "./components/ui/box-reveal";
import { AnimatedButton, AnimatedButton2 } from "./animation-test";
import { CheckIcon, ChevronRightIcon, Share } from "lucide-react";
import { ClipboardDocumentIcon } from "@heroicons/react/24/solid";
import { AnimatedSubscribeButton } from "./components/ui/animated-subscribe-button";

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
      <div className="card example-2">
        <div className="inner">
          <h3>Example 2</h3>
          <p>This card also has a fake border with a rotating psuedo element.</p>
        </div>
      </div>
      <div className="w-fit rounded-lg flex relative overflow-hidden items-center justify-center animated-border">
        <button className="bg-black text-white rounded-lg m-0.5 relative w-full z-1 p-8">
          Example 2
        </button>
      </div>
      <AnimatedButton
        text="Copy URL to share"
        icon={
          <Share className='h-4 w-4' />
        }
        alternativeText="Copied to clipboard!"
        alternativeIcon={<ClipboardDocumentIcon className='h-4 w-4' />}
      />
      <AnimatedButton2
        text="Copy URL to share"
        variant="link"
        icon={
          <Share className='h-4 w-4' />
        }
        alternativeText="Copied to clipboard!"
        alternativeIcon={<ClipboardDocumentIcon className='h-4 w-4' />}
      />
      <AnimatedButton2
        text="Copy URL to share"
        variant="default"
        icon={
          <Share className='h-4 w-4' />
        }
        alternativeText="Copied to clipboard!"
        alternativeIcon={<ClipboardDocumentIcon className='h-4 w-4' />}
      />
      <AnimatedButton2
        text="Copy URL to share"
        variant="outline"
        icon={
          <Share className='h-4 w-4' />
        }
        alternativeText="Copied to clipboard!"
        alternativeIcon={<ClipboardDocumentIcon className='h-4 w-4' />}
      />
      <AnimatedSubscribeButton
        buttonColor="#000000"
        buttonTextColor="#ffffff"
        subscribeStatus={false}
        initialText={
          <span className="group inline-flex items-center">
            Copy URL for Sharing{" "}
            <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        }
        changeText={
          <span className="group inline-flex items-center">
            <CheckIcon className="mr-2 size-4" />
            Copied{" "}
          </span>
        }
      />
      {/* <div className="flex flex-col items-center"> */}
      {/*   <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Comparator</h1> */}
      {/*   <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400"> */}
      {/*     Free (and <a href='https://github.com/DevonPeroutky/comparator' target='_blank' className='font-medium text-sky-600 dark:text-blue-500 hover:underline'>open-source</a>) way of comparing job offers and equity packages. Your data is only stored in your browser and is 100% private. */}
      {/*   </p> */}
      {/*   <ShareButton /> */}
      {/*   <AppGrid /> */}
      {/* </div > */}
    </div>
  );
}
