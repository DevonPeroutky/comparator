import { ReactNode } from "react";
import { FeatureCard, FeatureDescriptionContainer, FeatureTitle, GlobeCard, } from "./components/ui/bento-grid";
import { AddOfferModal } from "./domains/offers/components/add-offer-modal/add-offer-modal";
import { JobOfferTable } from "./domains/offers/components/job-offers-table";
import { OfferGraphTitle, OffersGraph } from "./domains/scenarios/components/offer-graph";
import { ComparisonTable } from "./domains/outcome-comparison/index";
import { ScenarioBuilderDescription } from "./domains/scenarios/components/equity-journey-card";
import { EquityJourney } from "./domains/scenarios/components/dilution-timeline";
import { ClearOffersTableButton } from "./domains/offers/components/clear-table-button";
import BoxReveal from "./components/ui/box-reveal";
import { Highlight } from "./components/ui/hero-highlight";

type BentoCardProps = {
  title?: ReactNode;
  position: "left" | "right" | "full";
  content: ReactNode;
  description: ReactNode;
  className: string;
}

export function AppGrid() {
  const features: BentoCardProps[] = [
    {
      title: <div className='flex flex-col gap-y-4 md:flex-row items-center justify-between mb-4'>
        <h2 className="text-4xl font-bold dark:text-white">Offers</h2>
        <div className="flex flex-col gap-y-2 md:flex-row items-center gap-x-4">
          <AddOfferModal />
          <ClearOffersTableButton />
        </div>
      </div>,
      position: "left",
      description: null,
      content: <JobOfferTable />,
      className:
        "col-span-1 md:col-span-2 xl:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: <h2 className="text-4xl font-bold dark:text-white mb-4">Perspective</h2>,
      description:
        <span className="text-lg font-semibold text-gray-500 dark:text-gray-400 leading-8">The world, median per-capita <span className="underline underline-offset-2 decoration-2 decoration-blue-400 dark:decoration-blue-600">household income</span> is only <mark className="px-2 text-white bg-blue-400 rounded dark:bg-blue-600 py-1">$2,920 per year</mark><br /> Making over <mark className="px-2 bg-green-600 rounded py-1 text-white">$124,720 / year</mark> puts you in the <span className="underline underline-offset-2 decoration-2 decoration-green-600 dark:decoration-green-600">top 1% of global earners.</span></span>,
      content: <GlobeCard />,
      position: "right",
      className: "border-b col-span-1 md:col-span-2 dark:border-neutral-800",
    },
    {
      title: <h2 className="text-4xl font-bold dark:text-white">Scenario Builder</h2>,
      description: <ScenarioBuilderDescription />,
      content: <EquityJourney />,
      position: "left",
      className: "col-span-1 md:col-span-3 xl:col-span-3 border-b lg:border-none",
    },
    {
      title: <OfferGraphTitle />,
      description: null,
      content: <OffersGraph />,
      position: "right",
      className:
        "col-span-1 md:col-span-2 2xl:col-span-3 lg:border-l dark:border-neutral-800",
    },
    {
      title: <h2 className="flex justify-center items-center md:justify-start text-4xl font-bold dark:text-white">Compare Outcomes</h2>,
      description: <div className="hidden max-w-prose md:max-w-4xl md:flex flex-col mx-auto my-4 px-4 text-muted-foreground italic text-center"><span>Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven’t found it yet, keep looking. Don’t settle. As with all matters of the heart, you’ll know when you find it.” </span><br /><span>- Steve Jobs</span></div >,
      position: "full",
      content: <ComparisonTable />,
      className: "col-span-1 lg:col-span-6 border-t dark:border-neutral-800 px-0 pb-0 flex flex-col items-center justify-center",
    },
  ];

  return (
    <div className="relative ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-6 mt-12 border-t rounded-md dark:border-neutral-800">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} className={feature.className} position={feature.position}>
            <FeatureTitle>{feature.title}</FeatureTitle>
            {feature.description && <FeatureDescriptionContainer>{feature.description}</FeatureDescriptionContainer>}
            <div className=" h-full w-full">{feature.content}</div>
          </FeatureCard>
        ))}
      </div>
    </div >
  );
}

