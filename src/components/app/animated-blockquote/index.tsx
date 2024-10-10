import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

type AnimatedBlockquoteProps = {
  children: React.ReactNode;
  className?: string;
  strokeWidth?: number;
};
export const AnimatedBlockquote: React.FC<AnimatedBlockquoteProps> = ({ children, className }) => {
  const [isHovered, setIsHovered] = useState(false);

  const borderVariants = {
    initial: {
      pathLength: 0,
      opacity: 0
    },
    animate: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Four separate lines for uniform thickness */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Top line */}
        <motion.line
          x1="0" y1="0" x2="100%" y2="0"
          strokeWidth="2"
          stroke="currentColor"
          className="text-green-500"
          variants={borderVariants}
          initial="initial"
          animate={isHovered ? "animate" : "initial"}
        />
        {/* Right line */}
        <motion.line
          x1="100%" y1="0" x2="100%" y2="100%"
          strokeWidth="2"
          stroke="currentColor"
          className="text-blue-500"
          variants={borderVariants}
          initial="initial"
          animate={isHovered ? "animate" : "initial"}
        />
        {/* Bottom line */}
        <motion.line
          x1="100%" y1="100%" x2="0" y2="100%"
          strokeWidth="2"
          stroke="currentColor"
          className="text-blue-500"
          variants={borderVariants}
          initial="initial"
          animate={isHovered ? "animate" : "initial"}
        />
        {/* Left line */}
        <motion.line
          x1="0" y1="100%" x2="0" y2="0"
          strokeWidth="2"
          stroke="currentColor"
          className="text-blue-500"
          variants={borderVariants}
          initial="initial"
          animate={isHovered ? "animate" : "initial"}
        />
      </svg>

      {/* Actual Blockquote */}
      <div className="p-1">
        <motion.div
          initial={{ opacity: 0.9 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

// Example usage
export const ExampleUsage = () => {
  return (
    <div className="p-8">
      <AnimatedBlockquote2>
        <p className="text-lg italic">
          "The only way to do great work is to love what you do.
          If you haven't found it yet, keep looking. Don't settle."
        </p>
        <footer className="mt-2 text-sm text-gray-600">
          — Steve Jobs
        </footer>
      </AnimatedBlockquote2>
      <AnimatedBlockquote>
        <p className="text-lg italic">
          "The only way to do great work is to love what you do.
          If you haven't found it yet, keep looking. Don't settle."
        </p>
        <footer className="mt-2 text-sm text-gray-600">
          — Steve Jobs
        </footer>
      </AnimatedBlockquote>
    </div>
  );
};


export const AnimatedBlockquote2 = ({
  children,
  className,
  containerClassName
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const [transform, setTransform] = useState(
    "translate(-50%, -50%) rotateX(0deg)"
  );

  const onMouseEnter = () => {
    setTransform("translate(-50%, -50%) rotateX(40deg) scale(0.8)");
  };

  const onMouseLeave = () => {
    setTransform("translate(-50%, -50%) rotateX(0deg) scale(1)");
  };

  return (
    <div
      className={cn(
        "relative group z-50 cursor-pointer min-h-[200px]",
        containerClassName
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* 3D Container */}
      <div
        style={{
          perspective: "1000px",
          transform: "rotateX(70deg) translateZ(0deg)",
        }}
        className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2 w-full"
      >
        {/* Content Container */}
        <motion.div
          style={{
            transform: transform,
          }}
          className="absolute left-1/2 top-1/2 w-full p-8 rounded-2xl 
                     transition-all duration-700 overflow-hidden
                     group-hover:shadow-[0_8px_16px_rgb(0_0_0/0.4)]
                     group-hover:border group-hover:border-white/[0.2]
                     group-hover:bg-black/50"
        >
          {/* Gradient Background */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 
                       transition-opacity duration-500"
            style={{
              background: "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))",
            }}
          />

          {/* Animated Border Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.line
              x1="0" y1="0" x2="100%" y2="0"
              strokeWidth="2"
              stroke="currentColor"
              className="text-blue-500"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            <motion.line
              x1="100%" y1="0" x2="100%" y2="100%"
              strokeWidth="2"
              stroke="currentColor"
              className="text-blue-500"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            />
            <motion.line
              x1="100%" y1="100%" x2="0" y2="100%"
              strokeWidth="2"
              stroke="currentColor"
              className="text-blue-500"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
            />
            <motion.line
              x1="0" y1="100%" x2="0" y2="0"
              strokeWidth="2"
              stroke="currentColor"
              className="text-blue-500"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.6 }}
            />
          </svg>

          {/* Content */}
          <motion.div
            className={cn("relative z-10", className)}
            initial={{ opacity: 0.7 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
