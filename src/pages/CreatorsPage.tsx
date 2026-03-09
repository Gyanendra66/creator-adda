import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Star, Heart, MapPin, Filter, ChevronDown, Search } from "lucide-react";

interface Creator {
  id: number;
  name: string;
  role: string;
  rating: number;
  reviews: number;
  price: string;
  avatar: string;
  thumbnail: string;
  tags: string[];
  online: boolean;
  location: string;
  category: string;
}

const allCreators: Creator[] = [
  { id: 1, name: "Aarav Mehta", role: "Cinematic Video Editor", rating: 4.9, reviews: 234, price: "₹2,500", avatar: "AM", thumbnail: "🎬", tags: ["Premiere Pro", "After Effects", "Color Grading"], online: true, location: "Mumbai", category: "video-editors" },
  { id: 2, name: "Priya Sharma", role: "Thumbnail Designer", rating: 5.0, reviews: 187, price: "₹800", avatar: "PS", thumbnail: "🎨", tags: ["Photoshop", "Illustrator", "YouTube"], online: true, location: "Delhi", category: "thumbnail-artists" },
  { id: 3, name: "Rohan Kapoor", role: "Videographer & DOP", rating: 4.8, reviews: 142, price: "₹5,000", avatar: "RK", thumbnail: "📹", tags: ["Sony A7IV", "Drone Shots", "Weddings"], online: false, location: "Bangalore", category: "videographers" },
  { id: 4, name: "Ananya Reddy", role: "Scriptwriter & Copywriter", rating: 4.9, reviews: 310, price: "₹1,200", avatar: "AR", thumbnail: "✍️", tags: ["YouTube Scripts", "Ad Copy", "Storytelling"], online: true, location: "Hyderabad", category: "scriptwriters" },
  { id: 5, name: "Karan Singh", role: "Motion Graphics Artist", rating: 4.7, reviews: 98, price: "₹3,000", avatar: "KS", thumbnail: "🎞️", tags: ["After Effects", "Cinema 4D", "Intros"], online: false, location: "Pune", category: "motion-graphics" },
  { id: 6, name: "Meera Joshi", role: "Social Media Manager", rating: 4.8, reviews: 256, price: "₹4,000", avatar: "MJ", thumbnail: "📱", tags: ["Reels", "Strategy", "Growth"], online: true, location: "Mumbai", category: "social-media-managers" },
  { id: 7, name: "Vikram Patel", role: "Cinematographer", rating: 4.9, reviews: 178, price: "₹8,000", avatar: "VP", thumbnail: "🎥", tags: ["RED Camera", "Cinematic", "Short Films"], online: true, location: "Mumbai", category: "cinematographers" },
  { id: 8, name: "Sneha Nair", role: "Voiceover Artist", rating: 4.8, reviews: 420, price: "₹1,500", avatar: "SN", thumbnail: "🎙️", tags: ["Hindi", "English", "Ads"], online: false, location: "Chennai", category: "voiceover-artists" },
  { id: 9, name: "Arjun Desai", role: "Video Editor", rating: 4.6, reviews: 89, price: "₹1,800", avatar: "AD", thumbnail: "🎬", tags: ["DaVinci Resolve", "Transitions", "Reels"], online: true, location: "Ahmedabad", category: "video-editors" },
  { id: 10, name: "Divya Iyer", role: "Thumbnail & Banner Designer", rating: 4.9, reviews: 345, price: "₹600", avatar: "DI", thumbnail: "🎨", tags: ["Canva", "Photoshop", "Branding"], online: true, location: "Kochi", category: "thumbnail-artists" },
  { id: 11, name: "Nikhil Rao", role: "Videographer", rating: 4.7, reviews: 112, price: "₹4,500", avatar: "NR", thumbnail: "📹", tags: ["Canon R5", "Travel", "Real Estate"], online: false, location: "Goa", category: "videographers" },
  { id: 12, name: "Tanvi Gupta", role: "Content Strategist", rating: 5.0, reviews: 198, price: "₹3,500", avatar: "TG", thumbnail: "📊", tags: ["SEO", "YouTube Growth", "Analytics"], online: true, location: "Delhi", category: "content-strategists" },
];

const gradients = [
  "from-neon-purple/20 to-neon-cyan/10",
  "from-neon-cyan/20 to-neon-orange/10",
  "from-neon-orange/20 to-neon-pink/10",
  "from-neon-pink/20 to-neon-purple/10",
  "from-neon-purple/20 to-neon-orange/10",
  "from-neon-cyan/20 to-neon-pink/10",
];

const categoryLabels: Record<string, string> = {
  videographers: "Videographers",
  "video-editors": "Video Editors",
  "thumbnail-artists": "Thumbnail Artists",
  scriptwriters: "Scriptwriters",
  cinematographers: "Cinematographers",
  "voiceover-artists": "Voiceover Artists",
  "live-streamers": "Live Streamers",
  "social-media-managers": "Social Media Managers",
  "graphic-designers": "Graphic Designers",
  "motion-graphics": "Motion Graphics",
  "music-producers": "Music Producers",
  "content-strategists": "Content Strategists",
};

const sortOptions = ["Recommended", "Top Rated", "Lowest Price", "Most Reviews"];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function CreatorsPage() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category") || "";
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [showSort, setShowSort] = useState(false);

  let filtered = allCreators;

  if (categoryFilter) {
    filtered = filtered.filter((c) => c.category === categoryFilter);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (sort === "Top Rated") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sort === "Lowest Price") filtered = [...filtered].sort((a, b) => parseInt(a.price.replace(/[^\d]/g, "")) - parseInt(b.price.replace(/[^\d]/g, "")));
  else if (sort === "Most Reviews") filtered = [...filtered].sort((a, b) => b.reviews - a.reviews);

  return (
    <div className="min-h-screen bg-grid pt-24 pb-20">
      <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-neon-cyan/5 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-sm font-semibold uppercase tracking-widest text-neon-orange">
            {categoryFilter ? categoryLabels[categoryFilter] || "Creators" : "All Creators"}
          </span>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            Browse <span className="text-gradient">Creators</span>
          </h1>
          <p className="mt-3 max-w-xl text-gray-400">
            {filtered.length} talented creators ready to bring your vision to life.
          </p>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Search */}
          <div className="glass flex flex-1 items-center gap-3 rounded-xl px-4 py-2.5 sm:max-w-md">
            <Search size={16} className="text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, skill, or tool..."
              className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Category pill */}
            {categoryFilter && (
              <Link
                to="/creators"
                className="flex items-center gap-1.5 rounded-lg border border-neon-purple/30 bg-neon-purple/10 px-3 py-1.5 text-xs font-medium text-neon-purple transition-colors hover:bg-neon-purple/20"
              >
                <Filter size={12} />
                {categoryLabels[categoryFilter]} ✕
              </Link>
            )}

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setShowSort(!showSort)}
                className="glass flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium text-gray-300 transition-colors hover:text-white"
              >
                {sort} <ChevronDown size={14} />
              </button>
              {showSort && (
                <div className="glass-strong absolute right-0 z-20 mt-2 w-44 rounded-xl py-1 shadow-xl">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setSort(opt); setShowSort(false); }}
                      className={`block w-full px-4 py-2 text-left text-xs transition-colors hover:bg-dark-hover ${sort === opt ? "text-neon-purple" : "text-gray-400"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filtered.map((c, i) => (
            <motion.div key={c.id} variants={item}>
              <Link
                to={`/creator/${c.id}`}
                className="glass group flex flex-col rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-neon-purple/10"
              >
                {/* Thumbnail */}
                <div className={`relative flex h-36 items-center justify-center rounded-t-2xl bg-gradient-to-br ${gradients[i % gradients.length]}`}>
                  <span className="text-5xl">{c.thumbnail}</span>
                  <button
                    onClick={(e) => e.preventDefault()}
                    className="absolute right-3 top-3 rounded-full bg-black/30 p-2 backdrop-blur-sm transition-colors hover:bg-black/50"
                  >
                    <Heart size={14} className="text-gray-300" />
                  </button>
                  {c.online && (
                    <span className="absolute left-3 top-3 rounded-full bg-green-500/20 px-2 py-0.5 text-[10px] font-semibold text-green-400">
                      Online
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan text-xs font-bold text-white">
                      {c.avatar}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-sm font-semibold text-white">{c.name}</h3>
                      <p className="truncate text-xs text-gray-500">{c.role}</p>
                    </div>
                  </div>

                  <div className="mt-2.5 flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={11} /> {c.location}
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {c.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-md bg-dark-card px-2 py-0.5 text-[10px] font-medium text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-dark-border pt-3 mt-4">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-semibold text-white">{c.rating}</span>
                      <span className="text-xs text-gray-500">({c.reviews})</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-gray-500">From </span>
                      <span className="text-sm font-bold text-white">{c.price}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-20 text-center">
            <p className="text-lg text-gray-500">No creators found.</p>
            <Link to="/creators" className="mt-3 inline-block text-sm text-neon-purple hover:underline">
              Clear filters →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
