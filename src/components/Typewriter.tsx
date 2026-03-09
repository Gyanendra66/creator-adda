import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Creative", "Perfect", "Dream", "Ideal"];

export default function Typewriter() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="relative inline-block">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: 20, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -20, opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="text-gradient inline-block"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
