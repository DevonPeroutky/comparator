import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface AnimatedBorderProps {
  children: React.ReactNode;
  animate?: {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
  };
  className?: string;
  strokeWidth?: number;
  color?: string;
  duration?: number;
  delay?: number;
  roundedCorners?: boolean;
  borderRadius?: number;
  onlyAnimateHover?: boolean;
}

const AnimatedBorder = ({
  children,
  animate = { top: true, right: true, bottom: true, left: true },
  className,
  strokeWidth = 2,
  color = "#3b82f6", // blue-500
  duration = 0.8,
  delay = 0,
  roundedCorners = false,
  onlyAnimateHover = false
}: AnimatedBorderProps) => {
  const [shouldAnimate, setShouldAnimate] = useState(!onlyAnimateHover);

  // Animation variants for the lines
  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration,
        ease: "easeInOut",
      }
    }
  };

  // Calculate the path for each side
  const getLinePath = (side: 'top' | 'right' | 'bottom' | 'left') => {
    const radius = roundedCorners ? 8 : 0; // 8px border radius if rounded

    switch (side) {
      case 'top':
        return roundedCorners
          ? `M ${radius},0 L calc(100% - ${radius}),0`
          : 'M 0,0 L 100%,0';
      case 'right':
        return roundedCorners
          ? `M 100%,${radius} L 100%,calc(100% - ${radius})`
          : 'M 100%,0 L 100%,100%';
      case 'bottom':
        return roundedCorners
          ? `M calc(100% - ${radius}),100% L ${radius},100%`
          : 'M 100%,100% L 0,100%';
      case 'left':
        return roundedCorners
          ? `M 0,calc(100% - ${radius}) L 0,${radius}`
          : 'M 0,100% L 0,0';
    }
  };
  return (
    <div
      className={cn("relative", className)}
      onMouseEnter={() => onlyAnimateHover && setShouldAnimate(true)}
      onMouseLeave={() => onlyAnimateHover && setShouldAnimate(false)}
    >
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          strokeWidth,
          stroke: color,
          fill: 'none',
        }}
      >
        {/* Top line */}
        {animate.top && (
          <motion.path
            d={getLinePath('top')}
            variants={lineVariants}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            transition={{ delay: delay }}
          />
        )}

        {/* Right line */}
        {animate.right && (
          <motion.path
            d={getLinePath('right')}
            variants={lineVariants}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            transition={{ delay: delay + (duration * 0.25) }}
          />
        )}

        {/* Bottom line */}
        {animate.bottom && (
          <motion.path
            d={getLinePath('bottom')}
            variants={lineVariants}
            initial="hidden"
            animate={shouldAnimate ? "visible" : "hidden"}
            transition={{ delay: delay + (duration * 0.5) }}
          />
        )}

        {/* Left line */}
        {animate.left && (
          <motion.path
            d={getlinepath('left')}
            variants={linevariants}
            initial="hidden"
            animate={shouldanimate ? "visible" : "hidden"}
            transition={{ delay: delay + (duration * 0.75) }}
          />
        )}
      </svg>
      {children}
    </div>
  );
};

const SimpleAnimatedBorder = ({
  children,
  className,
  strokeWidth = 1,
  duration = 0.8,
  delay = 0,
  borderRadius = 0,
  animate = { top: false, right: false, bottom: false, left: false },
}: AnimatedBorderProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { top, right, bottom, left } = animate;

  // Animation variants for the lines
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

  const leftPath = `M 0,100 - ${borderRadius}) L 0,${borderRadius}`
  const rightPath = `M 100,${borderRadius} L 100%,${100 - borderRadius}`

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Top line */}
        {top && (
          <motion.line
            x1="0" y1="0" x2="100%" y2="0"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            className={className}
            variants={borderVariants}
            initial="initial"
            animate={isHovered ? "animate" : "initial"}
          />
        )}
        {/* Right line */}
        {right && (
          <motion.path
            strokeWidth={strokeWidth}
            stroke="currentColor"
            d={rightPath}
            className={className}
            variants={borderVariants}
            initial="initial"
            animate={isHovered ? "animate" : "initial"}
          />
        )}
        {/* Bottom line */}
        {bottom && (
          <motion.path
            // x1="0" y1="100%" x2="0" y2="0"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            d={leftPath}
            className={className}
            variants={borderVariants}
            initial="initial"
            animate={isHovered ? "animate" : "initial"}
          />
        )}

        {/* Left line */}
        {/* {animate.left && ( */}
        {/*   <motion.path */}
        {/*     d={getLinePath('left')} */}
        {/*     variants={lineVariants} */}
        {/*     initial="hidden" */}
        {/*     animate={shouldAnimate ? "visible" : "hidden"} */}
        {/*     transition={{ delay: delay + (duration * 0.75) }} */}
        {/*   /> */}
        {/* )} */}
        {left && (
          <motion.path
            strokeWidth={strokeWidth}
            stroke="currentColor"
            d={leftPath}
            className={className}
            variants={borderVariants}
            initial="initial"
            animate={isHovered ? "animate" : "initial"}
          />
        )}
      </svg>
      {children}
    </div >
  )

};
// Example usage with different configurations
export const ExampleBorderUsage = () => {
  return (
    <SimpleAnimatedBorder animate={{
      top: true,
      bottom: true,
      left: true,
      right: true
    }}
      borderRadius={8}
    >
      <div className="text-black bg-sky-50">Simple animated border</div>
    </SimpleAnimatedBorder>
  );
};
