import { motion } from "framer-motion";

const tools = [
  "Premiere Pro", "After Effects", "DaVinci Resolve", "Final Cut Pro",
  "Photoshop", "Illustrator", "Figma", "Cinema 4D",
  "Blender", "CapCut", "Canva", "Lightroom",
  "Audition", "Logic Pro", "OBS Studio", "Sony Vegas",
];

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const doubled = [...tools, ...tools];
  return (
    <div className="flex overflow-hidden">
      <motion.div
        className="flex shrink-0 gap-4"
        animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((tool, i) => (
          <div
            key={`${tool}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-dark-border bg-dark-card/60 px-5 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:border-neon-purple/30 hover:text-white"
          >
            <div className="h-2 w-2 rounded-full bg-neon-purple/50" />
            {tool}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function BrandMarquee() {
  return (
    <section className="relative overflow-hidden border-y border-dark-border py-12">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-dark-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-dark-bg to-transparent" />

      <div className="mb-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-600">
          Tools our creators master
        </span>
      </div>

      <div className="space-y-4">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  );
}
