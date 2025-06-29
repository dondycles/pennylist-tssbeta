"use client";

import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
} from "motion/react";
import * as React from "react";

import { cn } from "@/lib/utils";

const sizes = {
  default: "size-8 [&_svg]:size-5",
  sm: "size-6 [&_svg]:size-4",
  md: "size-10 [&_svg]:size-6",
  lg: "size-12 [&_svg]:size-7",
};

const animations = {
  pulse: {
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: [1.2, 1.8, 1.2], opacity: [0, 0.3, 0] },
    transition: { duration: 1.2, ease: "easeInOut" },
  },
  glow: {
    initial: { scale: 1, opacity: 0 },
    animate: { scale: [1, 1.5], opacity: [0.8, 0] },
    transition: { duration: 0.8, ease: "easeOut" },
  },
  particle: (index: number) => ({
    initial: { x: "50%", y: "50%", scale: 0, opacity: 0 },
    animate: {
      x: `calc(50% + ${Math.cos((index * Math.PI) / 3) * 30}px)`,
      y: `calc(50% + ${Math.sin((index * Math.PI) / 3) * 30}px)`,
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
    },
    transition: { duration: 0.8, delay: index * 0.05, ease: "easeOut" },
  }),
};

type IconButtonProps = Omit<HTMLMotionProps<"button">, "color"> & {
  icon: React.ElementType;
  active?: boolean;
  className?: string;
  animate?: boolean;
  size?: keyof typeof sizes;
  transition?: Transition;
};

function IconButton({
  icon: Icon,
  className,
  active = false,
  animate = true,
  size = "default",
  transition = { type: "spring", stiffness: 300, damping: 15 },
  ...props
}: IconButtonProps) {
  return (
    <motion.button
      data-slot="icon-button"
      className={cn(
        `group/icon-button relative inline-flex size-10 shrink-0 cursor-pointer rounded-full text-[var(--icon-button-color)]`,
        sizes[size],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={
        {
          "--icon-button-color": "var(--foreground)",
        } as React.CSSProperties
      }
      {...props}
    >
      <motion.div
        className="stroke-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/icon-button:stroke-[var(--icon-button-color)]"
        aria-hidden="true"
      >
        <Icon
          className={
            active ? "fill-[var(--icon-button-color)]" : "fill-transparent"
          }
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-[var(--icon-button-color)] text-[var(--icon-button-color)]"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={transition}
          >
            <Icon />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {animate && active && (
          <>
            <motion.div
              className="absolute inset-0 z-10 rounded-full"
              {...animations.pulse}
            />
            <motion.div
              className="absolute inset-0 z-10 rounded-full"
              {...animations.glow}
            />
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-[var(--icon-button-color)]"
                initial={animations.particle(i).initial}
                animate={animations.particle(i).animate}
                transition={animations.particle(i).transition}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export { IconButton, sizes, type IconButtonProps };
