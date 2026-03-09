import { useEffect, useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import {
  Briefcase,
  Bell,
  CheckCircle2,
  Edit3,
  FileText,
  Globe,
  LayoutDashboard,
  MapPin,
  Plus,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import {
  deleteJob,
  logoutUser,
  subscribeToAccountProfile,
  subscribeToAuthUser,
  subscribeToUserJobs,
  updateAccountProfile,
  updateAccountSettings,
  updateJob,
  type AccountProfile,
  type AccountSettings,
  type SessionUser,
  type StoredJob,
} from "../lib/firebase";

type Tab = "overview" | "profile" | "jobs" | "settings";

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "jobs", label: "My Jobs", icon: Briefcase },
  { id: "settings", label: "Settings", icon: Settings },
];

/* ── Gate (shown when not logged in) ── */

function AccountGate() {
  return (
    <div className="min-h-screen bg-grid pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-10 text-center sm:p-14">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-neon-purple to-neon-cyan shadow-lg shadow-neon-purple/20">
            <LayoutDashboard size={32} className="text-white" />
          </div>
          <h1 className="mt-8 font-display text-4xl font-bold">Your Account Dashboard</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-gray-400">
            Sign in to manage your profile, view and edit your posted jobs, and control your account settings — all from one place.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/login"
              className="rounded-2xl bg-gradient-to-r from-neon-purple to-neon-cyan px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-neon-purple/20 transition-all hover:shadow-neon-purple/35"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="rounded-2xl border border-dark-border px-8 py-3.5 text-sm font-medium text-white transition-colors hover:border-neon-purple/40"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Overview Tab ── */

function OverviewTab({
  profile,
  currentUser,
  jobs,
  switchTab,
}: {
  profile: AccountProfile | null;
  currentUser: SessionUser;
  jobs: StoredJob[];
  switchTab: (tab: Tab) => void;
}) {
  const completedFields = [
    profile?.name,
    profile?.headline,
    profile?.bio,
    profile?.location,
    profile?.website,
  ].filter((f) => f?.trim()).length;
  const profilePercent = Math.round((completedFields / 5) * 100);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Stats Row */}
      <div className="glass rounded-3xl p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-purple/15">
            <Briefcase size={18} className="text-neon-purple" />
          </div>
          <div>
            <p className="text-2xl font-bold">{jobs.length}</p>
            <p className="text-xs text-gray-400">Jobs Posted</p>
          </div>
        </div>
      </div>
      <div className="glass rounded-3xl p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-cyan/15">
            <CheckCircle2 size={18} className="text-neon-cyan" />
          </div>
          <div>
            <p className="text-2xl font-bold">{profilePercent}%</p>
            <p className="text-xs text-gray-400">Profile Complete</p>
          </div>
        </div>
      </div>
      <div className="glass rounded-3xl p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon-purple/15">
            <UserRound size={18} className="text-neon-purple" />
          </div>
          <div>
            <p className="text-2xl font-bold capitalize">{profile?.role || currentUser.role}</p>
            <p className="text-xs text-gray-400">Account Type</p>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="glass rounded-3xl p-8 lg:col-span-2">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-neon-purple to-neon-cyan text-2xl font-bold text-white shadow-lg shadow-neon-purple/20">
            {(profile?.name || currentUser.name)
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-2xl font-bold truncate">{profile?.name || currentUser.name}</h2>
              <span className="rounded-full bg-neon-cyan/10 px-3 py-1 text-xs font-semibold text-neon-cyan">
                {profile?.role === "client" ? "Client" : "Creator"}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-400 truncate">{profile?.headline || "Complete your profile"}</p>
            <p className="mt-1 text-xs text-gray-500">{profile?.email || currentUser.email}</p>
            {profile?.location && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
                <MapPin size={12} /> {profile.location}
              </p>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => switchTab("profile")}
            className="rounded-xl border border-dark-border px-4 py-2.5 text-sm font-medium text-white transition-colors hover:border-neon-purple/40"
          >
            Edit Profile
          </button>
          <Link
            to="/post-job"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-neon-purple/20"
          >
            <Plus size={14} /> Post New Job
          </Link>
        </div>
      </div>

      {/* Quick Access */}
      <div className="glass rounded-3xl p-8">
        <h3 className="font-display text-lg font-bold">Quick Access</h3>
        <div className="mt-5 flex flex-col gap-2.5">
          <button
            onClick={() => switchTab("jobs")}
            className="rounded-xl border border-dark-border px-4 py-3 text-left text-sm text-white transition-colors hover:border-neon-purple/30"
          >
            View My Jobs
          </button>
          <button
            onClick={() => switchTab("settings")}
            className="rounded-xl border border-dark-border px-4 py-3 text-left text-sm text-white transition-colors hover:border-neon-cyan/30"
          >
            Account Settings
          </button>
          <Link
            to="/jobs"
            className="rounded-xl border border-dark-border px-4 py-3 text-sm text-white transition-colors hover:border-neon-purple/30"
          >
            Browse All Jobs
          </Link>
          <Link
            to="/creators"
            className="rounded-xl border border-dark-border px-4 py-3 text-sm text-white transition-colors hover:border-neon-cyan/30"
          >
            Explore Creators
          </Link>
        </div>
      </div>

      {/* Recent Jobs */}
      <div className="glass rounded-3xl p-8 lg:col-span-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-bold">Recent Jobs</h3>
          {jobs.length > 0 && (
            <button onClick={() => switchTab("jobs")} className="text-xs font-semibold text-neon-purple hover:underline">
              View All →
            </button>
          )}
        </div>
        {jobs.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-dark-border p-8 text-center">
            <Briefcase size={24} className="mx-auto text-gray-500" />
            <p className="mt-3 text-sm text-gray-400">You haven't posted any jobs yet.</p>
            <Link
              to="/post-job"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-neon-purple to-neon-cyan px-5 py-2.5 text-sm font-semibold text-white"
            >
              <Plus size={14} /> Post Your First Job
            </Link>
          </div>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.slice(0, 3).map((job) => (
              <div key={job.id} className="rounded-2xl border border-dark-border bg-dark-card/60 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-white line-clamp-1">{job.title}</h4>
                  {job.urgent && (
                    <span className="shrink-0 rounded-full bg-red-500/15 px-2 py-0.5 text-[10px] font-bold text-red-400">
                      URGENT
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-gray-400 line-clamp-2">{job.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-neon-purple/10 px-2.5 py-0.5 text-[10px] font-semibold text-neon-purple">
                    {job.category}
                  </span>
                  <span className="text-xs text-gray-500">{job.budget}</span>
                </div>
                <p className="mt-2 text-[10px] text-gray-500">{job.postedAgo}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Profile Tab ── */

function ProfileTab({
  profile,
  currentUser,
}: {
  profile: AccountProfile | null;
  currentUser: SessionUser;
}) {
  const [name, setName] = useState(profile?.name || currentUser.name);
  const [headline, setHeadline] = useState(profile?.headline || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [location, setLocation] = useState(profile?.location || "");
  const [website, setWebsite] = useState(profile?.website || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setName(profile.name);
    setHeadline(profile.headline);
    setBio(profile.bio);
    setLocation(profile.location);
    setWebsite(profile.website);
  }, [profile]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setSaving(true);
    const result = await updateAccountProfile(currentUser, { name, headline, bio, location, website });
    if (!result.ok) {
      setError(result.error);
      setMessage("");
    } else {
      setError("");
      setMessage("Profile updated successfully.");
    }
    setSaving(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        {/* Header Card */}
        <div className="glass rounded-3xl p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-neon-purple to-neon-cyan text-2xl font-bold text-white shadow-lg shadow-neon-purple/20">
              {(profile?.name || currentUser.name)
                .split(" ")
                .map((p) => p[0])
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
              <p className="mt-2 text-sm text-gray-400">{profile?.headline || "Complete your profile to stand out."}</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSubmit} className="glass rounded-3xl p-8">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-neon-purple">
            <Sparkles size={16} /> Edit Profile
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-400">Full Name</label>
              <div className="flex items-center gap-3 rounded-2xl bg-dark-card px-4 py-3 ring-1 ring-dark-border focus-within:ring-neon-purple/40">
                <UserRound size={16} className="text-gray-500" />
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent text-sm text-white outline-none" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-400">Location</label>
              <div className="flex items-center gap-3 rounded-2xl bg-dark-card px-4 py-3 ring-1 ring-dark-border focus-within:ring-neon-purple/40">
                <MapPin size={16} className="text-gray-500" />
                <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Mumbai, Remote, Delhi..." className="w-full bg-transparent text-sm text-white outline-none" />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-xs font-semibold text-gray-400">Headline</label>
            <div className="flex items-center gap-3 rounded-2xl bg-dark-card px-4 py-3 ring-1 ring-dark-border focus-within:ring-neon-purple/40">
              <Sparkles size={16} className="text-gray-500" />
              <input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Cinematic editor, hiring manager, brand founder..." className="w-full bg-transparent text-sm text-white outline-none" />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-xs font-semibold text-gray-400">Website</label>
            <div className="flex items-center gap-3 rounded-2xl bg-dark-card px-4 py-3 ring-1 ring-dark-border focus-within:ring-neon-purple/40">
              <Globe size={16} className="text-gray-500" />
              <input value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourportfolio.com" className="w-full bg-transparent text-sm text-white outline-none" />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-xs font-semibold text-gray-400">Bio</label>
            <div className="flex gap-3 rounded-2xl bg-dark-card px-4 py-3 ring-1 ring-dark-border focus-within:ring-neon-purple/40">
              <FileText size={16} className="mt-1 text-gray-500" />
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={5} placeholder="Tell people about your creative work, business, or what you're here to do." className="w-full resize-none bg-transparent text-sm text-white outline-none" />
            </div>
          </div>

          {error && <p className="mt-5 text-sm text-red-300">{error}</p>}
          {message && <p className="mt-5 text-sm text-neon-cyan">{message}</p>}

          <button type="submit" disabled={saving} className="mt-6 inline-flex items-center rounded-2xl bg-gradient-to-r from-neon-purple to-neon-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neon-purple/20 transition-all hover:shadow-neon-purple/35">
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="glass rounded-3xl p-8">
          <h2 className="font-display text-xl font-bold">Account Overview</h2>
          <div className="mt-6 grid gap-4">
            <InfoCard label="Email" value={profile?.email || currentUser.email} />
            <InfoCard label="Role" value={profile?.role === "client" ? "Client" : "Creator"} />
            <InfoCard
              label="Member Since"
              value={new Date(profile?.createdAt || Date.now()).toLocaleDateString(undefined, { month: "short", year: "numeric" })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-dark-border bg-dark-card/70 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className="mt-2 text-sm text-white">{value}</p>
    </div>
  );
}

/* ── My Jobs Tab ── */

function MyJobsTab({
  jobs,
  currentUser,
}: {
  jobs: StoredJob[];
  currentUser: SessionUser;
}) {
  const [editingJob, setEditingJob] = useState<StoredJob | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  const handleDelete = async (jobId: string) => {
    setDeletingId(jobId);
    setActionError("");
    const result = await deleteJob(jobId, currentUser.id);
    if (!result.ok) setActionError(result.error);
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="glass rounded-3xl p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">My Jobs</h1>
            <p className="mt-2 text-sm text-gray-400">
              {jobs.length === 0
                ? "You haven't posted any jobs yet."
                : `You have ${jobs.length} job${jobs.length === 1 ? "" : "s"} posted.`}
            </p>
          </div>
          <Link
            to="/post-job"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-neon-purple to-neon-cyan px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-neon-purple/20"
          >
            <Plus size={14} /> Post New Job
          </Link>
        </div>
      </div>

      {actionError && (
        <div className="glass rounded-2xl border border-red-500/20 p-4">
          <p className="text-sm text-red-300">{actionError}</p>
        </div>
      )}

      {jobs.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <Briefcase size={40} className="mx-auto text-gray-500" />
          <h2 className="mt-4 font-display text-xl font-bold">No jobs posted yet</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-gray-400">
            Your posted jobs will appear here. Start by creating your first job listing.
          </p>
          <Link
            to="/post-job"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-neon-purple to-neon-cyan px-6 py-3 text-sm font-semibold text-white"
          >
            <Plus size={14} /> Post Your First Job
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-lg font-bold truncate">{job.title}</h3>
                    {job.urgent && (
                      <span className="rounded-full bg-red-500/15 px-2.5 py-0.5 text-[10px] font-bold text-red-400">
                        URGENT
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-gray-400 line-clamp-2">{job.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-neon-purple/10 px-3 py-1 text-xs font-semibold text-neon-purple">
                      {job.category}
                    </span>
                    <span className="rounded-full bg-dark-card px-3 py-1 text-xs text-gray-400">
                      {job.budget}
                    </span>
                    <span className="rounded-full bg-dark-card px-3 py-1 text-xs text-gray-400">
                      {job.delivery}
                    </span>
                    {job.location && (
                      <span className="rounded-full bg-dark-card px-3 py-1 text-xs text-gray-400">
                        {job.location}
                      </span>
                    )}
                  </div>
                  {job.skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {job.skills.map((skill) => (
                        <span key={skill} className="rounded-full bg-neon-cyan/8 px-2 py-0.5 text-[10px] font-medium text-neon-cyan">
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                    <span>{job.postedAgo}</span>
                    <span>{job.proposals} proposal{job.proposals === 1 ? "" : "s"}</span>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    onClick={() => setEditingJob(job)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-dark-border text-gray-400 transition-colors hover:border-neon-purple/40 hover:text-neon-purple"
                    title="Edit job"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => void handleDelete(job.id)}
                    disabled={deletingId === job.id}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-dark-border text-gray-400 transition-colors hover:border-red-500/40 hover:text-red-400 disabled:opacity-40"
                    title="Delete job"
                  >
                    {deletingId === job.id ? (
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    ) : (
                      <Trash2 size={14} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <AnimatePresence>
        {editingJob && (
          <EditJobModal
            job={editingJob}
            userId={currentUser.id}
            onClose={() => setEditingJob(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Edit Job Modal ── */

function EditJobModal({
  job,
  userId,
  onClose,
}: {
  job: StoredJob;
  userId: string;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(job.title);
  const [description, setDescription] = useState(job.description);
  const [budget, setBudget] = useState(job.budget);
  const [category, setCategory] = useState(job.category);
  const [delivery, setDelivery] = useState(job.delivery);
  const [location, setLocation] = useState(job.location);
  const [skillsText, setSkillsText] = useState(job.skills.join(", "));
  const [urgent, setUrgent] = useState(job.urgent);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Job title is required.");
      return;
    }
    setSaving(true);
    const skills = skillsText
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const result = await updateJob(job.id, userId, {
      title,
      description,
      budget,
      category,
      delivery,
      location,
      skills,
      urgent,
    });
    if (!result.ok) {
      setError(result.error);
      setSaving(false);
      return;
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl p-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">Edit Job</h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-400">Job Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-2xl bg-dark-card px-4 py-3 text-sm text-white ring-1 ring-dark-border outline-none focus:ring-neon-purple/40"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-400">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-2xl bg-dark-card px-4 py-3 text-sm text-white ring-1 ring-dark-border outline-none focus:ring-neon-purple/40"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-400">Budget</label>
              <input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-2xl bg-dark-card px-4 py-3 text-sm text-white ring-1 ring-dark-border outline-none focus:ring-neon-purple/40"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-400">Category</label>
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-2xl bg-dark-card px-4 py-3 text-sm text-white ring-1 ring-dark-border outline-none focus:ring-neon-purple/40"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-400">Delivery</label>
              <input
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                className="w-full rounded-2xl bg-dark-card px-4 py-3 text-sm text-white ring-1 ring-dark-border outline-none focus:ring-neon-purple/40"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold text-gray-400">Location</label>
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-2xl bg-dark-card px-4 py-3 text-sm text-white ring-1 ring-dark-border outline-none focus:ring-neon-purple/40"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-gray-400">Skills (comma-separated)</label>
            <input
              value={skillsText}
              onChange={(e) => setSkillsText(e.target.value)}
              placeholder="React, Design, Video Editing..."
              className="w-full rounded-2xl bg-dark-card px-4 py-3 text-sm text-white ring-1 ring-dark-border outline-none focus:ring-neon-purple/40"
            />
          </div>

          <label className="flex items-center gap-3">
            <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} className="h-4 w-4 rounded border-dark-border accent-neon-purple" />
            <span className="text-sm text-gray-300">Mark as urgent</span>
          </label>

          {error && <p className="text-sm text-red-300">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center rounded-2xl bg-gradient-to-r from-neon-purple to-neon-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neon-purple/20"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-2xl border border-dark-border px-6 py-3 text-sm font-medium text-white hover:border-neon-purple/30"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

/* ── Settings Tab ── */

function SettingsTab({
  profile,
  currentUser,
}: {
  profile: AccountProfile | null;
  currentUser: SessionUser;
}) {
  const [settings, setSettings] = useState<AccountSettings | null>(profile?.settings || null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (profile?.settings) setSettings(profile.settings);
  }, [profile]);

  const setField = (field: keyof AccountSettings) => (e: ChangeEvent<HTMLInputElement>) => {
    setSettings((c) => (c ? { ...c, [field]: e.target.checked } : c));
  };

  const handleSave = async () => {
    if (!currentUser || !settings) return;
    setSaving(true);
    const result = await updateAccountSettings(currentUser, settings);
    if (!result.ok) {
      setError(result.error);
      setMessage("");
    } else {
      setError("");
      setMessage("Settings updated successfully.");
    }
    setSaving(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div className="glass rounded-3xl p-8">
          <div className="flex items-center gap-3">
            <Bell size={18} className="text-neon-cyan" />
            <h1 className="font-display text-3xl font-bold">Settings</h1>
          </div>
          <p className="mt-3 text-sm text-gray-400">
            Control how Creator Adda contacts you and how visible your account is.
          </p>
        </div>

        <div className="glass rounded-3xl p-8">
          <div className="flex items-center gap-3">
            <SlidersHorizontal size={18} className="text-neon-purple" />
            <h2 className="font-display text-xl font-bold">Preferences</h2>
          </div>
          <div className="mt-6 space-y-4">
            <ToggleRow
              label="Email notifications"
              description="Receive updates when someone interacts with your account."
              checked={Boolean(settings?.emailNotifications)}
              onChange={setField("emailNotifications")}
            />
            <ToggleRow
              label="Project alerts"
              description="Get notified about new jobs and proposals relevant to your role."
              checked={Boolean(settings?.projectAlerts)}
              onChange={setField("projectAlerts")}
            />
            <ToggleRow
              label="Marketing emails"
              description="Product updates, tips, launches, and curated opportunities."
              checked={Boolean(settings?.marketingEmails)}
              onChange={setField("marketingEmails")}
            />
            <ToggleRow
              label="Public profile visibility"
              description="Allow your profile to be visible across Creator Adda."
              checked={Boolean(settings?.profileVisible)}
              onChange={setField("profileVisible")}
            />
          </div>

          {error && <p className="mt-5 text-sm text-red-300">{error}</p>}
          {message && <p className="mt-5 text-sm text-neon-cyan">{message}</p>}

          <button
            onClick={() => void handleSave()}
            disabled={saving}
            className="mt-6 inline-flex items-center rounded-2xl bg-gradient-to-r from-neon-purple to-neon-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neon-purple/20 transition-all hover:shadow-neon-purple/35"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="glass rounded-3xl p-8">
          <div className="flex items-center gap-3">
            <ShieldCheck size={18} className="text-neon-cyan" />
            <h2 className="font-display text-xl font-bold">Account Actions</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-gray-400">
            Manage your account access and sign out safely.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => void logoutUser()}
              className="rounded-2xl border border-dark-border px-5 py-3 text-left text-sm text-white transition-colors hover:border-red-500/30 hover:text-red-400"
            >
              Sign out of this account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-2xl border border-dark-border bg-dark-card/70 p-4">
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="mt-1 text-xs leading-relaxed text-gray-400">{description}</p>
      </div>
      <span className="relative mt-0.5 inline-flex h-6 w-11 shrink-0 items-center">
        <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
        <span className="absolute inset-0 rounded-full bg-dark-border transition peer-checked:bg-neon-purple/60" />
        <span className="absolute left-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

/* ── Main Dashboard ── */

export default function AccountDashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as Tab) || "overview";

  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [jobs, setJobs] = useState<StoredJob[]>([]);

  useEffect(() => subscribeToAuthUser(setCurrentUser), []);

  useEffect(() => {
    if (!currentUser) {
      setProfile(null);
      setJobs([]);
      return;
    }
    const unsubProfile = subscribeToAccountProfile(currentUser, setProfile);
    const unsubJobs = subscribeToUserJobs(currentUser.id, setJobs);
    return () => {
      unsubProfile();
      unsubJobs();
    };
  }, [currentUser]);

  const switchTab = (tab: Tab) => {
    setSearchParams({ tab });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!currentUser) return <AccountGate />;

  return (
    <div className="min-h-screen bg-grid pt-24 pb-20">
      <div className="pointer-events-none absolute right-0 top-24 h-[440px] w-[440px] rounded-full bg-neon-purple/6 blur-[160px]" />
      <div className="pointer-events-none absolute left-0 top-80 h-[300px] w-[300px] rounded-full bg-neon-cyan/4 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-neon-purple/15 font-semibold text-neon-purple ring-1 ring-neon-purple/30"
                    : "border border-dark-border text-gray-300 hover:border-neon-purple/30 hover:text-white"
                }`}
              >
                <Icon size={15} />
                {tab.label}
                {tab.id === "jobs" && jobs.length > 0 && (
                  <span className="ml-1 rounded-full bg-neon-purple/20 px-1.5 py-0.5 text-[10px] font-bold text-neon-purple">
                    {jobs.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "overview" && (
              <OverviewTab profile={profile} currentUser={currentUser} jobs={jobs} switchTab={switchTab} />
            )}
            {activeTab === "profile" && (
              <ProfileTab profile={profile} currentUser={currentUser} />
            )}
            {activeTab === "jobs" && (
              <MyJobsTab jobs={jobs} currentUser={currentUser} />
            )}
            {activeTab === "settings" && (
              <SettingsTab profile={profile} currentUser={currentUser} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
