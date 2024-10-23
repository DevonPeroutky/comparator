import { ShareButton } from './components/app/share-button';
import SparklesText from "./components/ui/sparkles-text";
import Lottie from 'react-lottie-player';
import animationData from './assets/animations/compare-light.json';
import { useState } from 'react';
import { cn } from './lib/utils';
import { AppGrid } from './components/app/app-grid';

export default function App() {
  const [animationCompleted, setAnimationCompleted] = useState(false);

  return (
    <div className='relative z-20 pb-10 lg:pb-10 w-screen flex flex-col items-center'>
      <Lottie animationData={animationData} play loop={false} className="w-[250px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px] mb-4" onComplete={() => setAnimationCompleted(true)} />
      <div className={cn("flex flex-col items-center text-center mx-auto transition-opacity duration-1000", animationCompleted ? "opacity-100" : "opacity-0")}>
        <span className="px-4 md:px-0 mb-4 text-lg font-normal">
          Free (and <a href='https://github.com/DevonPeroutky/comparator' target='_blank' className='mx-1 font-medium hover:underline'>open-source</a>) way of comparing job offers and equity packages. Your data is
          <SparklesText text="only stored in your browser" sparklesCount={5} duration={5} className="" /> and is <SparklesText text="100% private." sparklesCount={5} duration={5} className="" />
        </span>
        <ShareButton />
        <AppGrid />
      </div >
    </div >
  );
}
