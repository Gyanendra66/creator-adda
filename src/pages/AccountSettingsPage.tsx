import { useEffect, useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bell, ShieldCheck, SlidersHorizontal, UserRound } from "lucide-react";
import {
  logoutUser,
  subscribeToAccountProfile,
  subscribeToAuthUser,
  updateAccountSettings,
  type AccountProfile,
  type AccountSettings,
  type SessionUser,
} from "../lib/firebase";

function AccountGate() {
  return (
    <div className="min-h-screen bg-grid pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl p-8 text-center sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan">
            <SlidersHorizontal size={28} className="text-white" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold">Sign in to manage settings</h1>
          <p className="mt-3 text-sm text-gray-400">Your account preferences are only available after login.</p>
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
      <Link to="/account/profile" className="rounded-xl border border-dark-border px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:border-neon-purple/30 hover:text-white">
        Profile
      </Link>
      <Link to="/account/settings" className="rounded-xl bg-neon-purple/15 px-4 py-2 text-sm font-semibold text-neon-purple ring-1 ring-neon-purple/30">
        Settings
      </Link>
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
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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

export default function AccountSettingsPage() {
  const [currentUser, setCurrentUser] = useState<SessionUser | null>(null);
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [settings, setSettings] = useState<AccountSettings | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => subscribeToAuthUser(setCurrentUser), []);

  useEffect(() => {
    if (!currentUser) {
      setProfile(null);
      setSettings(null);
      return;
    }

    return subscribeToAccountProfile(currentUser, (nextProfile) => {
      setProfile(nextProfile);
      setSettings(nextProfile.settings);
    });
  }, [currentUser]);

  const setField = (field: keyof AccountSettings) => (event: ChangeEvent<HTMLInputElement>) => {
    setSettings((current) => (current ? { ...current, [field]: event.target.checked } : current));
  };

  const handleSave = async () => {
    if (!currentUser || !settings) {
      setError("Sign in first to update your settings.");
      return;
    }

    setSaving(true);
    const result = await updateAccountSettings(currentUser, settings);
    if (!result.ok) {
      setError(result.error);
      setMessage("");
      setSaving(false);
      return;
    }

    setError("");
    setMessage("Your settings have been updated.");
    setSaving(false);
  };

  if (!currentUser) {
    return <AccountGate />;
  }

  return (
    <div className="min-h-screen bg-grid pt-24 pb-20">
      <div className="pointer-events-none absolute left-0 top-32 h-[440px] w-[440px] rounded-full bg-neon-cyan/6 blur-[160px]" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AccountNav />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8">
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-neon-cyan" />
                <h1 className="font-display text-3xl font-bold">Account Settings</h1>
              </div>
              <p className="mt-3 text-sm text-gray-400">
                Control how Creator Adda contacts you and how visible your account is on the platform.
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
                  description="Receive updates when someone interacts with your account or activity on the platform changes."
                  checked={Boolean(settings?.emailNotifications)}
                  onChange={setField("emailNotifications")}
                />
                <ToggleRow
                  label="Project alerts"
                  description="Get notified about new jobs, proposals, and account activity relevant to your role."
                  checked={Boolean(settings?.projectAlerts)}
                  onChange={setField("projectAlerts")}
                />
                <ToggleRow
                  label="Marketing emails"
                  description="Receive occasional product updates, tips, launch announcements, and curated opportunities."
                  checked={Boolean(settings?.marketingEmails)}
                  onChange={setField("marketingEmails")}
                />
                <ToggleRow
                  label="Public profile visibility"
                  description="Allow your account profile details to stay visible across the Creator Adda experience."
                  checked={Boolean(settings?.profileVisible)}
                  onChange={setField("profileVisible")}
                />
              </div>

              {error && <p className="mt-5 text-sm text-red-300">{error}</p>}
              {message && <p className="mt-5 text-sm text-neon-cyan">{message}</p>}

              <button onClick={() => void handleSave()} disabled={saving} className="mt-6 inline-flex items-center rounded-2xl bg-gradient-to-r from-neon-purple to-neon-cyan px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-neon-purple/20 transition-all hover:shadow-neon-purple/35">
                {saving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass rounded-3xl p-8">
              <div className="flex items-center gap-3">
                <UserRound size={18} className="text-neon-purple" />
                <h2 className="font-display text-xl font-bold">Account Summary</h2>
              </div>
              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl border border-dark-border bg-dark-card/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Name</p>
                  <p className="mt-2 text-sm text-white">{profile?.name || currentUser.name}</p>
                </div>
                <div className="rounded-2xl border border-dark-border bg-dark-card/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Email</p>
                  <p className="mt-2 text-sm text-white">{profile?.email || currentUser.email}</p>
                </div>
                <div className="rounded-2xl border border-dark-border bg-dark-card/70 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Role</p>
                  <p className="mt-2 text-sm text-white">{profile?.role === "client" ? "Client" : "Creator"}</p>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-8">
              <div className="flex items-center gap-3">
                <ShieldCheck size={18} className="text-neon-cyan" />
                <h2 className="font-display text-xl font-bold">Account Actions</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-400">
                Password changes and more advanced security controls can be added next. For now, you can manage your core preferences and sign out safely from here.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <Link to="/account/profile" className="rounded-2xl border border-dark-border px-5 py-3 text-sm text-white transition-colors hover:border-neon-purple/30">
                  Edit profile details
                </Link>
                <button onClick={() => void logoutUser()} className="rounded-2xl border border-dark-border px-5 py-3 text-left text-sm text-white transition-colors hover:border-neon-cyan/30">
                  Sign out of this account
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}