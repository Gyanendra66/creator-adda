import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, ChevronDown, MessageCircle, Mail, Phone } from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    questions: [
      { q: "How do I create an account?", a: "Click 'Register' in the navigation bar, choose whether you're a Creator or Client, fill in your details, and verify your email. Your account will be ready in under 2 minutes." },
      { q: "How do I set up my creator profile?", a: "After registering as a Creator, go to your dashboard → Profile. Add your bio, portfolio items, skills, pricing packages, and a professional photo. A complete profile gets 3x more views." },
      { q: "How do I post a job?", a: "Click 'Post a Job' in the navigation, fill in the job details including description, budget, timeline, and required skills, then publish. Creators will start applying within hours." },
    ],
  },
  {
    title: "Payments & Billing",
    questions: [
      { q: "How do payments work?", a: "Clients fund an escrow when they hire a creator. Once the work is delivered and approved, funds are released to the creator. We support UPI, bank transfer, and all major cards." },
      { q: "What are the platform fees?", a: "Creator Adda charges a 10% service fee on completed projects. There are no upfront costs for free-tier users. Check our Pricing page for premium plan details." },
      { q: "When do I get paid?", a: "Once a client approves your delivery, funds are released within 3-5 business days to your linked bank account or UPI." },
    ],
  },
  {
    title: "Orders & Delivery",
    questions: [
      { q: "How do I deliver work to a client?", a: "Use the project workspace to upload files, share links, and communicate. Click 'Deliver' when your work is complete. The client has 3 days to review and approve or request revisions." },
      { q: "What if a client is unresponsive?", a: "If a client doesn't respond within 7 days of delivery, the payment is automatically released to you. You can also contact support for assistance." },
      { q: "Can I request a deadline extension?", a: "Yes, communicate with your client through the project workspace. Both parties can agree to extend the deadline without penalty." },
    ],
  },
  {
    title: "Account & Security",
    questions: [
      { q: "How do I reset my password?", a: "Go to the Login page and click 'Forgot Password'. Enter your email and we'll send you a secure reset link valid for 24 hours." },
      { q: "How do I verify my identity?", a: "Go to Settings → Verification. Upload a government-issued ID and a selfie. Verification typically takes 24-48 hours and adds a verified badge to your profile." },
      { q: "Can I delete my account?", a: "Go to Settings → Account → Delete Account. Please note this action is permanent. Complete any open projects before deleting your account." },
    ],
  },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItem, setOpenItem] = useState<string | null>(null);

  const filteredCategories = categories.map((cat) => ({
    ...cat,
    questions: cat.questions.filter(
      (faq) =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.questions.length > 0);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold sm:text-5xl">
            <span className="text-gradient">Help</span> Center
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Find answers to common questions or get in touch with our support team.
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-8 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full rounded-xl border border-dark-border bg-dark-card/60 py-3 pl-11 pr-4 text-white placeholder-gray-500 outline-none focus:border-neon-purple/50"
            />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map((cat) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="mb-4 text-lg font-bold text-white">{cat.title}</h2>
              <div className="space-y-2">
                {cat.questions.map((faq) => {
                  const isOpen = openItem === faq.q;
                  return (
                    <div
                      key={faq.q}
                      className="rounded-xl border border-dark-border bg-dark-card/60 transition-all hover:border-neon-purple/20"
                    >
                      <button
                        onClick={() => setOpenItem(isOpen ? null : faq.q)}
                        className="flex w-full items-center justify-between p-5 text-left"
                      >
                        <span className="pr-4 text-sm font-medium text-white">{faq.q}</span>
                        <ChevronDown
                          size={16}
                          className={`shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-dark-border px-5 py-4 text-sm text-gray-400 leading-relaxed">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 grid gap-6 sm:grid-cols-3"
        >
          {[
            { icon: MessageCircle, title: "Live Chat", desc: "Available 24/7", action: "Start Chat", href: "mailto:support@creatoradda.com?subject=Live%20Chat%20Request" },
            { icon: Mail, title: "Email Support", desc: "support@creatoradda.com", action: "Send Email", href: "mailto:support@creatoradda.com" },
            { icon: Phone, title: "Phone", desc: "+91 1800-000-000", action: "Call Us", href: "tel:+911800000000" },
          ].map((channel) => (
            <div
              key={channel.title}
              className="rounded-xl border border-dark-border bg-dark-card/60 p-6 text-center"
            >
              <channel.icon className="mx-auto mb-3 text-neon-purple" size={28} />
              <h3 className="font-semibold text-white">{channel.title}</h3>
              <p className="mt-1 text-xs text-gray-400">{channel.desc}</p>
              <a href={channel.href} className="mt-4 inline-block rounded-lg border border-dark-border px-4 py-2 text-xs font-medium text-white transition-all hover:border-neon-purple/50">
                {channel.action}
              </a>
            </div>
          ))}
        </motion.div>
        {/* Related Pages */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 text-sm">
          <Link to="/trust-safety" className="text-gray-400 underline underline-offset-4 hover:text-neon-purple">Trust & Safety</Link>
          <span className="text-dark-border">|</span>
          <Link to="/terms" className="text-gray-400 underline underline-offset-4 hover:text-neon-purple">Terms of Service</Link>
          <span className="text-dark-border">|</span>
          <Link to="/privacy" className="text-gray-400 underline underline-offset-4 hover:text-neon-purple">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
