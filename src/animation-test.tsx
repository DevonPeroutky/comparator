import { useAnimate, stagger, motion, AnimatePresence } from "framer-motion";
import { ButtonProps, Button } from "./components/ui/button";
import { ReactNode, useEffect, useState } from "react";

type AnimatedButtonProps = {
  text: string
  alternativeText: string
  icon: ReactNode
  alternativeIcon: ReactNode
} & ButtonProps;
export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ icon, text, alternativeText, alternativeIcon }) => {
  const [scopeRef, animate] = useAnimate();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Checking if animated! ")
      if (animated) {
        setAnimated(false);
        animate([
          [".letter", { y: 0 }, { duration: 0.000001 }],
          [".new-letter", { y: 0 }, { duration: 0.000001, "at": "<" }],
          [".new-icon", { scale: 0, rotate: "-360deg" }, { duration: 0.25, ease: "easeInOut", "at": "<" }],
          [".initial-icon", { scale: 1, rotate: "-360deg" }, { duration: 0.25, ease: "easeInOut", "at": "<" }],
          ["button", { scale: 1, borderColor: "", outlineColor: "" }, { duration: 0.1 }],
        ]);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [animated]);

  const alternativeLetters = alternativeText.split("");

  const onButtonClick = () => {
    animate([
      [".letter", { y: "-100%" }, { duration: 0.1, delay: stagger(.03) }],
      [".new-letter", { y: "-100%" }, { duration: 0.25, delay: stagger(.05), "at": "<" }],
      [".initial-icon", { rotate: "360deg", scale: 0 }, { duration: 0.4, ease: "easeInOut", "at": "<" }],
      ["button", { scale: 0.8 }, { duration: 0.1, "at": "<" }],
      ["button", { scale: 1, borderColor: "#22c55e", }, { duration: 0.1 }],
      [".new-icon", { rotate: "360deg", scale: 1 }, { duration: 0.4, ease: "easeInOut" }],
    ]).then(() => {
      // animate(".letter", { width: "0px", minWidth: "0px" }, { duration: 0 });
    });
    // setAnimated(true);
  };

  return (
    <div ref={scopeRef}>
      <Button className="flex items-center rounded-md border-2 px-6 py-2 transition-colors" onClick={onButtonClick}>
        <div className="relative flex flex-col overflow-hidden justify-center mr-2">
          <span className="initial-icon">{icon}</span>
          <span className="absolute new-icon scale-0" style={{ color: "#22c55e", top: 0 }}>{alternativeIcon}</span>
        </div>
        <span className="sr-only">{text}</span>
        <div className="flex h-8 flex-col overflow-hidden" aria-hidden>
          <div className="flex">
            {text.split("").map((letter, index) => (
              <span
                className="min-w-3 letter inline-block h-8 leading-8"
                key={`${letter}-${index}`}
              >
                {letter}
              </span>
            ))}
          </div>
          <div className="text-left flex">
            {alternativeLetters.map((letter, index) => (
              <span key={`alt-${letter}-${index}`} className={`min-w-3 new-letter h-8 leading-8 inline-block text-green-500`} style={{
              }}>{alternativeLetters[index] || ''}</span>
            ))}
          </div>
        </div>
      </Button >
    </div >
  )
}

export const AnimatedButton2: React.FC<AnimatedButtonProps> = ({ icon, text, alternativeText, alternativeIcon, variant }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("Checking if animated! ")
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
      <Button
        onClick={() => setAnimated(curr => !curr)}
        className="flex items-center w-full overflow-hidden"
        variant={variant}
      >
        <AnimatePresence mode="wait">
          {animated ? (
            <motion.div
              key="animated"
              className="flex items-center gap-x-2"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } }}
              exit={{ y: 0, opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
            >
              <motion.span className="initial-icon text-emerald-600 dark:text-emerald-400">{alternativeIcon}</motion.span>
              <motion.span className="initial-text text-emerald-600 dark:text-emerald-400">{alternativeText}</motion.span>
            </motion.div>
          ) : (
            <motion.div
              key="initial"
              className="flex items-center gap-x-2"
              initial={{ y: 0, opacity: 1 }}
              animate={{ y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeInOut" } }}
              exit={{ y: -50, opacity: 0, transition: { duration: 0.1, ease: "easeInOut" } }}
            >
              <motion.span className="initial-icon">{icon}</motion.span>
              <motion.span className="initial-text">{text}</motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      </Button >
    </motion.div>
  )
}
