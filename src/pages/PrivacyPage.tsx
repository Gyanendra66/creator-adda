import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly: name, email, phone number, profile details, portfolio content, and payment information. We also automatically collect: device information, IP address, browser type, usage patterns, and cookies. For identity verification, we may collect government-issued ID documents.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use your information to: operate and improve the Platform; match creators with relevant opportunities; process payments securely; verify identity and prevent fraud; send important service updates; personalize your experience; analyze usage patterns to improve features; comply with legal obligations.`,
  },
  {
    title: "3. Information Sharing",
    content: `We share your information with: other users as part of your public profile; payment processors to complete transactions; identity verification services; analytics providers (anonymized data only); law enforcement when required by law. We never sell your personal data to third parties for advertising purposes.`,
  },
  {
    title: "4. Data Security",
    content: `We implement industry-standard security measures including: encryption in transit (TLS 1.3) and at rest (AES-256); regular security audits; access controls and monitoring; secure data centers with SOC 2 compliance. While we strive to protect your data, no system is 100% secure.`,
  },
  {
    title: "5. Cookies & Tracking",
    content: `We use essential cookies for authentication and security, functional cookies for preferences, and analytics cookies to understand usage. You can manage cookie preferences in your browser settings. Disabling essential cookies may impact Platform functionality.`,
  },
  {
    title: "6. Your Rights",
    content: `You have the right to: access your personal data; correct inaccurate information; delete your account and associated data; export your data in a portable format; opt out of marketing communications; restrict certain data processing. To exercise these rights, contact privacy@creatoradda.com.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your data for as long as your account is active. After account deletion, we retain minimal data for 90 days for dispute resolution, then permanently delete it. Transaction records are retained for 7 years as required by law. Anonymized analytics data may be retained indefinitely.`,
  },
  {
    title: "8. Children's Privacy",
    content: `Creator Adda is not intended for users under 18 years of age. We do not knowingly collect information from minors. If we learn that we have collected data from a minor, we will delete it promptly.`,
  },
  {
    title: "9. International Data Transfers",
    content: `Your data may be processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers, including standard contractual clauses where applicable.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes via email or a prominent notice on the Platform. Your continued use after changes constitutes acceptance.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">
            Privacy <span className="text-gradient">Policy</span>
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            Last updated: March 1, 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-10 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5 p-6"
        >
          <p className="text-sm text-gray-300 leading-relaxed">
            At Creator Adda, we take your privacy seriously. This policy explains what information we
            collect, how we use it, and your rights regarding your data. We are committed to transparency
            and protecting your information.
          </p>
        </motion.div>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-dark-border bg-dark-card/60 p-6"
            >
              <h2 className="mb-3 text-lg font-semibold text-white">{section.title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center text-sm text-gray-500"
        >
          Questions about privacy? Contact our Data Protection Officer at{" "}
          <span className="text-neon-purple">privacy@creatoradda.com</span>
        </motion.p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link to="/terms" className="text-gray-400 underline underline-offset-4 hover:text-neon-purple">Terms of Service</Link>
          <span className="text-dark-border">|</span>
          <Link to="/trust-safety" className="text-gray-400 underline underline-offset-4 hover:text-neon-purple">Trust & Safety</Link>
          <span className="text-dark-border">|</span>
          <Link to="/help" className="text-gray-400 underline underline-offset-4 hover:text-neon-purple">Help Center</Link>
        </div>
      </div>
    </div>
  );
}
