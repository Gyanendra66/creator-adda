import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, Star, MapPin, SlidersHorizontal, X } from "lucide-react";
import { subscribeToJobs, type StoredJob } from "../lib/firebase";

interface Result {
  id: number | string;
  type: "creator" | "job";
  title: string;
  subtitle: string;
  rating?: number;
  price: string;
  tags: string[];
  emoji: string;
  location: string;
}

const allResults: Result[] = [
  { id: 1, type: "creator", title: "Aarav Mehta", subtitle: "Cinematic Video Editor", rating: 4.9, price: "₹2,500", tags: ["Premiere Pro", "After Effects"], emoji: "🎬", location: "Mumbai" },
  { id: 2, type: "creator", title: "Priya Sharma", subtitle: "Thumbnail Designer", rating: 5.0, price: "₹800", tags: ["Photoshop", "YouTube"], emoji: "🎨", location: "Delhi" },
  { id: 3, type: "job", title: "Need YouTube Thumbnail Designer", subtitle: "10 thumbnails for gaming channel", price: "₹5,000", tags: ["Photoshop", "Gaming"], emoji: "🎮", location: "Remote" },
  { id: 4, type: "creator", title: "Rohan Kapoor", subtitle: "Videographer & DOP", rating: 4.8, price: "₹5,000", tags: ["Sony A7IV", "Weddings"], emoji: "📹", location: "Bangalore" },
  { id: 5, type: "job", title: "Video Editor for Travel Vlogs", subtitle: "Edit 10 travel vlog episodes", price: "₹15,000", tags: ["DaVinci Resolve", "Travel"], emoji: "✈️", location: "Remote" },
  { id: 6, type: "creator", title: "Ananya Reddy", subtitle: "Scriptwriter & Copywriter", rating: 4.9, price: "₹1,200", tags: ["YouTube Scripts", "Storytelling"], emoji: "✍️", location: "Hyderabad" },
  { id: 7, type: "job", title: "Scriptwriter for Product Ads", subtitle: "Write scripts for 5 product ads", price: "₹8,000", tags: ["Ad Copy", "Branding"], emoji: "📝", location: "Remote" },
  { id: 8, type: "creator", title: "Vikram Patel", subtitle: "Cinematographer", rating: 4.9, price: "₹8,000", tags: ["RED Camera", "Short Films"], emoji: "🎥", location: "Mumbai" },
  { id: 9, type: "job", title: "Looking for Motion Graphics Artist", subtitle: "Animated intro and outro for tech channel", price: "₹4,000", tags: ["After Effects", "Motion Graphics"], emoji: "🎞️", location: "Remote" },
  { id: 10, type: "creator", title: "Meera Joshi", subtitle: "Social Media Manager", rating: 4.8, price: "₹4,000", tags: ["Reels", "Growth"], emoji: "📱", location: "Mumbai" },
];

const typeFilters = ["All", "Creators", "Jobs"] as const;

function getBudgetValue(price: string) {
  const values = price.match(/\d[\d,]*/g)?.map((value) => Number(value.replace(/,/g, ""))) ?? [0];
  return Math.max(...values);
}

function mapStoredJobToResult(job: StoredJob): Result {
  return {
    id: job.id,
    type: "job",
    title: job.title,
    subtitle: job.description,
    price: job.budget,
    tags: job.skills,
    emoji: "💼",
    location: job.location,
  };
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState<(typeof typeFilters)[number]>("All");
  const [showFilters, setShowFilters] = useState(false);
  const [budgetFilter, setBudgetFilter] = useState("Any Budget");
  const [ratingFilter, setRatingFilter] = useState("Any Rating");
  const [locationFilter, setLocationFilter] = useState("Anywhere");
  const [results, setResults] = useState<Result[]>(allResults);

  useEffect(() => {
    return subscribeToJobs((jobs) => setResults([...allResults, ...jobs.map(mapStoredJobToResult)]));
  }, []);

  const filtered = results.filter((r) => {
    const matchesType =
      typeFilter === "All" ||
      (typeFilter === "Creators" && r.type === "creator") ||
      (typeFilter === "Jobs" && r.type === "job");

    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      r.title.toLowerCase().includes(q) ||
      r.subtitle.toLowerCase().includes(q) ||
      r.tags.some((t) => t.toLowerCase().includes(q));

    const matchesBudget =
      budgetFilter === "Any Budget" ||
      (budgetFilter === "Under ₹1,000" && getBudgetValue(r.price) < 1000) ||
      (budgetFilter === "₹1,000 - ₹5,000" && getBudgetValue(r.price) >= 1000 && getBudgetValue(r.price) <= 5000) ||
      (budgetFilter === "₹5,000 - ₹20,000" && getBudgetValue(r.price) >= 5000 && getBudgetValue(r.price) <= 20000) ||
      (budgetFilter === "₹20,000+" && getBudgetValue(r.price) >= 20000);

    const matchesRating =
      ratingFilter === "Any Rating" ||
      (ratingFilter === "4.5+ Stars" && (r.rating ?? 0) >= 4.5) ||
      (ratingFilter === "4.0+ Stars" && (r.rating ?? 0) >= 4.0) ||
      (ratingFilter === "3.5+ Stars" && (r.rating ?? 0) >= 3.5);

    const matchesLocation =
      locationFilter === "Anywhere" || r.location.toLowerCase().includes(locationFilter.toLowerCase());

    return matchesType && matchesQuery && matchesBudget && matchesRating && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-grid pt-24 pb-20">
      <div className="pointer-events-none absolute left-0 top-20 h-[400px] w-[400px] rounded-full bg-neon-cyan/5 blur-[150px]" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="font-display text-3xl font-bold sm:text-4xl">
            <span className="text-gradient">Search</span>
          </h1>
          <p className="mt-2 text-gray-400">Find creators, jobs, and services across the platform.</p>
        </motion.div>

        {/* Search input */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mt-8"
        >
          <div className="glass flex items-center gap-3 rounded-2xl px-5 py-4">
            <SearchIcon size={20} className="text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search creators, jobs, skills, tools..."
              className="flex-1 bg-transparent text-base text-white placeholder-gray-500 outline-none"
              autoFocus
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-gray-500 hover:text-white">
                <X size={18} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6 flex items-center justify-between"
        >
          <div className="flex gap-2">
            {typeFilters.map((f) => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`rounded-lg px-4 py-2 text-xs font-medium transition-all ${
                  typeFilter === f
                    ? "bg-neon-purple/20 text-neon-purple"
                    : "glass text-gray-400 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-gray-400 transition-colors hover:text-white"
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
        </motion.div>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="glass mt-4 overflow-hidden rounded-xl p-5"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="text-xs font-semibold text-gray-400">Budget Range</label>
                <select value={budgetFilter} onChange={(e) => setBudgetFilter(e.target.value)} className="mt-1.5 w-full rounded-lg bg-dark-card px-3 py-2 text-sm text-white outline-none">
                  <option>Any Budget</option>
                  <option>Under ₹1,000</option>
                  <option>₹1,000 - ₹5,000</option>
                  <option>₹5,000 - ₹20,000</option>
                  <option>₹20,000+</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400">Rating</label>
                <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)} className="mt-1.5 w-full rounded-lg bg-dark-card px-3 py-2 text-sm text-white outline-none">
                  <option>Any Rating</option>
                  <option>4.5+ Stars</option>
                  <option>4.0+ Stars</option>
                  <option>3.5+ Stars</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-400">Location</label>
                <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="mt-1.5 w-full rounded-lg bg-dark-card px-3 py-2 text-sm text-white outline-none">
                  <option>Anywhere</option>
                  <option>Remote</option>
                  <option>Mumbai</option>
                  <option>Delhi</option>
                  <option>Bangalore</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results */}
        <div className="mt-8 space-y-4">
          <p className="text-sm text-gray-500">{filtered.length} results found</p>

          {filtered.map((r, i) => (
            <motion.div
              key={`${r.type}-${r.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.4 }}
            >
              <Link
                to={r.type === "creator" ? `/creator/${r.id}` : "/jobs"}
                className="glass group flex items-center gap-5 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-neon-purple/10"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-dark-card to-dark-hover text-2xl">
                  {r.emoji}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate text-sm font-semibold text-white">{r.title}</h3>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${r.type === "creator" ? "bg-neon-purple/10 text-neon-purple" : "bg-neon-orange/10 text-neon-orange"}`}>
                      {r.type === "creator" ? "Creator" : "Job"}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-gray-500">{r.subtitle}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {r.tags.map((tag) => (
                      <span key={tag} className="rounded-md bg-dark-card px-2 py-0.5 text-[10px] text-gray-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  {r.rating && (
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-yellow-500 text-yellow-500" />
                      <span className="text-xs font-semibold text-white">{r.rating}</span>
                    </div>
                  )}
                  <div className="mt-1 text-sm font-bold text-white">{r.price}</div>
                  <div className="mt-0.5 flex items-center gap-1 text-[10px] text-gray-500">
                    <MapPin size={10} /> {r.location}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="mt-12 text-center text-gray-500">
              <p className="text-lg">No results found for "{query}"</p>
              <p className="mt-2 text-sm">Try different keywords or clear your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
