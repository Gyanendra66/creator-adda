import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Typewriter from "./Typewriter";
import AnimatedCounter from "./AnimatedCounter";

const HeroScene = lazy(() => import("./HeroScene"));

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-grid pt-16"
    >
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-neon-purple/10 blur-[120px]" />
        <div className="absolute -right-40 top-60 h-[400px] w-[400px] rounded-full bg-neon-cyan/10 blur-[120px]" />
        <div className="absolute bottom-20 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-neon-orange/8 blur-[100px]" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl flex-col-reverse items-center gap-10 px-4 py-12 lg:flex-row lg:gap-4 lg:py-0">
        {/* Left: Text Content */}
        <div className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-6 flex items-center gap-2 rounded-full border border-neon-purple/20 bg-neon-purple/5 px-4 py-1.5"
          >
            <Sparkles size={14} className="text-neon-purple" />
            <span className="text-xs font-medium text-neon-purple">
              #1 Marketplace for Content Creators
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Find Your{" "}
            <Typewriter />
            <br />
            Match
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="mt-6 max-w-lg text-base leading-relaxed text-gray-400 sm:text-lg"
          >
            The ultimate hub connecting videographers, editors, thumbnail
            artists, and scriptwriters with brands that need them. Powered by
            creators, built for creators.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/jobs"
              className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-neon-purple/25 transition-all hover:shadow-neon-purple/40"
            >
              Find Work
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/creators"
              className="flex items-center gap-2 rounded-xl border border-dark-border bg-dark-card/50 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:border-neon-cyan/50 hover:shadow-lg hover:shadow-neon-cyan/10"
            >
              Hire a Creator
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 flex gap-8 sm:gap-12"
          >
            {[
              { value: 12000, suffix: "+", label: "Creators" },
              { value: 5000, suffix: "+", label: "Projects Done" },
              { value: 98, suffix: "%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-2xl font-bold text-white">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="mt-0.5 text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex h-[350px] w-full flex-1 items-center justify-center sm:h-[450px] lg:h-[550px]"
        >
          <Suspense
            fallback={
              <div className="flex items-center justify-center">
                <div className="h-16 w-16 animate-spin rounded-full border-4 border-neon-purple/30 border-t-neon-purple" />
              </div>
            }
          >
            <HeroScene />
          </Suspense>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="h-10 w-6 rounded-full border-2 border-gray-600 p-1"
        >
          <div className="mx-auto h-2 w-1 rounded-full bg-neon-purple" />
        </motion.div>
      </motion.div>
    </section>
  );
}
