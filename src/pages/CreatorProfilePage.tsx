import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  CheckCircle2,
  MessageSquare,
  Share2,
  Heart,
  ArrowLeft,
  Globe,
  Calendar,
} from "lucide-react";

const creatorsDB: Record<
  number,
  {
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
    bio: string;
    languages: string[];
    memberSince: string;
    responseTime: string;
    completedProjects: number;
    portfolio: string[];
    packages: { name: string; price: string; delivery: string; features: string[] }[];
  }
> = {
  1: {
    name: "Aarav Mehta",
    role: "Cinematic Video Editor",
    rating: 4.9,
    reviews: 234,
    price: "₹2,500",
    avatar: "AM",
    thumbnail: "🎬",
    tags: ["Premiere Pro", "After Effects", "Color Grading", "DaVinci Resolve"],
    online: true,
    location: "Mumbai, India",
    bio: "Professional video editor with 6+ years of experience in cinematic editing, color grading, and post-production. I've worked with top YouTube creators and brands to deliver stunning visual stories. My expertise spans music videos, short films, documentaries, and social media content.",
    languages: ["English", "Hindi", "Marathi"],
    memberSince: "Jan 2024",
    responseTime: "1 hour",
    completedProjects: 312,
    portfolio: ["🎬", "🎞️", "🎥", "📽️", "🎬", "🎞️"],
    packages: [
      { name: "Basic", price: "₹2,500", delivery: "3 days", features: ["Up to 5 min video", "Basic cuts & transitions", "Background music", "1 revision"] },
      { name: "Standard", price: "₹5,000", delivery: "5 days", features: ["Up to 15 min video", "Advanced transitions", "Color grading", "Sound design", "3 revisions"] },
      { name: "Premium", price: "₹12,000", delivery: "7 days", features: ["Unlimited duration", "Cinematic editing", "Pro color grading", "Motion graphics", "SFX", "Unlimited revisions"] },
    ],
  },
  2: {
    name: "Priya Sharma",
    role: "Thumbnail Designer",
    rating: 5.0,
    reviews: 187,
    price: "₹800",
    avatar: "PS",
    thumbnail: "🎨",
    tags: ["Photoshop", "Illustrator", "YouTube", "Canva"],
    online: true,
    location: "Delhi, India",
    bio: "I design thumbnails that stop the scroll. With a deep understanding of YouTube's algorithm and what makes viewers click, I create eye-catching designs that boost CTR. I've helped channels grow from 10K to 1M+ subscribers through strategic thumbnail design.",
    languages: ["English", "Hindi"],
    memberSince: "Mar 2024",
    responseTime: "30 min",
    completedProjects: 520,
    portfolio: ["🎨", "🖼️", "🎨", "🖌️", "🎨", "🖼️"],
    packages: [
      { name: "Basic", price: "₹800", delivery: "1 day", features: ["1 thumbnail", "High resolution", "1 revision"] },
      { name: "Standard", price: "₹2,000", delivery: "2 days", features: ["3 thumbnails", "A/B testing variants", "High resolution", "3 revisions"] },
      { name: "Premium", price: "₹5,000", delivery: "3 days", features: ["10 thumbnails", "Channel branding", "A/B variants", "Unlimited revisions", "Priority support"] },
    ],
  },
  3: {
    name: "Rohan Kapoor",
    role: "Videographer & DOP",
    rating: 4.8,
    reviews: 142,
    price: "₹5,000",
    avatar: "RK",
    thumbnail: "📹",
    tags: ["Sony A7IV", "Drone Shots", "Weddings", "Corporate"],
    online: false,
    location: "Bangalore, India",
    bio: "Experienced cinematographer specializing in wedding films, corporate videos, and brand content. I bring my own professional gear including Sony A7IV, gimbals, drones, and lighting kits. Every frame tells a story.",
    languages: ["English", "Hindi", "Kannada"],
    memberSince: "Jun 2024",
    responseTime: "2 hours",
    completedProjects: 89,
    portfolio: ["📹", "🎥", "📹", "🎬", "📹", "🎥"],
    packages: [
      { name: "Basic", price: "₹5,000", delivery: "5 days", features: ["2 hour shoot", "Raw footage delivery", "Basic equipment"] },
      { name: "Standard", price: "₹15,000", delivery: "7 days", features: ["Full day shoot", "Edited highlights", "Drone shots", "Professional lighting"] },
      { name: "Premium", price: "₹35,000", delivery: "14 days", features: ["Multi-day shoot", "Full cinematic edit", "Drone + gimbal", "Color grading", "Licensed music"] },
    ],
  },
};

// Fallback for IDs not in DB
function getCreator(id: number) {
  return (
    creatorsDB[id] || {
      name: "Creator",
      role: "Creative Professional",
      rating: 4.8,
      reviews: 100,
      price: "₹2,000",
      avatar: "CA",
      thumbnail: "🎬",
      tags: ["Creative", "Professional"],
      online: false,
      location: "India",
      bio: "A talented creative professional ready to bring your vision to life.",
      languages: ["English", "Hindi"],
      memberSince: "2024",
      responseTime: "2 hours",
      completedProjects: 50,
      portfolio: ["🎬", "🎞️", "🎥", "📽️"],
      packages: [
        { name: "Basic", price: "₹2,000", delivery: "3 days", features: ["Standard delivery", "1 revision"] },
        { name: "Standard", price: "₹5,000", delivery: "5 days", features: ["Priority delivery", "3 revisions"] },
        { name: "Premium", price: "₹10,000", delivery: "7 days", features: ["VIP experience", "Unlimited revisions"] },
      ],
    }
  );
}

export default function CreatorProfilePage() {
  const { id } = useParams();
  const creator = getCreator(Number(id));
  const [liked, setLiked] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  const handleShare = async () => {
    const shareData = {
      title: `${creator.name} on Creator Adda`,
      text: `Check out ${creator.name}, ${creator.role}.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setActionMessage("Profile shared.");
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setActionMessage("Profile link copied.");
      }
    } catch {
      setActionMessage("Unable to share right now.");
    }
  };

  return (
    <div className="min-h-screen bg-grid pt-24 pb-20">
      <div className="pointer-events-none absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-neon-purple/5 blur-[160px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/creators" className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white">
            <ArrowLeft size={16} /> Back to Creators
          </Link>
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left — Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Profile Header Card */}
            <div className="glass rounded-2xl p-6 sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="relative">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan text-2xl font-bold text-white shadow-lg shadow-neon-purple/20">
                    {creator.avatar}
                  </div>
                  {creator.online && (
                    <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-[3px] border-dark-card bg-green-500" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="font-display text-2xl font-bold sm:text-3xl">{creator.name}</h1>
                    <span className="rounded-full bg-neon-purple/10 px-3 py-0.5 text-xs font-semibold text-neon-purple">
                      Top Rated
                    </span>
                  </div>
                  <p className="mt-1 text-gray-400">{creator.role}</p>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} /> {creator.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe size={13} /> {creator.languages.join(", ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={13} /> Member since {creator.memberSince}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {creator.tags.map((tag) => (
                      <span key={tag} className="rounded-lg bg-dark-card px-3 py-1 text-xs font-medium text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                  <button onClick={() => { setLiked((value) => !value); setActionMessage(liked ? "Removed from favorites." : "Saved to favorites."); }} className={`rounded-lg border border-dark-border p-2.5 transition-colors hover:border-neon-purple/50 hover:text-white ${liked ? "text-neon-pink" : "text-gray-400"}`}>
                    <Heart size={18} />
                  </button>
                  <button onClick={handleShare} className="rounded-lg border border-dark-border p-2.5 text-gray-400 transition-colors hover:border-neon-purple/50 hover:text-white">
                    <Share2 size={18} />
                  </button>
                  </div>
                  {actionMessage && <span className="text-xs text-gray-500">{actionMessage}</span>}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Rating", value: `${creator.rating} ★`, accent: "text-yellow-500" },
                { label: "Reviews", value: creator.reviews.toString(), accent: "text-neon-purple" },
                { label: "Completed", value: creator.completedProjects.toString(), accent: "text-neon-cyan" },
                { label: "Avg. Response", value: creator.responseTime, accent: "text-neon-orange" },
              ].map((stat) => (
                <div key={stat.label} className="glass rounded-xl p-4 text-center">
                  <div className={`font-display text-xl font-bold ${stat.accent}`}>{stat.value}</div>
                  <div className="mt-1 text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* About */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold">About</h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">{creator.bio}</p>
            </div>

            {/* Portfolio */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold">Portfolio</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {creator.portfolio.map((item, i) => (
                  <div
                    key={i}
                    className="flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-dark-card to-dark-hover text-4xl transition-all hover:scale-[1.02]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="glass rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold">
                Reviews <span className="text-gray-500">({creator.reviews})</span>
              </h2>
              <div className="mt-4 space-y-4">
                {[
                  { name: "Raj K.", text: "Absolutely incredible work! The editing quality exceeded my expectations. Will hire again.", rating: 5 },
                  { name: "Simran P.", text: "Fast delivery and very professional communication throughout the project.", rating: 5 },
                  { name: "Aditya M.", text: "Great attention to detail. The color grading was perfect for our brand.", rating: 4 },
                ].map((review) => (
                  <div key={review.name} className="border-b border-dark-border pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{review.name}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: review.rating }).map((_, j) => (
                          <Star key={j} size={11} className="fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Pricing Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="space-y-5"
          >
            {creator.packages.map((pkg, i) => (
              <div
                key={pkg.name}
                className={`glass rounded-2xl p-6 transition-all ${i === 1 ? "ring-2 ring-neon-purple/40 shadow-lg shadow-neon-purple/10" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-bold">{pkg.name}</h3>
                  <span className="font-display text-xl font-bold text-neon-purple">{pkg.price}</span>
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                  <Clock size={12} /> {pkg.delivery} delivery
                </div>
                <ul className="mt-4 space-y-2">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-400">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-neon-cyan" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className="mt-5 block w-full rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan py-3 text-center text-sm font-semibold text-white shadow-lg shadow-neon-purple/20 transition-all hover:shadow-neon-purple/40"
                >
                  Continue ({pkg.price})
                </Link>
              </div>
            ))}

            {/* Contact */}
            <div className="glass rounded-2xl p-6 text-center">
              <Link
                to="/register"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-dark-border bg-dark-card py-3 text-sm font-medium text-white transition-all hover:border-neon-cyan/50"
              >
                <MessageSquare size={16} /> Contact Me
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
