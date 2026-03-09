import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, subscribeToAuthUser, type SessionUser } from "../lib/firebase";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Creators", href: "/creators" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    const unsubscribeAuth = subscribeToAuthUser(setCurrentUser);

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      unsubscribeAuth();
    };
  }, []);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-strong shadow-lg shadow-neon-purple/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple to-neon-cyan">
              <span className="text-lg font-bold text-white">C</span>
            </div>
            <span className="font-display text-xl font-bold">
              Creator<span className="text-neon-purple">Adda</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={() => navigate("/search")}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:text-white"
            >
              <Search size={16} />
              <span>Search</span>
            </button>

            {/* Divider */}
            <div className="h-5 w-px bg-dark-border" />

            <Link
              to="/jobs"
              className="rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-2 text-sm font-medium text-neon-cyan transition-all hover:border-neon-cyan/60 hover:bg-neon-cyan/10 hover:shadow-lg hover:shadow-neon-cyan/10"
            >
              Browse Jobs
            </Link>
            <Link
              to="/post-job"
              className="rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-neon-purple/25"
            >
              Post a Job
            </Link>

            {/* Divider */}
            <div className="h-5 w-px bg-dark-border" />

            {currentUser ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">Hi, {currentUser.name.split(" ")[0]}</span>
                <Link
                  to="/account"
                  className="rounded-lg border border-dark-border px-4 py-2 text-sm font-medium text-white transition-all hover:border-neon-cyan/50 hover:shadow-lg hover:shadow-neon-cyan/10"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => void handleLogout()}
                  className="rounded-lg border border-dark-border px-4 py-2 text-sm font-medium text-white transition-all hover:border-neon-purple/50 hover:shadow-lg hover:shadow-neon-purple/10"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="rounded-lg border border-dark-border px-4 py-2 text-sm font-medium text-white transition-all hover:border-neon-purple/50 hover:shadow-lg hover:shadow-neon-purple/10"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-strong md:hidden overflow-hidden"
          >
            <div className="space-y-1 px-4 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-dark-hover hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              {/* Jobs Section */}
              <div className="mt-4 flex flex-col gap-2 border-t border-dark-border pt-4">
                <Link
                  to="/jobs"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-2.5 text-center text-sm font-medium text-neon-cyan"
                >
                  Browse Jobs
                </Link>
                <Link
                  to="/post-job"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan px-4 py-2.5 text-center text-sm font-semibold text-white"
                >
                  Post a Job
                </Link>
              </div>

              {/* Auth Section */}
              <div className="mt-3 flex flex-col gap-2 border-t border-dark-border pt-3">
                {currentUser ? (
                  <>
                    <Link
                      to="/account"
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg border border-dark-border px-4 py-2.5 text-center text-sm font-medium text-white"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        void handleLogout();
                        setMobileOpen(false);
                      }}
                      className="rounded-lg border border-dark-border px-4 py-2.5 text-center text-sm font-medium text-white"
                    >
                      Logout ({currentUser.name.split(" ")[0]})
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg border border-dark-border px-4 py-2.5 text-center text-sm font-medium text-white"
                  >
                    Login / Register
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
