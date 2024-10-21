import { AppGrid } from './app-grid';
import { AnimatedShareButton, ShareButton, TestButton } from './components/app/share-button';
import { Button } from './components/ui/button';
import SparklesText from "./components/ui/sparkles-text";

export default function App() {
  const title = "Comparator";

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
        {/* <AnimatedShareButton className='mb-10'> */}
        {/*   <button className='flex items-center w-fit h-10 px-4 py-2 dark:bg-white  bg-white rounded-none outline-none hover:border-transparent'>Copy URL to Share</button> */}
        {/* </AnimatedShareButton> */}
        {/* <AnimatedShareButton> */}
        {/*   <Button className='hover:border-transparent'>Copy URL to Share</Button> */}
        {/* </AnimatedShareButton> */}
        {/* <TestButton /> */}
        <AppGrid />
      </div >
    </div>
  );
}
