import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "Browse Creators", href: "/creators" },
      { label: "Post a Job", href: "/post-job" },
      { label: "Categories", href: "/categories" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Trust & Safety", href: "/trust-safety" },
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
    ],
  },
];

const socialLinks = [
  { label: "Twitter", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "Discord", href: "https://discord.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-card/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan">
                <span className="text-sm font-bold text-white">C</span>
              </div>
              <span className="font-display text-lg font-bold">
                Creator<span className="text-neon-purple">Adda</span>
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              The ultimate freelance marketplace for social media content
              creators.
            </p>
          </div>

          {/* Links */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-500 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-dark-border pt-8 sm:flex-row"
        >
          <p className="text-xs text-gray-600">
            © 2026 Creator Adda. All rights reserved.
          </p>
          <div className="flex gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-gray-500 transition-colors hover:text-neon-purple"
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
