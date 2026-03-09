import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });
  const visible = useRef(false);
  const opacity = useMotionValue(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible.current) {
        visible.current = true;
        opacity.set(1);
      }
    };
    const leave = () => { opacity.set(0); visible.current = false; };
    const enter = () => { opacity.set(1); visible.current = true; };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [cursorX, cursorY, opacity]);

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden h-[300px] w-[300px] rounded-full md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity,
        background:
          "radial-gradient(circle, rgba(168,85,247,0.08) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)",
      }}
    />
  );
}
