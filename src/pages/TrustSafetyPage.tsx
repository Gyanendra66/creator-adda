import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Users } from "lucide-react";

const pillars = [
  { icon: Shield, title: "Identity Verification", description: "All creators and clients go through identity verification. Verified users get a badge that builds trust and increases engagement." },
  { icon: Lock, title: "Secure Payments", description: "All transactions are protected with escrow. Funds are held securely until work is delivered and approved, protecting both parties." },
  { icon: Eye, title: "Content Moderation", description: "Our AI-powered moderation system and human review team ensure portfolios and communications meet our community standards." },
  { icon: AlertTriangle, title: "Dispute Resolution", description: "Our dedicated trust team mediates disputes fairly with a structured resolution process. Most disputes are resolved within 48 hours." },
  { icon: CheckCircle, title: "Review Integrity", description: "Reviews are verified and tied to actual completed projects. We actively detect and remove fake reviews to maintain credibility." },
  { icon: Users, title: "Community Guidelines", description: "Clear guidelines ensure a respectful, professional environment. Violations result in warnings, restrictions, or permanent bans." },
];

export default function TrustSafetyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">
            Trust & <span className="text-gradient">Safety</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            Your safety is our priority. Learn how we protect creators and clients on Creator Adda.
          </p>
        </motion.div>

        {/* Pillars */}
        <div className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-dark-border bg-dark-card/60 p-6"
            >
              <pillar.icon className="mb-4 text-neon-purple" size={28} />
              <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
              <p className="mt-2 text-sm text-gray-400 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Reporting */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl"
        >
          <h2 className="mb-8 text-center text-2xl font-bold">How to Report an Issue</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Identify the Issue", desc: "If you encounter fraud, harassment, IP theft, or any policy violation, take note of the details and any evidence." },
              { step: "2", title: "Use the Report Button", desc: "Every profile, project, and message has a 'Report' option. Click it and select the reason for your report." },
              { step: "3", title: "Our Team Investigates", desc: "Our Trust & Safety team reviews all reports within 24 hours. We may reach out for additional information." },
              { step: "4", title: "Action is Taken", desc: "Depending on the severity, we issue warnings, restrict accounts, or permanently ban violators. You'll be notified of the outcome." },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 rounded-xl border border-dark-border bg-dark-card/60 p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neon-purple/10 text-sm font-bold text-neon-purple">
                  {step.step}
                </div>
                <div>
                  <h4 className="font-medium text-white">{step.title}</h4>
                  <p className="mt-1 text-sm text-gray-400">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-neon-orange/30 bg-neon-orange/5 p-8 text-center"
        >
          <AlertTriangle className="mx-auto mb-3 text-neon-orange" size={32} />
          <h3 className="text-lg font-bold text-white">Urgent Safety Concern?</h3>
          <p className="mt-2 text-sm text-gray-400">
            If you believe there's an immediate safety threat, contact our emergency team:
          </p>
          <p className="mt-3 font-medium text-neon-orange">safety@creatoradda.com</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link to="/help" className="text-sm text-gray-400 underline underline-offset-4 hover:text-neon-purple">Help Center</Link>
            <span className="text-dark-border">|</span>
            <Link to="/terms" className="text-sm text-gray-400 underline underline-offset-4 hover:text-neon-purple">Terms of Service</Link>
            <span className="text-dark-border">|</span>
            <Link to="/privacy" className="text-sm text-gray-400 underline underline-offset-4 hover:text-neon-purple">Privacy Policy</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
