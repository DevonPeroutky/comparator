import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useRef, useState } from 'react';

type HoverAnimatedBorderProps = {
  children: ReactNode,
  className?: string,
  radius?: number
}

export const HoverAnimatedBorder: React.FC<HoverAnimatedBorderProps> = ({ children, radius }) => {
  const contentRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const lineVariants = {
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

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current) {
        const { width, height } = contentRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  return (
    <div
      style={{
        borderRadius: `${radius}px`,
      }}
      className={`relative cursor-text`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        overflow={"visible"}
        className="absolute top-0 left-0 -z-10"
        width={dimensions.width}
        height={dimensions.height}
      >
        <motion.rect
          y="0"
          width="100%"
          height="100%"
          className={"shadow-[0_8px_16px_rgb(0_0_0/0.4)]"}
          rx={radius}
          fill="none"
          color="currentColor"
          strokeWidth="1"
          variants={lineVariants}
          initial="initial"
          // animate="animate"
          animate={isHovered ? "animate" : "initial"}
          exit="initial"
        />
      </svg>
      <div ref={contentRef} className="p-4">
        {children}
      </div>
    </div>
  );
}
