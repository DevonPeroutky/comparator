import { ReactNode } from "react";
import { FeatureCard, FeatureDescription, FeatureDescriptionContainer, FeatureTitle, SkeletonFour, SkeletonOne, SkeletonThree, SkeletonTwo } from "./components/ui/bento-grid";
import { AddOfferModal } from "./domains/offers/components/add-offer-modal/add-offer-modal";
import { JobOfferTable } from "./domains/offers/components/job-offers-table";
import { OfferGraphTitle, OffersGraph } from "./domains/scenarios/components/offer-graph";
import { DilutionTable, DilutionTitle } from "./domains/dilution/components/index";
import { ComparisonTable } from "./domains/outcome-comparison/index";
import { ScenarioBuilder, ScenarioBuilderDescription } from "./domains/scenarios/components/equity-journey-card";

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
      content: <SkeletonFour />,
      className: "border-b col-span-1 lg:col-span-2 dark:border-neutral-800",
    },
    {
      title: <OfferGraphTitle />,
      description: null,
      content: <OffersGraph title="Offers / Time" description="Look at how your compensation packages increase in value as the companies' valuation increases" />,
      className:
        "col-span-1 lg:col-span-3 lg:border-r  dark:border-neutral-800",
    },
    {
      title: <DilutionTitle />,
      description: null,
      content: <DilutionTable />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
    {
      title: "Scenario Builder",
      description: <ScenarioBuilderDescription />,
      content: <ScenarioBuilder />,
      className: "col-span-1 lg:col-span-6 border-t dark:border-neutral-800",
    },
    {
      title: "Compare Outcomes",
      description: "See how the equity compares round by round",
      content: <ComparisonTable />,
      className: "col-span-1 lg:col-span-6 border-t dark:border-neutral-800",
    },

  ];
  return (
    <div className="relative ">
      <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border rounded-md dark:border-neutral-800">
        {features.map((feature) => (
          <FeatureCard key={feature.title} className={feature.className}>
            <FeatureTitle>{feature.title}</FeatureTitle>
            {feature.description && <FeatureDescriptionContainer>{feature.description}</FeatureDescriptionContainer>}
            <div className=" h-full w-full">{feature.content}</div>
          </FeatureCard>
        ))}
      </div>
    </div>
  );
}

