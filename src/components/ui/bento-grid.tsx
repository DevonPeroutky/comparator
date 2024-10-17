import React from "react";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { PinContainer } from "./3d-pin";
import { AnimatedBlockquote } from "../app/animated-blockquote";
import { motion } from "framer-motion";
import { FancyBlockquote } from "../app/animated-blockquote/3d-blockquote";

export const FeatureCard = ({
  children,
  className,
  position
}: {
  children?: React.ReactNode;
  className?: string;
  position: "left" | "right" | "full" | "center";
}) => {
  const positionClass = position === "left" ? "px-4 md:px-8 xl:pl-12 2xl:pl-18" :
    position === "right" ? "px-4 md:px-8 xl:pr-12 2xl:pr-18" :
      "px-4 md:px-8 xl:px-12 2xl:px-18";

  const variants = {
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
    center: { y: 50, opacity: 0 },
    full: { scale: 0.9, opacity: 0 },
  };

  return (
    <motion.div
      className={cn(`py-16 relative overflow-hidden`, positionClass, className)}
      initial={variants[position]}
      animate={{ x: 0, y: 0, scale: 1, opacity: 1, transition: { duration: 1, ease: "easeInOut" } }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {position === "center" && (
        <svg className="absolute top-0 left-0 w-full h-1" viewBox="0 0 100 1" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="1"
            className="animate-draw-line" />
        </svg>
      )}
      {children}
    </motion.div>
  );
};

export const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="text-left tracking-tight text-black dark:text-white text-xl md:text-2xl md:leading-snug">
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
    <div className="min-h-60 md:min-h-60  flex flex-col items-start bg-transparent dark:bg-transparent">
      <FancyBlockquote author="Epicetus" className="" stemHeight={85}>
        {/* <AnimatedBlockquote> */}
        <blockquote className="italic w-[200px] p-4">
          "Wealth consists not in having great possessions, but in having few wants."
        </blockquote>
        {/* </AnimatedBlockquote> */}
      </FancyBlockquote>
      <Globe className="absolute -right-10 md:right-[-150px] -bottom-80 md:-bottom-72" />
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

