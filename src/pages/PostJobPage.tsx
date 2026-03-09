import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  DollarSign,
  Clock,
  FileText,
  Tag,
  MapPin,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { saveJob, subscribeToAuthUser, type SessionUser } from "../lib/firebase";

const categoryOptions = [
  "Video Editing",
  "Videography",
  "Thumbnail Design",
  "Scriptwriting",
  "Motion Graphics",
  "Social Media Management",
  "Voiceover",
  "Cinematography",
  "Graphic Design",
  "Content Strategy",
  "Music Production",
  "Live Streaming",
];

const budgetRanges = [
  "Under ₹1,000",
  "₹1,000 – ₹5,000",
  "₹5,000 – ₹15,000",
  "₹15,000 – ₹50,000",
  "₹50,000+",
  "Open / Negotiable",
];

const deliveryOptions = [
  "1 – 3 days",
  "3 – 7 days",
  "1 – 2 weeks",
  "2 – 4 weeks",
  "Flexible",
];

export default function PostJobPage() {
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [delivery, setDelivery] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => subscribeToAuthUser(setCurrentUser), []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!currentUser) {
      setError("Sign in first to post a job with Firebase.");
      return;
    }

    setIsSubmitting(true);
    const result = await saveJob({
      title: title.trim(),
      description: description.trim(),
      budget,
      category,
      delivery,
      location: location.trim() || "Remote",
      skills: skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      urgent: false,
    }, currentUser);

    if (!result.ok) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    setError("");
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-grid pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass mx-4 max-w-md rounded-2xl p-10 text-center"
        >
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan shadow-lg shadow-neon-purple/25">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold">Job Posted!</h2>
          <p className="mt-3 text-sm text-gray-400">
            Your job is now live. Talented creators will start applying soon. You'll receive notifications when proposals come in.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/jobs"
              className="rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan py-3 text-sm font-semibold text-white shadow-lg shadow-neon-purple/20 transition-all hover:shadow-neon-purple/40"
            >
              View Job Listings
            </Link>
            <Link
              to="/"
              className="rounded-xl border border-dark-border py-3 text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-grid pt-24 pb-20">
      <div className="pointer-events-none absolute left-0 top-20 h-[500px] w-[500px] rounded-full bg-neon-orange/5 blur-[140px]" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <span className="text-sm font-semibold uppercase tracking-widest text-neon-orange">
            Hire Talent
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Post a <span className="text-gradient">Job</span>
          </h1>
          <p className="mt-3 max-w-xl text-gray-400">
            Describe your project and let creators come to you. It only takes a minute.
          </p>
          {!currentUser && (
            <p className="mt-3 text-sm text-neon-cyan">
              Sign in to publish jobs to Firestore.
            </p>
          )}
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-10 space-y-6"
        >
          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Job Title */}
          <div className="glass rounded-2xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-white">
              <Briefcase size={16} className="text-neon-purple" /> Job Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Need a YouTube Video Editor for Weekly Vlogs"
              className="mt-3 w-full rounded-xl bg-dark-card px-4 py-3 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-dark-border transition-all focus:ring-neon-purple/50"
            />
          </div>

          {/* Description */}
          <div className="glass rounded-2xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-white">
              <FileText size={16} className="text-neon-cyan" /> Job Description
            </label>
            <textarea
              required
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your project in detail — what you need, your expectations, style references, etc."
              className="mt-3 w-full resize-none rounded-xl bg-dark-card px-4 py-3 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-dark-border transition-all focus:ring-neon-cyan/50"
            />
          </div>

          {/* Category + Budget row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-white">
                <Tag size={16} className="text-neon-orange" /> Category
              </label>
              <select
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-3 w-full rounded-xl bg-dark-card px-4 py-3 text-sm text-white outline-none ring-1 ring-dark-border transition-all focus:ring-neon-orange/50"
              >
                <option value="">Select a category</option>
                {categoryOptions.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="glass rounded-2xl p-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-white">
                <DollarSign size={16} className="text-neon-pink" /> Budget
              </label>
              <select
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="mt-3 w-full rounded-xl bg-dark-card px-4 py-3 text-sm text-white outline-none ring-1 ring-dark-border transition-all focus:ring-neon-pink/50"
              >
                <option value="">Select budget range</option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Delivery + Location row */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="glass rounded-2xl p-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-white">
                <Clock size={16} className="text-neon-purple" /> Delivery Time
              </label>
              <select
                required
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className="mt-3 w-full rounded-xl bg-dark-card px-4 py-3 text-sm text-white outline-none ring-1 ring-dark-border transition-all focus:ring-neon-purple/50"
              >
                <option value="">Expected delivery</option>
                {deliveryOptions.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="glass rounded-2xl p-6">
              <label className="flex items-center gap-2 text-sm font-semibold text-white">
                <MapPin size={16} className="text-neon-cyan" /> Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Remote, Mumbai, etc."
                className="mt-3 w-full rounded-xl bg-dark-card px-4 py-3 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-dark-border transition-all focus:ring-neon-cyan/50"
              />
            </div>
          </div>

          {/* Skills */}
          <div className="glass rounded-2xl p-6">
            <label className="flex items-center gap-2 text-sm font-semibold text-white">
              <Tag size={16} className="text-neon-orange" /> Required Skills
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              placeholder="e.g., Premiere Pro, After Effects, Color Grading (comma-separated)"
              className="mt-3 w-full rounded-xl bg-dark-card px-4 py-3 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-dark-border transition-all focus:ring-neon-orange/50"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-neon-purple to-neon-cyan py-4 text-base font-semibold text-white shadow-lg shadow-neon-purple/25 transition-all hover:shadow-neon-purple/40"
          >
            {isSubmitting ? "Posting Job..." : "Post Job"} <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
        </motion.form>
      </div>
    </div>
  );
}
