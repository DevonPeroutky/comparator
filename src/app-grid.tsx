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
  content: ReactNode;
  description: ReactNode;
  className: string;
}

export function AppGrid() {
  const features: BentoCardProps[] = [
    {
      title: <div className='flex items-center justify-between mb-4'>
        <h2 className="text-4xl font-bold dark:text-white">Offers</h2>
        <div className="flex items-center gap-x-4">
          <ClearOffersTableButton />
          <AddOfferModal />
        </div>
      </div>,
      description: <div className="my-4" />,
      content: <JobOfferTable />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r dark:border-neutral-800",
    },
    {
      title: <h2 className="text-4xl font-bold dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Did you know?</h2>,
      description:
        // "The world, median per-capita household income is only $2,920 per year. Making over $100,000 puts you in the top 10% of global earners.",
        <span className="text-lg font-normal text-gray-500 dark:text-gray-400 leading-relaxed">The world, median per-capita household income is only <Highlight className="font-bold text-black">$2,920 per year</Highlight>. Making over <Highlight className="font-bold text-black">$100,000 puts you in the top 10% of global earners.</Highlight></span>,
      content: <GlobeCard />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    // {
    //   title: <DilutionTitle />,
    //   description: null,
    //   content: <DilutionTable />,
    //   className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    // },
    {
      title: <h2 className="text-4xl font-bold dark:text-white">Scenario Builder</h2>,
      description: <ScenarioBuilderDescription />,
      content: <EquityJourney />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
    {
      title: <OfferGraphTitle />,
      description: null,
      content: <OffersGraph />,
      className:
        "col-span-1 lg:col-span-3 lg:border-l dark:border-neutral-800",
    },
    {
      title: <h2 className="text-4xl font-bold dark:text-white">Compare Outcomes</h2>,
      description: <div className="my-4" />,
      content: <ComparisonTable />,
      className: "col-span-1 lg:col-span-6 border-t dark:border-neutral-800",
    },

  ];
  return (
    <div className="relative ">
      <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 border-t rounded-md dark:border-neutral-800">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} className={feature.className}>
            <FeatureTitle>{feature.title}</FeatureTitle>
            {feature.description && <FeatureDescriptionContainer>{feature.description}</FeatureDescriptionContainer>}
            <div className=" h-full w-full">{feature.content}</div>
          </FeatureCard>
        ))}
      </div>
    </div >
  );
}

