import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-grid px-4 pt-24 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass max-w-lg rounded-3xl p-10 text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neon-cyan">404</p>
        <h1 className="mt-4 font-display text-4xl font-bold text-white">Page not found</h1>
        <p className="mt-4 text-sm leading-relaxed text-gray-400">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan px-6 py-3 text-sm font-semibold text-white"
          >
            Go Home
          </Link>
          <Link
            to="/search"
            className="rounded-xl border border-dark-border px-6 py-3 text-sm font-medium text-white transition-colors hover:border-neon-purple/50"
          >
            Search Platform
          </Link>
        </div>
      </motion.div>
    </div>
  );
}