import React from "react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";

export const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`py-16 px-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

export const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug mb-4">
      {children}
    </div>
  );
};

export const FeatureDescription = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2", className
      )}
    >
      {children}
    </p>
  );
};

export const GlobeCard = () => {
  return (
    <div className="h-60 md:h-60  flex flex-col items-start bg-transparent dark:bg-transparent mt-12">
      <div className="flex flex-col max-w-[200px] gap-y-4 italic text-muted-foreground">
        <blockquote className="">
          "Wealth consists not in having great possessions, but in having few wants."
        </blockquote>
        <div>- Epictetus</div>
      </div>
      <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
    </div >
  );
};

const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.001;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};

export const FeatureDescriptionContainer = ({ children, className }: { children?: React.ReactNode, className?: string }) => {
  return (
    <div
      className={cn(
        "md:text-base text-left mx-auto w-full",
        "text-neutral-500 text-center font-normal dark:text-neutral-300",
        "text-left mx-0 mb-10", className
      )}
    >
      {children}
    </div>
  );
};

