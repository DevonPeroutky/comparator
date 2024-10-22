import { AppGrid } from './app-grid';
import { AnimatedShareButton, ShareButton, TestButton } from './components/app/share-button';
import SparklesText from "./components/ui/sparkles-text";
import Lottie from 'react-lottie-player';
// import animationData from './assets/animations/test-compare-light.json';
import animationData from './assets/animations/compare-light.json';
import { useState } from 'react';
import { cn } from './lib/utils';

export default function App() {
  const title = "Comparator";
  const [animationCompleted, setAnimationCompleted] = useState(false);

  return (
    <div className='relative z-20 pb-10 lg:pb-10 w-screen flex flex-col items-center'>
      <Lottie animationData={animationData} play loop={false} className="w-[250px] md:w-[400px] lg:w-[500px] xl:w-[600px] 2xl:w-[700px] mb-4" onComplete={() => setAnimationCompleted(true)} />
      <div className={cn("flex flex-col items-center text-center mx-auto transition-opacity duration-1000", animationCompleted ? "opacity-100" : "opacity-0")}>
        <div className="flex flex-wrap items-center justify-center mb-4 text-lg font-normal text-gray-500 dark:text-gray-400 " >
          <p>Free (and</p>
          <a href='https://github.com/DevonPeroutky/comparator' target='_blank' className='mx-1 font-medium text-sky-600 dark:text-blue-500 hover:underline'>open-source</a>
          <p>) way of comparing job offers and equity packages. Your data is</p>
          <SparklesText text="only stored in your browser" sparklesCount={5} duration={5} className="mx-1" />
          <p>and is</p>
          <SparklesText text="100% private." sparklesCount={5} duration={5} className="mx-1" />
        </div>
        <ShareButton />
        <AppGrid />
      </div >
    </div >
  );
}
