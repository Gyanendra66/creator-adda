import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "10 Tips to Stand Out as a Freelance Video Editor in 2026",
    excerpt: "The freelance video editing market is more competitive than ever. Here's how to differentiate yourself and land premium clients.",
    category: "Creator Tips",
    date: "Mar 5, 2026",
    readTime: "6 min read",
    featured: true,
  },
  {
    title: "How Creator Adda Helped Me Quit My 9-to-5",
    excerpt: "Priya, a thumbnail designer from Pune, shares her journey from corporate job to full-time freelancing on Creator Adda.",
    category: "Success Stories",
    date: "Mar 2, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    title: "The Rise of Short-Form Content: What It Means for Creators",
    excerpt: "With Reels, Shorts, and TikTok dominating, short-form content creators are in higher demand than ever.",
    category: "Industry Trends",
    date: "Feb 28, 2026",
    readTime: "5 min read",
    featured: false,
  },
  {
    title: "Pricing Your Creative Services: A Complete Guide",
    excerpt: "Struggling to price your work? Learn proven strategies for setting rates that reflect your value.",
    category: "Creator Tips",
    date: "Feb 24, 2026",
    readTime: "7 min read",
    featured: false,
  },
  {
    title: "New Feature: AI-Powered Portfolio Scoring",
    excerpt: "We've launched portfolio scoring to help creators optimize their profiles and attract more clients.",
    category: "Product Updates",
    date: "Feb 20, 2026",
    readTime: "3 min read",
    featured: false,
  },
  {
    title: "Building Trust Online: How to Get Your First 5-Star Review",
    excerpt: "First impressions matter. Here's how to deliver an exceptional experience and build your reputation.",
    category: "Creator Tips",
    date: "Feb 16, 2026",
    readTime: "5 min read",
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  "Creator Tips": "text-neon-cyan bg-neon-cyan/10",
  "Success Stories": "text-neon-purple bg-neon-purple/10",
  "Industry Trends": "text-neon-orange bg-neon-orange/10",
  "Product Updates": "text-green-400 bg-green-400/10",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">
            Creator Adda <span className="text-gradient">Blog</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Tips, stories, and insights for content creators and clients.
          </p>
        </motion.div>

        {/* Featured Posts */}
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          {posts.filter(p => p.featured).map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="group cursor-pointer rounded-2xl border border-dark-border bg-dark-card/60 p-8 transition-all hover:border-neon-purple/30"
            >
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[post.category] || "text-gray-400 bg-gray-400/10"}`}>
                {post.category}
              </span>
              <h2 className="mt-4 text-xl font-bold text-white group-hover:text-neon-purple transition-colors">
                {post.title}
              </h2>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                </div>
                <span className="flex items-center gap-1 text-sm font-medium text-neon-purple opacity-0 transition-opacity group-hover:opacity-100">
                  Read <ArrowRight size={14} />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* All Posts */}
        <h2 className="mb-8 text-2xl font-bold">All Posts</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.filter(p => !p.featured).map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer rounded-xl border border-dark-border bg-dark-card/60 p-6 transition-all hover:border-neon-purple/30"
            >
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[post.category] || "text-gray-400 bg-gray-400/10"}`}>
                {post.category}
              </span>
              <h3 className="mt-3 font-semibold text-white group-hover:text-neon-purple transition-colors">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-gray-400 line-clamp-2">{post.excerpt}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-dark-border bg-dark-card/60 p-10 text-center"
        >
          <h2 className="text-xl font-bold">Ready to start your creator journey?</h2>
          <p className="mt-2 text-sm text-gray-400">Join Creator Adda and turn your passion into profession.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan px-6 py-3 text-sm font-semibold text-white">
              Sign Up Free
            </Link>
            <Link to="/creators" className="rounded-xl border border-dark-border px-6 py-3 text-sm font-medium text-white hover:border-neon-purple/50">
              Browse Creators
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
