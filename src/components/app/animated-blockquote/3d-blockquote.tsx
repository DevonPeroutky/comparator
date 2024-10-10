import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AnimatedBlockquote } from ".";

export const FancyBlockquote = ({
  children,
  author,
  className,
  containerClassName,
  stemHeight = 50,
}: {
  stemHeight?: number;
  children: React.ReactNode;
  author?: string;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState(
    "rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("rotateX(40deg) scale(0.95)");
  };
  const onMouseLeave = () => {
    setTransform("rotateX(0deg) scale(1)");
  };

  return (
    <div
      className={cn(
        "relative group/pin z-50 cursor-pointer",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Make this block non-absolute so it sizes the parent */}
      <div
        style={{
          transform: transform,
        }}
        className={cn(
          "relative p-2 flex justify-start items-start rounded-2xl border border-white/[0.1] group-hover/pin:border-white/[0.2] transition duration-700 overflow-hidden group-hover/pin:shadow-[0_8px_16px_rgb(0_0_0/0.4)]")}
      >
        {/* The content block adjusts the parent size */}
        {/* <div className={cn("relative z-50", className)}>{children}</div> */}
        {children}
      </div>

      <PinPerspective title={author} stemHeight={stemHeight} />
    </div>
  );
};

const PinPerspective = ({
  title,
  stemHeight
}: {
  stemHeight: number;
  title?: string;
  href?: string;
}) => {
  return (
    <motion.div className="pointer-events-none flex items-center justify-center opacity-0 group-hover/pin:opacity-100 z-[60] transition duration-500">
      <div className="absolute -top-6 inset-x-0 flex justify-center">
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 group-hover/pin:shadow-[0_8px_16px_rgb(0_0_0/0.4)]">
          <span className="relative z-20 text-white text-xs font-bold inline-block py-0.5">
            {title}
          </span>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
        </div>
      </div>

      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] -translate-x-1/2 -translate-y-1/2"
      >
        <>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              opacity: [0, 1, 0.5, 0],
              scale: 1,

              z: 0,
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: 0,
            }}
            className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
          ></motion.div>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              opacity: [0, 1, 0.5, 0],
              scale: 1,

              z: 0,
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: 2,
            }}
            className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
          ></motion.div>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0,
              x: "-50%",
              y: "-50%",
            }}
            animate={{
              opacity: [0, 1, 0.5, 0],
              scale: 1,

              z: 0,
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: 4,
            }}
            className="absolute left-1/2 top-1/2  h-[11.25rem] w-[11.25rem] rounded-[50%] bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
          ></motion.div>
        </>
      </div>

      <>
        <motion.div className={`absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[1px] w-px group-hover/pin:h-[${stemHeight}px] blur-[2px]`} style={{
          height: `${stemHeight}px`
        }} />
        <motion.div className={`absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[1px] w-px group-hover/pin:h-[${stemHeight}px]`}
          style={{
            height: `${stemHeight}px`
          }} />
        <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[1px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
        <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[1px] w-[2px] h-[2px] rounded-full z-40 " />
      </>
    </motion.div>
  );
};
