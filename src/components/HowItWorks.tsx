import { motion, type Variants } from "framer-motion";
import { UserPlus, LayoutList, BadgeDollarSign } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Register for Free",
    description:
      "Create your profile in seconds. Showcase your portfolio, set your rates, and tell the world what you do best.",
    color: "from-neon-purple to-neon-pink",
    glowColor: "shadow-neon-purple/20",
    borderColor: "border-neon-purple/30",
  },
  {
    icon: LayoutList,
    step: "02",
    title: "List Services or Post a Job",
    description:
      "Creators list their services with packages & pricing. Clients post jobs with budgets and timelines.",
    color: "from-neon-cyan to-neon-purple",
    glowColor: "shadow-neon-cyan/20",
    borderColor: "border-neon-cyan/30",
  },
  {
    icon: BadgeDollarSign,
    step: "03",
    title: "Collaborate & Get Paid",
    description:
      "Chat in real-time, share files, track milestones, and receive secure payments upon delivery.",
    color: "from-neon-orange to-neon-cyan",
    glowColor: "shadow-neon-orange/20",
    borderColor: "border-neon-orange/30",
  },
];

const lineVariant: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] } },
};

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-dark-card/30 py-24 sm:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-neon-cyan/5 blur-[160px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-neon-cyan">
            Simple Process
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            How <span className="text-gradient">It Works</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-400">
            Get started in three easy steps — whether you're a creator looking
            for gigs or a brand searching for talent.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="relative"
              >
                {/* Connector line (desktop only) */}
                {i < steps.length - 1 && (
                  <motion.div
                    variants={lineVariant}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="absolute right-0 top-12 hidden h-[2px] w-[calc(100%_-_3rem)] origin-left translate-x-1/2 bg-gradient-to-r from-neon-purple/40 to-transparent lg:block"
                  />
                )}

                <div
                  className={`glass group relative rounded-2xl border ${s.borderColor} p-8 transition-all duration-300 hover:shadow-xl hover:${s.glowColor}`}
                >
                  {/* Step Number */}
                  <span className="absolute -top-4 right-6 font-display text-5xl font-extrabold text-white/[0.03]">
                    {s.step}
                  </span>

                  {/* Icon */}
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} shadow-lg`}
                  >
                    <Icon size={26} className="text-white" />
                  </div>

                  <h3 className="font-display text-xl font-bold">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-400">
                    {s.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
