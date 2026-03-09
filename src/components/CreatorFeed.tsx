import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";

interface Creator {
  id?: number;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  price: string;
  avatar: string;
  thumbnail: string;
  tags: string[];
  online: boolean;
}

const creators: Creator[] = [
  {
    id: 1,
    name: "Aarav Mehta",
    role: "Cinematic Video Editor",
    rating: 4.9,
    reviews: 234,
    price: "₹2,500",
    avatar: "AM",
    thumbnail: "🎬",
    tags: ["Premiere Pro", "After Effects", "Color Grading"],
    online: true,
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Thumbnail Designer",
    rating: 5.0,
    reviews: 187,
    price: "₹800",
    avatar: "PS",
    thumbnail: "🎨",
    tags: ["Photoshop", "Illustrator", "YouTube"],
    online: true,
  },
  {
    id: 3,
    name: "Rohan Kapoor",
    role: "Videographer & DOP",
    rating: 4.8,
    reviews: 142,
    price: "₹5,000",
    avatar: "RK",
    thumbnail: "📹",
    tags: ["Sony A7IV", "Drone Shots", "Weddings"],
    online: false,
  },
  {
    name: "Ananya Reddy",
    role: "Scriptwriter & Copywriter",
    rating: 4.9,
    reviews: 310,
    price: "₹1,200",
    avatar: "AR",
    thumbnail: "✍️",
    tags: ["YouTube Scripts", "Ad Copy", "Storytelling"],
    online: true,
  },
  {
    name: "Karan Singh",
    role: "Motion Graphics Artist",
    rating: 4.7,
    reviews: 98,
    price: "₹3,000",
    avatar: "KS",
    thumbnail: "🎞️",
    tags: ["After Effects", "Cinema 4D", "Intros"],
    online: false,
  },
  {
    name: "Meera Joshi",
    role: "Social Media Manager",
    rating: 4.8,
    reviews: 256,
    price: "₹4,000",
    avatar: "MJ",
    thumbnail: "📱",
    tags: ["Reels", "Strategy", "Growth"],
    online: true,
  },
];

const gradients = [
  "from-neon-purple/20 to-neon-cyan/10",
  "from-neon-cyan/20 to-neon-orange/10",
  "from-neon-orange/20 to-neon-pink/10",
  "from-neon-pink/20 to-neon-purple/10",
  "from-neon-purple/20 to-neon-orange/10",
  "from-neon-cyan/20 to-neon-pink/10",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function CreatorFeed() {
  return (
    <section id="creators" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-neon-orange/5 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-neon-orange">
              Top Talent
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              Featured <span className="text-gradient">Creators</span>
            </h2>
          </div>
          <Link
            to="/creators"
            className="rounded-xl border border-dark-border px-5 py-2.5 text-sm font-medium text-gray-300 transition-all hover:border-neon-purple/50 hover:text-white"
          >
            View All →
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {creators.map((c, i) => (
            <motion.div key={c.name} variants={item} whileHover={{ y: -6 }}>
              <Link
                to={c.id ? `/creator/${c.id}` : "/creators"}
                className="glass group block cursor-pointer rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-neon-purple/10"
              >
              {/* Thumbnail */}
              <div
                className={`relative flex h-40 items-center justify-center rounded-t-2xl bg-gradient-to-br ${gradients[i % gradients.length]}`}
              >
                <span className="text-6xl">{c.thumbnail}</span>
                {/* Favorite */}
                <button
                  type="button"
                  onClick={(event) => event.preventDefault()}
                  className="absolute right-3 top-3 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-colors hover:bg-black/50"
                >
                  <Heart size={16} className="text-gray-300" />
                </button>
              </div>

              {/* Info */}
              <div className="p-5">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan text-xs font-bold text-white">
                      {c.avatar}
                    </div>
                    {c.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-dark-card bg-green-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-white">
                      {c.name}
                    </h3>
                    <p className="truncate text-xs text-gray-500">{c.role}</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-dark-card px-2 py-0.5 text-[10px] font-medium text-gray-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-4 flex items-center justify-between border-t border-dark-border pt-3">
                  <div className="flex items-center gap-1">
                    <Star size={13} className="fill-yellow-500 text-yellow-500" />
                    <span className="text-xs font-semibold text-white">
                      {c.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({c.reviews})
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-500">Starting at</span>
                    <span className="ml-1 text-sm font-bold text-white">
                      {c.price}
                    </span>
                  </div>
                </div>
              </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
