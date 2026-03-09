import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";

const openings = [
  { title: "Senior Frontend Engineer", team: "Engineering", location: "Remote (India)", type: "Full-time", description: "Build and ship delightful UI features for our creator marketplace using React, TypeScript, and Tailwind CSS." },
  { title: "Backend Engineer", team: "Engineering", location: "Bangalore, India", type: "Full-time", description: "Design and implement scalable APIs and services powering millions of creator transactions." },
  { title: "Product Designer", team: "Design", location: "Remote", type: "Full-time", description: "Craft beautiful, intuitive experiences for creators and clients across web and mobile." },
  { title: "Community Manager", team: "Growth", location: "Mumbai, India", type: "Full-time", description: "Grow and nurture our creator community through events, content, and partnerships." },
  { title: "Content Marketing Lead", team: "Marketing", location: "Remote (India)", type: "Full-time", description: "Drive our content strategy across blog, social media, and creator success stories." },
  { title: "Customer Support Specialist", team: "Support", location: "Remote", type: "Full-time", description: "Help creators and clients resolve issues with empathy and efficiency." },
];

const perks = [
  "Competitive salary + equity",
  "Flexible remote work",
  "Health insurance for you & family",
  "Learning & development budget",
  "Unlimited PTO",
  "Home office setup allowance",
];

export default function CareersPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">
            Join <span className="text-gradient">Creator Adda</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Help us build the future of the creator economy. We're looking for passionate
            people who want to empower content creators worldwide.
          </p>
        </motion.div>

        {/* Perks */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-16 rounded-2xl border border-dark-border bg-dark-card/60 p-8"
        >
          <h2 className="mb-6 text-xl font-bold">Why Work With Us?</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-3 text-sm text-gray-300">
                <div className="h-2 w-2 shrink-0 rounded-full bg-neon-purple" />
                {perk}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Open Positions */}
        <h2 className="mb-8 text-2xl font-bold">Open Positions</h2>
        <div className="space-y-4">
          {openings.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="group flex flex-col justify-between gap-4 rounded-xl border border-dark-border bg-dark-card/60 p-6 transition-all hover:border-neon-purple/30 sm:flex-row sm:items-center"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white group-hover:text-neon-purple transition-colors">
                  {job.title}
                </h3>
                <p className="mt-1 text-sm text-gray-400">{job.description}</p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Briefcase size={12} /> {job.team}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin size={12} /> {job.location}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock size={12} /> {job.type}
                  </span>
                </div>
              </div>
              <a
                href={`mailto:careers@creatoradda.com?subject=${encodeURIComponent(`Application: ${job.title}`)}`}
                className="flex shrink-0 items-center gap-2 rounded-lg border border-dark-border px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-neon-purple/50 hover:text-neon-purple"
              >
                Apply <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>

        {/* About Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-dark-border bg-dark-card/60 p-8 text-center"
        >
          <p className="text-gray-400">Want to learn more about who we are?</p>
          <Link to="/about" className="mt-4 inline-block rounded-xl border border-dark-border px-6 py-3 text-sm font-medium text-white hover:border-neon-purple/50">
            About Creator Adda
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
