import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ExternalLink, Download } from "lucide-react";

const pressReleases = [
  { title: "Creator Adda Raises ₹50 Crore Series A to Expand Creator Marketplace", date: "Feb 15, 2026", source: "TechCrunch India", href: "https://techcrunch.com" },
  { title: "Creator Adda Crosses 12,000 Active Creators in First Year", date: "Jan 20, 2026", source: "YourStory", href: "https://yourstory.com" },
  { title: "How Creator Adda Is Disrupting the Freelance Content Creation Market", date: "Dec 10, 2025", source: "Economic Times", href: "https://economictimes.indiatimes.com" },
  { title: "Creator Adda Launches AI-Powered Portfolio Scoring for Creators", date: "Nov 5, 2025", source: "Inc42", href: "https://inc42.com" },
  { title: "Creator Adda Partners with Major YouTube Creators for Exclusive Talent Pool", date: "Oct 1, 2025", source: "Entrepreneur India", href: "https://www.entrepreneur.com/en-in" },
];

const coverageStats = [
  { value: "50+", label: "Press Mentions" },
  { value: "20+", label: "Media Partners" },
  { value: "5", label: "Awards Won" },
];

export default function PressPage() {
  const pressKitHref = `data:text/plain;charset=utf-8,${encodeURIComponent(
    "Creator Adda Press Kit\n\nBrand name: Creator Adda\nTagline: The freelance marketplace for content creators\nPress contact: press@creatoradda.com\nWebsite: https://creatoradda.com",
  )}`;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">
            <span className="text-gradient">Press</span> & Media
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Latest news and media coverage about Creator Adda.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-16 grid grid-cols-3 gap-6">
          {coverageStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-dark-border bg-dark-card/60 p-6 text-center"
            >
              <div className="text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Press Kit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16 rounded-2xl border border-dark-border bg-dark-card/60 p-8"
        >
          <h2 className="mb-4 text-xl font-bold">Press Kit</h2>
          <p className="mb-6 text-sm text-gray-400">
            Download our brand assets, logos, and media kit for press coverage.
          </p>
          <a href={pressKitHref} download="creator-adda-press-kit.txt" className="flex w-fit items-center gap-2 rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan px-5 py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-neon-purple/25">
            <Download size={16} /> Download Press Kit
          </a>
        </motion.div>

        {/* Press Releases */}
        <h2 className="mb-8 text-2xl font-bold">Press Releases</h2>
        <div className="space-y-4">
          {pressReleases.map((pr, i) => (
            <motion.div
              key={pr.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="group flex flex-col justify-between gap-4 rounded-xl border border-dark-border bg-dark-card/60 p-6 transition-all hover:border-neon-purple/30 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="font-semibold text-white group-hover:text-neon-purple transition-colors">
                  {pr.title}
                </h3>
                <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
                  <span>{pr.date}</span>
                  <span className="text-neon-cyan">{pr.source}</span>
                </div>
              </div>
              <a href={pr.href} target="_blank" rel="noreferrer" className="flex shrink-0 items-center gap-1 text-sm text-gray-400 hover:text-neon-purple transition-colors">
                Read <ExternalLink size={14} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-dark-border bg-dark-card/60 p-8 text-center"
        >
          <h2 className="mb-2 text-xl font-bold">Media Inquiries</h2>
          <p className="mb-4 text-sm text-gray-400">
            For press inquiries, interviews, or partnership opportunities:
          </p>
          <p className="text-neon-purple font-medium">press@creatoradda.com</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link to="/about" className="text-sm text-gray-400 underline underline-offset-4 hover:text-neon-purple">About Us</Link>
            <span className="text-dark-border">|</span>
            <Link to="/blog" className="text-sm text-gray-400 underline underline-offset-4 hover:text-neon-purple">Blog</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
