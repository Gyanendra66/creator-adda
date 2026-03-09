import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Video,
  Film,
  ImageIcon,
  PenTool,
  Camera,
  Mic,
  Monitor,
  Megaphone,
  Palette,
  Music,
  BookOpen,
  Wand2,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Category {
  icon: LucideIcon;
  label: string;
  slug: string;
  count: string;
  description: string;
  color: string;
  gradient: string;
}

const categories: Category[] = [
  {
    icon: Video,
    label: "Videographers",
    slug: "videographers",
    count: "3,200+",
    description: "Professional video shoots for brands, events, products, and social media content.",
    color: "text-neon-purple",
    gradient: "from-neon-purple to-neon-pink",
  },
  {
    icon: Film,
    label: "Video Editors",
    slug: "video-editors",
    count: "4,100+",
    description: "Post-production editing, color grading, transitions, and cinematic cuts.",
    color: "text-neon-cyan",
    gradient: "from-neon-cyan to-neon-purple",
  },
  {
    icon: ImageIcon,
    label: "Thumbnail Artists",
    slug: "thumbnail-artists",
    count: "1,800+",
    description: "Eye-catching YouTube & social media thumbnails that boost click-through rates.",
    color: "text-neon-orange",
    gradient: "from-neon-orange to-neon-pink",
  },
  {
    icon: PenTool,
    label: "Scriptwriters",
    slug: "scriptwriters",
    count: "2,500+",
    description: "Engaging scripts for YouTube videos, short films, ads, and podcasts.",
    color: "text-neon-pink",
    gradient: "from-neon-pink to-neon-purple",
  },
  {
    icon: Camera,
    label: "Cinematographers",
    slug: "cinematographers",
    count: "900+",
    description: "Cinematic storytelling with professional camera work and lighting.",
    color: "text-neon-cyan",
    gradient: "from-neon-cyan to-neon-orange",
  },
  {
    icon: Mic,
    label: "Voiceover Artists",
    slug: "voiceover-artists",
    count: "1,400+",
    description: "Professional voiceovers for videos, ads, audiobooks, and IVR systems.",
    color: "text-neon-purple",
    gradient: "from-neon-purple to-neon-cyan",
  },
  {
    icon: Monitor,
    label: "Live Streamers",
    slug: "live-streamers",
    count: "750+",
    description: "Multi-camera live streaming setups for events, gaming, and webinars.",
    color: "text-neon-orange",
    gradient: "from-neon-orange to-neon-cyan",
  },
  {
    icon: Megaphone,
    label: "Social Media Managers",
    slug: "social-media-managers",
    count: "2,100+",
    description: "End-to-end social media strategy, scheduling, growth, and analytics.",
    color: "text-neon-pink",
    gradient: "from-neon-pink to-neon-orange",
  },
  {
    icon: Palette,
    label: "Graphic Designers",
    slug: "graphic-designers",
    count: "3,600+",
    description: "Channel art, banners, overlays, logos, and brand identity design.",
    color: "text-neon-purple",
    gradient: "from-neon-purple to-neon-orange",
  },
  {
    icon: Wand2,
    label: "Motion Graphics",
    slug: "motion-graphics",
    count: "1,300+",
    description: "Animated intros, outros, lower thirds, and kinetic typography.",
    color: "text-neon-cyan",
    gradient: "from-neon-cyan to-neon-pink",
  },
  {
    icon: Music,
    label: "Music Producers",
    slug: "music-producers",
    count: "980+",
    description: "Custom background music, jingles, sound effects, and audio mixing.",
    color: "text-neon-orange",
    gradient: "from-neon-orange to-neon-purple",
  },
  {
    icon: BookOpen,
    label: "Content Strategists",
    slug: "content-strategists",
    count: "1,600+",
    description: "Content calendars, audience research, SEO-driven video strategy.",
    color: "text-neon-pink",
    gradient: "from-neon-pink to-neon-cyan",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filtered = categories.filter(
    (cat) =>
      cat.label.toLowerCase().includes(search.toLowerCase()) ||
      cat.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-grid pt-24 pb-20">
      {/* Background accents */}
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-neon-purple/5 blur-[150px]" />
      <div className="pointer-events-none absolute -left-20 bottom-20 h-[400px] w-[400px] rounded-full bg-neon-cyan/5 blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-neon-purple">
            Browse By Skill
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl lg:text-6xl">
            All <span className="text-gradient">Categories</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Discover the right creative talent for any content need — from
            videography to motion graphics and everything in between.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mx-auto mt-10 max-w-xl"
        >
          <div className="glass flex items-center gap-3 rounded-xl px-5 py-3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search categories..."
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
            />
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((cat) => {
            const Icon = cat.icon;
            return (
              <motion.div key={cat.slug} variants={item}>
                <Link
                  to={`/creators?category=${cat.slug}`}
                  className="group glass flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neon-purple/10"
                >
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} shadow-lg`}
                  >
                    <Icon size={26} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{cat.label}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-500">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-dark-border pt-3">
                    <span className={`text-xs font-semibold ${cat.color}`}>
                      {cat.count} creators
                    </span>
                    <span className="text-xs text-gray-600 transition-colors group-hover:text-white">
                      Explore →
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-gray-500">
            No categories match your search. Try a different keyword.
          </div>
        )}
      </div>
    </div>
  );
}
