import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { registerUser, signInWithProvider } from "../lib/firebase";

const roles = [
  { value: "creator", label: "I'm a Creator", desc: "I want to find work and sell my services." },
  { value: "client", label: "I'm a Client", desc: "I want to hire creators for my projects." },
];

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("creator");
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await registerUser({
      name: name.trim(),
      email,
      password,
      role: role as "creator" | "client",
    });

    if (!result.ok) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    setError("");
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleProviderSignup = async (provider: "google" | "github") => {
    setIsSubmitting(true);
    const result = await signInWithProvider(provider);

    if (!result.ok) {
      setError(result.error);
      setIsSubmitting(false);
      return;
    }

    setError("");
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-grid px-4 pt-16 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass mx-4 max-w-md rounded-3xl p-10 text-center"
        >
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan shadow-lg shadow-neon-purple/25">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold">Welcome to Creator Adda!</h2>
          <p className="mt-3 text-sm text-gray-400">
            Your Firebase account has been created. Complete your profile to get started.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              to="/creators"
              className="rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan py-3 text-sm font-semibold text-white shadow-lg shadow-neon-purple/20"
            >
              Browse Creators
            </Link>
            <Link
              to="/"
              className="rounded-xl border border-dark-border py-3 text-sm font-medium text-gray-300 transition-colors hover:text-white"
            >
              Go to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-grid px-4 pt-16 pb-20">
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-neon-cyan/6 blur-[160px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass w-full max-w-lg rounded-3xl p-8 sm:p-10"
      >
        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neon-purple to-neon-cyan shadow-lg shadow-neon-purple/20">
              <span className="text-lg font-bold text-white">C</span>
            </div>
            <span className="font-display text-xl font-bold">
              Creator<span className="text-neon-purple">Adda</span>
            </span>
          </Link>
        </div>

        <h1 className="mt-8 text-center font-display text-2xl font-bold">Create your account</h1>
        <p className="mt-2 text-center text-sm text-gray-500">
          Join 12,000+ creators and brands — it's free
        </p>

        {/* Role Selector */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {roles.map((r) => (
            <button
              key={r.value}
              type="button"
              onClick={() => setRole(r.value)}
              className={`rounded-xl p-4 text-left transition-all ring-1 ${
                role === r.value
                  ? "ring-neon-purple/50 bg-neon-purple/5"
                  : "ring-dark-border bg-dark-card hover:ring-dark-hover"
              }`}
            >
              <span className={`text-sm font-semibold ${role === r.value ? "text-neon-purple" : "text-white"}`}>
                {r.label}
              </span>
              <p className="mt-1 text-[11px] text-gray-500">{r.desc}</p>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Name */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-400">Full Name</label>
            <div className="flex items-center gap-3 rounded-xl bg-dark-card px-4 py-3 ring-1 ring-dark-border transition-all focus-within:ring-neon-purple/50">
              <User size={16} className="text-gray-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-400">Email</label>
            <div className="flex items-center gap-3 rounded-xl bg-dark-card px-4 py-3 ring-1 ring-dark-border transition-all focus-within:ring-neon-purple/50">
              <Mail size={16} className="text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-400">Password</label>
            <div className="flex items-center gap-3 rounded-xl bg-dark-card px-4 py-3 ring-1 ring-dark-border transition-all focus-within:ring-neon-purple/50">
              <Lock size={16} className="text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-500 hover:text-white">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 text-xs text-gray-500">
            <input type="checkbox" required className="mt-0.5 accent-purple-500" />
            <span>
              I agree to Creator Adda's{" "}
              <Link to="/terms" className="text-neon-purple hover:underline">Terms of Service</Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-neon-purple hover:underline">Privacy Policy</Link>
            </span>
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan py-3.5 text-sm font-semibold text-white shadow-lg shadow-neon-purple/25 transition-all hover:shadow-neon-purple/40"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-dark-border" />
          <span className="text-xs text-gray-600">or sign up with</span>
          <div className="h-px flex-1 bg-dark-border" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => void handleProviderSignup("google")}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-dark-card py-3 text-sm font-medium text-gray-300 ring-1 ring-dark-border transition-all hover:ring-neon-purple/30"
          >
            <span>🔵</span> Google
          </button>
          <button
            type="button"
            onClick={() => void handleProviderSignup("github")}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-dark-card py-3 text-sm font-medium text-gray-300 ring-1 ring-dark-border transition-all hover:ring-neon-purple/30"
          >
            <span>⚫</span> GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-neon-purple hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
