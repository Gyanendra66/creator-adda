import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, Globe, MapPin, UserRound, FileText, Sparkles } from "lucide-react";
import {
  subscribeToAccountProfile,
  subscribeToAuthUser,
  updateAccountProfile,
  type AccountProfile,
  type SessionUser,
} from "../lib/firebase";

function AccountGate() {
  return (
    <div className="min-h-screen bg-grid pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 text-center sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan">
            <UserRound size={28} className="text-white" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold">Sign in to manage your profile</h1>
          <p className="mt-3 text-sm text-gray-400">
            Your personal profile and account settings are only available after login.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/login" className="rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan px-6 py-3 text-sm font-semibold text-white">
              Sign In
            </Link>
            <Link to="/register" className="rounded-xl border border-dark-border px-6 py-3 text-sm font-medium text-white hover:border-neon-purple/40">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountNav() {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      <Link to="/account/profile" className="rounded-xl bg-neon-purple/15 px-4 py-2 text-sm font-semibold text-neon-purple ring-1 ring-neon-purple/30">
        Profile
      </Link>
      <Link to="/account/settings" className="rounded-xl border border-dark-border px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-neon-purple/30 hover:text-white">
        Settings
      </Link>
    </div>
  );
}

export default function AccountProfilePage() {
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => subscribeToAuthUser(setCurrentUser), []);

  useEffect(() => {
    if (!currentUser) {
      setProfile(null);
      return;
    }

    return subscribeToAccountProfile(currentUser, (nextProfile) => {
      setProfile(nextProfile);
      setName(nextProfile.name);
      setHeadline(nextProfile.headline);
      setBio(nextProfile.bio);
      setLocation(nextProfile.location);
      setWebsite(nextProfile.website);
    });
  }, [currentUser]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!currentUser) {
      setError("Sign in first to update your profile.");
      return;
    }

    setSaving(true);
    const result = await updateAccountProfile(currentUser, {
      name,
      headline,
      bio,
      location,
      website,
    });

    if (!result.ok) {
      setError(result.error);
      setMessage("");
      setSaving(false);
      return;
    }

    setError("");
    setMessage("Your profile has been updated.");
    setSaving(false);
  };

  if (!currentUser) {
    return <AccountGate />;
  }

  return (
    <div className="min-h-screen bg-grid pt-24 pb-20">
      <div className="pointer-events-none absolute right-0 top-24 h-[440px] w-[440px] rounded-full bg-neon-purple/6 blur-[160px]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AccountNav />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-neon-purple to-neon-cyan text-2xl font-bold text-white shadow-lg shadow-neon-purple/20">
                  {(profile?.name || currentUser.name)
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="font-display text-3xl font-bold">{profile?.name || currentUser.name}</h1>
                    <span className="rounded-full bg-neon-cyan/10 px-3 py-1 text-xs font-semibold text-neon-cyan">
                      {profile?.role === "client" ? "Client Account" : "Creator Account"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-400">{profile?.headline || "Complete your profile to make your account feel like home."}</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.24em] text-gray-500">Personal account profile</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-neon-purple">
                <Sparkles size={16} /> Edit profile
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-400">Full Name</label>
                  <div className="flex items-center gap-3 rounded-2xl bg-dark-card px-4 py-3 ring-1 ring-dark-border focus-within:ring-neon-purple/40">
                    <UserRound size={16} className="text-gray-500" />
                    <input value={name} onChange={(event) => setName(event.target.value)} className="w-full bg-transparent text-sm text-white outline-none" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-400">Location</label>
                  <div className="flex items-center gap-3 rounded-2xl bg-dark-card px-4 py-3 ring-1 ring-dark-border focus-within:ring-neon-purple/40">
                    <MapPin size={16} className="text-gray-500" />
                    <input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Mumbai, Remote, Delhi..." className="w-full bg-transparent text-sm text-white outline-none" />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-semibold text-gray-400">Headline</label>
                <div className="flex items-center gap-3 rounded-2xl bg-dark-card px-4 py-3 ring-1 ring-dark-border focus-within:ring-neon-purple/40">
                  <Sparkles size={16} className="text-gray-500" />
                  <input value={headline} onChange={(event) => setHeadline(event.target.value)} placeholder="Cinematic editor, hiring manager, brand founder..." className="w-full bg-transparent text-sm text-white outline-none" />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-semibold text-gray-400">Website</label>
                <div className="flex items-center gap-3 rounded-2xl bg-dark-card px-4 py-3 ring-1 ring-dark-border focus-within:ring-neon-purple/40">
                  <Globe size={16} className="text-gray-500" />
                  <input value={website} onChange={(event) => setWebsite(event.target.value)} placeholder="https://yourportfolio.com" className="w-full bg-transparent text-sm text-white outline-none" />
                </div>
              </div>

              <div className="mt-5">
                <label className="mb-2 block text-xs font-semibold text-gray-400">Bio</label>
                <div className="flex gap-3 rounded-2xl bg-dark-card px-4 py-3 ring-1 ring-dark-border focus-within:ring-neon-purple/40">
                  <FileText size={16} className="mt-1 text-gray-500" />
                  <textarea value={bio} onChange={(event) => setBio(event.target.value)} rows={5} placeholder="Tell people about your creative work, business, or what you're here to do on Creator Adda." className="w-full resize-none bg-transparent text-sm text-white outline-none" />
                </div>
              </div>

              {error && <p className="mt-5 text-sm text-red-300">{error}</p>}
              {message && <p className="mt-5 text-sm text-neon-cyan">{message}</p>}

              <button type="submit" disabled={saving} className="mt-6 inline-flex items-center rounded-2xl bg-gradient-to-r from-neon-purple to-neon-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neon-purple/20 transition-all hover:shadow-neon-purple/35">
                {saving ? "Saving..." : "Save Profile"}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-3xl p-8">
              <h2 className="font-display text-xl font-bold">Account Overview</h2>
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-dark-border bg-dark-card/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Email</p>
                  <p className="mt-2 text-sm text-white">{profile?.email || currentUser.email}</p>
                </div>
                <div className="rounded-2xl border border-dark-border bg-dark-card/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Role</p>
                  <p className="mt-2 text-sm text-white">{profile?.role === "client" ? "Client" : "Creator"}</p>
                </div>
                <div className="rounded-2xl border border-dark-border bg-dark-card/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Member Since</p>
                  <p className="mt-2 text-sm text-white">{new Date(profile?.createdAt || Date.now()).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-neon-cyan" />
                <h2 className="font-display text-xl font-bold">Quick Access</h2>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/account/settings" className="rounded-2xl border border-dark-border px-5 py-3 text-sm text-white transition-colors hover:border-neon-purple/30">
                  Open account settings
                </Link>
                <Link to="/post-job" className="rounded-2xl border border-dark-border px-5 py-3 text-sm text-white transition-colors hover:border-neon-cyan/30">
                  Post a new job
                </Link>
                <Link to="/jobs" className="rounded-2xl border border-dark-border px-5 py-3 text-sm text-white transition-colors hover:border-neon-purple/30">
                  Browse opportunities
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}