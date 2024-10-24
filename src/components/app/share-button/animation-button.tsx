import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

type AnimatedButtonProps = {
  text: string
  alternativeText: string
  icon: ReactNode
  alternativeIcon: ReactNode
} & ButtonProps;

export const AnimatedButton: React.FC<AnimatedButtonProps> = (props) => {
  const [animated, setAnimated] = useState(false);
  const { text, alternativeText, icon, alternativeIcon, variant, } = props;

  // Resetting the button
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (animated) {
        setAnimated(false);
      }
    }, 3000);

    return () => clearTimeout(timeout);
  }, [animated]);

  return (
    <motion.div
      className="flex items-center w-fit min-w-[200px]"
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      key="animated"
    >
      <div className="relative inline-flex group cursor-pointer">
        <div
          className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-leafGreen via-chefBlue to-darkPear rounded-xl blur-sm group-hover:blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-500 animate-tilt " />
        <Button
          onClick={(e) => { setAnimated(curr => !curr); props.onClick?.(e) }}
          className={cn("flex items-center w-full overflow-hidden z-10 min-w-[200px] text-white hover:text-gray-300", (animated) ? "outline-emerald-500" : "")}
          variant={variant}
        >
          <AnimatePresence mode="wait">
            {animated ? (
              <motion.div
                key="animated"
                className="flex items-center justify-start gap-x-2"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } }}
                exit={{ y: 0, opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
              >
                <motion.span
                  initial={{ scale: 0, rotate: "-360deg" }}
                  animate={{ scale: 1, rotate: "360deg", transition: { duration: 0.4, ease: "easeInOut" } }}
                  exit={{ scale: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
                  className="text-emerald-400 dark:text-emerald-400">{alternativeIcon}</motion.span>
                <StaggeredText text={alternativeText} className="text-emerald-400 dark:text-emerald-400" />
              </motion.div>
            ) : (
              <motion.div
                className="flex items-center justify-start gap-x-2 group"
              >
                <motion.span
                  key="animated"
                  className="initial-icon text-gray-300 group-hover:text-lightBlue"
                  initial={{ y: 0, opacity: 0, }}
                  animate={{ y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } }}
                  exit={{ scale: 0, rotate: "360deg", transition: { duration: 0.2, ease: "easeInOut" } }}
                >{icon}</motion.span>
                <motion.span
                  key="initial"
                  initial={{ y: 0, opacity: 0, }}
                  animate={{ y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } }}
                  exit={{ y: -50, opacity: 0, transition: { duration: 0.1, ease: "easeInOut" } }}
                  className="initial-text text-gray-300 group-hover:text-lightBlue">{text}</motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </Button >
      </div>
    </motion.div >
  )
}

const StaggeredText: React.FC<{ text: string, className?: string }> = ({ text, className }) => {
  // Container variants for the entire text
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Delay between each letter
        delayChildren: 0.1     // Initial delay before animation starts
      }
    }
  };

  // Variants for each letter
  const letterVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    }
  };

  return (
    <motion.div
      className={cn("flex items-center justify-center", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {
        text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letterVariants}
            // className="inline-block"
            style={{
              marginLeft: char === " " ? "0.25rem" : "0"
            }}
          >
            {char}
          </motion.span>
        ))
      }
    </motion.div >
  );
};
