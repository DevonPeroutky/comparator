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
import SparklesText from "./components/ui/sparkles-text";

export default function App() {
  const d = useAtomValue(defaultJobOfferState);
  const u = useAtomValue(userJobOfferState);
  const s = useAtomValue(jobOffersState);
  const p = useAtomValue(persistedJobOffersState);
  const title = "Comparator";

  return (
    <div className='relative z-20 py-10 lg:py-40 w-screen flex flex-col items-center'>
      <div className="flex flex-col items-center text-center mx-auto px-10">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-white capitalize">{title}</h1>
        <p className="flex items-center gap-x-1 mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
          Free (and <a href='https://github.com/DevonPeroutky/comparator' target='_blank' className='font-medium text-sky-600 dark:text-blue-500 hover:underline'>open-source</a>) way of comparing job offers and equity packages. Your data is <SparklesText text="only stored in your browser" sparklesCount={5} duration={5} /> and is <SparklesText className="" text="100% private." sparklesCount={5} duration={5} />
        </p>
        <ShareButton />
      </div>
      <AppGrid />
    </div >
  );
}
