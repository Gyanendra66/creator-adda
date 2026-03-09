import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Target, Globe, Heart } from "lucide-react";

const values = [
  { icon: Users, title: "Creator-First", description: "Everything we build starts with the creator experience. We empower freelancers to showcase their talent and connect with the right clients." },
  { icon: Target, title: "Quality Over Quantity", description: "We focus on curating top-tier content creators rather than flooding the platform with noise. Every profile is verified." },
  { icon: Globe, title: "Accessible Globally", description: "Whether you're in Mumbai, Lagos, or São Paulo — Creator Adda connects talent across borders with localized support." },
  { icon: Heart, title: "Fair & Transparent", description: "No hidden fees, clear commission structures, and transparent dispute resolution. We believe trust is earned." },
];

const stats = [
  { value: "12,000+", label: "Active Creators" },
  { value: "5,000+", label: "Projects Completed" },
  { value: "40+", label: "Countries" },
  { value: "98%", label: "Client Satisfaction" },
];

const team = [
  { name: "Aarav Mehta", role: "Co-Founder & CEO", bio: "Former product lead at a leading social media company. Passionate about empowering creators." },
  { name: "Priya Sharma", role: "Co-Founder & CTO", bio: "Full-stack engineer with 10+ years building marketplace platforms at scale." },
  { name: "Rohan Gupta", role: "Head of Design", bio: "Award-winning designer focused on creating delightful digital experiences." },
  { name: "Ananya Patel", role: "Head of Community", bio: "Community builder who has grown creator networks from zero to 100K+." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">
            About <span className="text-gradient">Creator Adda</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-400">
            We're on a mission to become the go-to freelance marketplace for content creators worldwide.
            Whether you're a videographer, editor, thumbnail artist, or scriptwriter — Creator Adda is
            where your talent meets opportunity.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-20 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((stat, i) => (
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

        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="mb-6 text-center text-3xl font-bold">Our Story</h2>
          <div className="mx-auto max-w-3xl space-y-4 text-gray-400 leading-relaxed">
            <p>
              Creator Adda was born in 2024 from a simple frustration: finding reliable, skilled content
              creators for social media was hard. Generic freelance platforms lumped together every kind
              of freelancer, making it difficult for clients to find exactly the right creative talent.
            </p>
            <p>
              We built Creator Adda to be the niche marketplace that the content creation industry
              deserves — purpose-built for videographers, cinematographers, video editors, thumbnail
              designers, scriptwriters, voiceover artists, and more.
            </p>
            <p>
              Today, we serve thousands of creators and clients across 40+ countries, processing
              millions in creative projects every month. And we're just getting started.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="mb-10 text-center text-3xl font-bold">Our Values</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-dark-border bg-dark-card/60 p-6"
              >
                <v.icon className="mb-3 text-neon-purple" size={28} />
                <h3 className="text-lg font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="mb-10 text-center text-3xl font-bold">Meet the Team</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-dark-border bg-dark-card/60 p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-neon-purple/20 to-neon-cyan/20">
                  <span className="text-2xl font-bold text-neon-purple">
                    {member.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <h4 className="font-semibold text-white">{member.name}</h4>
                <p className="text-sm text-neon-purple">{member.role}</p>
                <p className="mt-2 text-xs text-gray-400 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 rounded-2xl border border-dark-border bg-dark-card/60 p-10 text-center"
        >
          <h2 className="text-2xl font-bold">Ready to Get Started?</h2>
          <p className="mt-3 text-gray-400">Join thousands of creators and clients on Creator Adda.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link to="/creators" className="rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan px-6 py-3 text-sm font-semibold text-white">
              Browse Creators
            </Link>
            <Link to="/careers" className="rounded-xl border border-dark-border px-6 py-3 text-sm font-medium text-white hover:border-neon-purple/50">
              Join Our Team
            </Link>
            <Link to="/blog" className="rounded-xl border border-dark-border px-6 py-3 text-sm font-medium text-white hover:border-neon-cyan/50">
              Read Our Blog
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
