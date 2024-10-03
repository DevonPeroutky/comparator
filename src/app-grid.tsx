import { ReactNode } from "react";
import { FeatureCard, FeatureDescription, FeatureTitle, SkeletonFour, SkeletonOne, SkeletonThree, SkeletonTwo } from "./components/ui/bento-grid";
import { AddOfferModal } from "./domains/offers/components/add-offer-modal/add-offer-modal";
import { JobOfferTable } from "./domains/offers/components/job-offers-table";
import { DataTable } from "./components/ui/data-table";

type BentoCardProps = {
  title?: ReactNode;
  content: ReactNode;
  description: ReactNode;
  className: string;
}

export function AppGrid() {
  const features: BentoCardProps[] = [
    {
      title: <div className='flex items-center justify-between'>
        <span>Offers</span>
        <AddOfferModal />
      </div>,
      description:
        "Add Job Offers here",
      content: <JobOfferTable />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: "Capture pictures with AI",
      description:
        "Capture stunning photos effortlessly using our advanced AI technology.",
      content: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: "Watch our AI on YouTube",
      description:
        "Whether its you or Tyler Durden, you can get to know about our product on YouTube",
      content: <SkeletonThree />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
    },
    {
      title: "Deploy in seconds",
      description:
        "With our blazing fast, state of the art, cutting edge, we are so back cloud servies (read AWS) - you can deploy your model in seconds.",
      content: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];
  return (
    <div className="relative z-20 py-10 lg:py-40 mx-auto">
      <div className="px-8">
        <h1 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
          Comparator
        </h1>

        <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
          Free (and <a href='https://github.com/DevonPeroutky/comparator' target='_blank'>open-source</a>) way of comparing job offers and equity packages. All the data is stored 100% on client (nothing is sent to a server).
        </p>
      </div>

      <div className="relative ">
        <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
          {features.map((feature) => (
            <FeatureCard key={feature.title} className={feature.className}>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureDescription>{feature.description}</FeatureDescription>
              <div className=" h-full w-full">{feature.content}</div>
            </FeatureCard>
          ))}
        </div>
      </div>
    </div>
  );
}

