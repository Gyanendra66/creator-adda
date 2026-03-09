import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Video, Film, ImageIcon, PenTool, Camera, Mic } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Category {
  icon: LucideIcon;
  label: string;
  count: string;
  color: string;
  glow: string;
  href: string;
}

const categories: Category[] = [
  { icon: Video, label: "Videographers", count: "3,200+", color: "text-neon-purple", glow: "group-hover:shadow-neon-purple/20", href: "/creators?category=videography" },
  { icon: Film, label: "Video Editors", count: "4,100+", color: "text-neon-cyan", glow: "group-hover:shadow-neon-cyan/20", href: "/creators?category=video-editing" },
  { icon: ImageIcon, label: "Thumbnail Artists", count: "1,800+", color: "text-neon-orange", glow: "group-hover:shadow-neon-orange/20", href: "/creators?category=thumbnail-design" },
  { icon: PenTool, label: "Scriptwriters", count: "2,500+", color: "text-neon-pink", glow: "group-hover:shadow-neon-pink/20", href: "/creators?category=scriptwriting" },
  { icon: Camera, label: "Cinematographers", count: "900+", color: "text-neon-cyan", glow: "group-hover:shadow-neon-cyan/20", href: "/creators?category=cinematography" },
  { icon: Mic, label: "Voiceover Artists", count: "1,400+", color: "text-neon-purple", glow: "group-hover:shadow-neon-purple/20", href: "/creators?category=voiceover" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Categories() {
  return (
    <section id="categories" className="relative py-24 sm:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-neon-purple/5 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-neon-purple">
            Browse By Skill
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Explore <span className="text-gradient">Categories</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Find the perfect creative professional for your project, from short-form
            reels to cinematic masterpieces.
          </p>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.label} variants={item} whileHover={{ y: -4 }}>
                <Link
                  to={cat.href}
                  className={`group glass flex items-center gap-5 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl ${cat.glow}`}
                >
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-dark-card ${cat.color} transition-colors`}
                  >
                    <Icon size={26} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{cat.label}</h3>
                    <p className="mt-0.5 text-sm text-gray-500">{cat.count} creators</p>
                  </div>
                  <span className="text-gray-600 transition-colors group-hover:text-white">
                    →
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
