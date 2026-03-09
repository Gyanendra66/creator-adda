import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing or using Creator Adda ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the Platform. We may update these terms from time to time, and your continued use constitutes acceptance of any changes.`,
  },
  {
    title: "2. Account Registration",
    content: `You must provide accurate, complete information when creating an account. You are responsible for maintaining the security of your account credentials. You must be at least 18 years old to use the Platform. One person may only maintain one account. Creator Adda reserves the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    title: "3. Creator Obligations",
    content: `Creators agree to: deliver work as described in the project agreement; communicate promptly with clients; maintain the quality represented in their portfolio; not engage in plagiarism or IP infringement; comply with all applicable laws and regulations. Creators are independent contractors and not employees of Creator Adda.`,
  },
  {
    title: "4. Client Obligations",
    content: `Clients agree to: provide clear project requirements; fund escrow before work begins; review deliverables within the specified timeframe; not request work outside the original project scope without mutual agreement; treat creators with respect and professionalism.`,
  },
  {
    title: "5. Payments & Fees",
    content: `All payments are processed through our secure escrow system. Creator Adda charges a 10% service fee on completed transactions. Payments are released to creators within 3-5 business days of client approval. Refunds are handled on a case-by-case basis through our dispute resolution process. Premium subscription fees are billed monthly and are non-refundable.`,
  },
  {
    title: "6. Intellectual Property",
    content: `Upon full payment, all intellectual property rights for the delivered work transfer to the client, unless otherwise agreed in writing. Creators retain the right to showcase completed work in their portfolio unless the client requests confidentiality. Users must not upload content they don't have the right to use.`,
  },
  {
    title: "7. Prohibited Conduct",
    content: `Users must not: circumvent the Platform's payment system; share personal contact information to avoid Platform fees; engage in fraud, spam, or harassment; create fake reviews or manipulate ratings; use the Platform for illegal activities; scrape or collect data from the Platform without permission.`,
  },
  {
    title: "8. Dispute Resolution",
    content: `In case of disputes between creators and clients, our Trust & Safety team will mediate. Both parties agree to participate in good faith. Creator Adda's decision on disputes is final. For disputes involving Creator Adda directly, governing law shall be the laws of India, with jurisdiction in Bangalore courts.`,
  },
  {
    title: "9. Limitation of Liability",
    content: `Creator Adda serves as a marketplace connecting creators and clients. We do not guarantee the quality of work, payment, or outcomes. Our liability is limited to the fees paid to Creator Adda in the preceding 12 months. We are not liable for indirect, incidental, or consequential damages.`,
  },
  {
    title: "10. Termination",
    content: `Either party may terminate their account at any time. Creator Adda may suspend or terminate accounts for violations of these terms. Upon termination, complete any open projects and withdraw pending funds within 30 days. Data retention after termination follows our Privacy Policy.`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">
            Terms of <span className="text-gradient">Service</span>
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            Last updated: March 1, 2026
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
          Questions about these terms? Contact us at{" "}
          <span className="text-neon-purple">legal@creatoradda.com</span>
        </motion.p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link to="/privacy" className="text-gray-400 underline underline-offset-4 hover:text-neon-purple">Privacy Policy</Link>
          <span className="text-dark-border">|</span>
          <Link to="/trust-safety" className="text-gray-400 underline underline-offset-4 hover:text-neon-purple">Trust & Safety</Link>
          <span className="text-dark-border">|</span>
          <Link to="/help" className="text-gray-400 underline underline-offset-4 hover:text-neon-purple">Help Center</Link>
        </div>
      </div>
    </div>
  );
}
