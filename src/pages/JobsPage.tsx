import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Clock, DollarSign, MapPin, Tag, Users, ChevronDown } from "lucide-react";
import { subscribeToJobs, type StoredJob } from "../lib/firebase";

interface Job {
  id: number | string;
  title: string;
  description: string;
  budget: string;
  category: string;
  delivery: string;
  location: string;
  skills: string[];
  proposals: number;
  postedAgo: string;
  urgent: boolean;
  source?: "seed" | "custom";
}

const seedJobs: Job[] = [
  {
    id: 1,
    title: "YouTube Video Editor for Weekly Vlogs",
    description: "Looking for an experienced editor to handle weekly vlogs (10–15 min each). Must know Premiere Pro, be great with pacing, and deliver within 48 hours.",
    budget: "₹3,000 – ₹5,000",
    category: "Video Editing",
    delivery: "3 days",
    location: "Remote",
    skills: ["Premiere Pro", "Color Grading", "Sound Mixing"],
    proposals: 12,
    postedAgo: "2 hours ago",
    urgent: true,
  },
  {
    id: 2,
    title: "Thumbnail Designer for Gaming Channel",
    description: "Need 10 click-worthy thumbnails per month for a gaming channel. Bold colors, clean text, and high energy vibes. Long-term collaboration possible.",
    budget: "₹5,000 / month",
    category: "Thumbnail Design",
    delivery: "1 week",
    location: "Remote",
    skills: ["Photoshop", "Gaming", "Typography"],
    proposals: 24,
    postedAgo: "5 hours ago",
    urgent: false,
  },
  {
    id: 3,
    title: "Cinematographer for Brand Shoot in Mumbai",
    description: "Shooting a 2-day brand campaign for a fashion label. Need own gear (camera, lenses, lighting). Experience with lifestyle/fashion content preferred.",
    budget: "₹25,000 – ₹40,000",
    category: "Cinematography",
    delivery: "2 weeks",
    location: "Mumbai",
    skills: ["Sony/Canon", "Lighting", "Fashion"],
    proposals: 8,
    postedAgo: "1 day ago",
    urgent: false,
  },
  {
    id: 4,
    title: "Scriptwriter for Product Launch Ads",
    description: "Write 5 short ad scripts (30–60 sec each) for a tech product launch on Instagram & YouTube. Tone: energetic, modern, Gen-Z friendly.",
    budget: "₹8,000",
    category: "Scriptwriting",
    delivery: "5 days",
    location: "Remote",
    skills: ["Ad Copy", "Storytelling", "Social Media"],
    proposals: 18,
    postedAgo: "4 hours ago",
    urgent: true,
  },
  {
    id: 5,
    title: "Motion Graphics for Tech YouTube Channel",
    description: "Create animated intros, outros, and lower thirds package for a tech review channel. Modern, clean aesthetic with neon accents.",
    budget: "₹10,000 – ₹15,000",
    category: "Motion Graphics",
    delivery: "1 week",
    location: "Remote",
    skills: ["After Effects", "Cinema 4D", "Motion Design"],
    proposals: 6,
    postedAgo: "12 hours ago",
    urgent: false,
  },
  {
    id: 6,
    title: "Voiceover for Hindi Educational Videos",
    description: "Need a warm, professional Hindi voiceover for a series of 20 educational videos (5–8 min each). Clear pronunciation essential.",
    budget: "₹15,000",
    category: "Voiceover",
    delivery: "2 weeks",
    location: "Remote",
    skills: ["Hindi", "Clear Diction", "Audio Recording"],
    proposals: 31,
    postedAgo: "3 hours ago",
    urgent: false,
  },
  {
    id: 7,
    title: "Social Media Manager for D2C Brand",
    description: "Manage Instagram and YouTube for a D2C beauty brand. Content planning, posting schedule, engagement, and monthly analytics reports.",
    budget: "₹20,000 / month",
    category: "Social Media Management",
    delivery: "Ongoing",
    location: "Remote",
    skills: ["Instagram", "YouTube", "Analytics", "Canva"],
    proposals: 15,
    postedAgo: "6 hours ago",
    urgent: true,
  },
  {
    id: 8,
    title: "Wedding Film Editor",
    description: "Edit a full wedding film (highlights + full ceremony) from 6 hours of raw footage. We provide a style guide and music selections.",
    budget: "₹12,000",
    category: "Video Editing",
    delivery: "10 days",
    location: "Remote",
    skills: ["DaVinci Resolve", "Cinematic", "Audio Sync"],
    proposals: 9,
    postedAgo: "1 day ago",
    urgent: false,
  },
];

const categoryFilters = ["All", "Video Editing", "Thumbnail Design", "Cinematography", "Scriptwriting", "Motion Graphics", "Voiceover", "Social Media Management"];
const sortOptions = ["Newest", "Most Proposals", "Budget: High to Low", "Budget: Low to High"];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

function getBudgetValue(budget: string) {
  const values = budget.match(/\d[\d,]*/g)?.map((value) => Number(value.replace(/,/g, ""))) ?? [0];
  return Math.max(...values);
}

export default function JobsPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sort, setSort] = useState("Newest");
  const [showSort, setShowSort] = useState(false);
  const [customJobs, setCustomJobs] = useState<StoredJob[]>([]);

  useEffect(() => {
    return subscribeToJobs(setCustomJobs);
  }, []);

  const jobs: Job[] = [...customJobs, ...seedJobs];

  let filtered = categoryFilter === "All" ? jobs : jobs.filter((j) => j.category === categoryFilter);

  if (sort === "Most Proposals") filtered = [...filtered].sort((a, b) => b.proposals - a.proposals);
  if (sort === "Budget: High to Low") filtered = [...filtered].sort((a, b) => getBudgetValue(b.budget) - getBudgetValue(a.budget));
  if (sort === "Budget: Low to High") filtered = [...filtered].sort((a, b) => getBudgetValue(a.budget) - getBudgetValue(b.budget));

  return (
    <div className="min-h-screen bg-grid pt-24 pb-20">
      <div className="pointer-events-none absolute -right-20 top-40 h-[500px] w-[500px] rounded-full bg-neon-purple/5 blur-[160px]" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <span className="text-sm font-semibold uppercase tracking-widest text-neon-cyan">
              Find Work
            </span>
            <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
              Job <span className="text-gradient">Listings</span>
            </h1>
            <p className="mt-2 text-gray-400">{filtered.length} open opportunities for creators.</p>
          </div>
          <Link
            to="/post-job"
            className="rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neon-purple/20 transition-all hover:shadow-neon-purple/40"
          >
            + Post a Job
          </Link>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                  categoryFilter === cat
                    ? "bg-neon-purple/20 text-neon-purple"
                    : "glass text-gray-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="glass flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium text-gray-300 hover:text-white"
            >
              {sort} <ChevronDown size={14} />
            </button>
            {showSort && (
              <div className="glass-strong absolute right-0 z-20 mt-2 w-48 rounded-xl py-1 shadow-xl">
                {sortOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSort(opt); setShowSort(false); }}
                    className={`block w-full px-4 py-2 text-left text-xs hover:bg-dark-hover ${sort === opt ? "text-neon-purple" : "text-gray-400"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Job cards */}
        <motion.div variants={container} initial="hidden" animate="show" className="mt-8 space-y-4">
          {filtered.map((job) => (
            <motion.div key={job.id} variants={item}>
              <div className="glass group rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:shadow-neon-purple/10">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-bold text-white">{job.title}</h3>
                      {job.urgent && (
                        <span className="rounded-full bg-neon-orange/15 px-2.5 py-0.5 text-[10px] font-bold text-neon-orange">
                          URGENT
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-gray-500 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {job.skills.map((skill) => (
                        <span key={skill} className="rounded-md bg-dark-card px-2.5 py-0.5 text-[10px] font-medium text-gray-400">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><DollarSign size={12} /> {job.budget}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {job.delivery}</span>
                      <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                      <span className="flex items-center gap-1"><Tag size={12} /> {job.category}</span>
                      <span className="flex items-center gap-1"><Users size={12} /> {job.proposals} proposals</span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <span className="text-xs text-gray-600">{job.postedAgo}</span>
                    <Link
                      to="/register"
                      className="rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-neon-purple/20 transition-all hover:shadow-neon-purple/40"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="mt-16 text-center text-gray-500">
            <p className="text-lg">No jobs found in this category.</p>
            <button onClick={() => setCategoryFilter("All")} className="mt-3 text-sm text-neon-purple hover:underline">
              View all jobs →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
