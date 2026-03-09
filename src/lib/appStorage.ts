export interface StoredUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: "creator" | "client";
  createdAt: string;
}

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  role: "creator" | "client";
}

export interface StoredJob {
  id: number;
  title: string;
  description: string;
  budget: string;
  category: string;
  delivery: string;
  location: string;
  skills: string[];
  proposals: number;
  postedAgo: string;
  urgent: boolean;
  createdAt: string;
  source: "seed" | "custom";
}

const USERS_KEY = "creator-adda-users";
const SESSION_KEY = "creator-adda-session";
const JOBS_KEY = "creator-adda-jobs";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function emit(eventName: string) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(eventName));
  }
}

export function getUsers() {
  return readJson<StoredUser[]>(USERS_KEY, []);
}

export function getCurrentUser() {
  return readJson<SessionUser | null>(SESSION_KEY, null);
}

export function registerUser(input: Omit<StoredUser, "id" | "createdAt">) {
  const users = getUsers();
  const email = input.email.trim().toLowerCase();

  if (users.some((user) => user.email.toLowerCase() === email)) {
    return { ok: false as const, error: "An account with this email already exists." };
  }

  const user: StoredUser = {
    ...input,
    email,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  writeJson(USERS_KEY, users);

  const session: SessionUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  writeJson(SESSION_KEY, session);
  emit("creator-adda-auth-changed");

  return { ok: true as const, user: session };
}

export function loginUser(email: string, password: string) {
  const users = getUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const matchedUser = users.find(
    (user) => user.email.toLowerCase() === normalizedEmail && user.password === password,
  );

  if (!matchedUser) {
    return { ok: false as const, error: "Invalid email or password." };
  }

  const session: SessionUser = {
    id: matchedUser.id,
    name: matchedUser.name,
    email: matchedUser.email,
    role: matchedUser.role,
  };

  writeJson(SESSION_KEY, session);
  emit("creator-adda-auth-changed");

  return { ok: true as const, user: session };
}

export function loginDemoUser(provider: "google" | "github") {
  const demoName = provider === "google" ? "Google Demo User" : "GitHub Demo User";
  const demoEmail = provider === "google" ? "google.demo@creatoradda.com" : "github.demo@creatoradda.com";
  const existing = getUsers().find((user) => user.email === demoEmail);

  if (existing) {
    return loginUser(existing.email, existing.password);
  }

  return registerUser({
    name: demoName,
    email: demoEmail,
    password: `demo-${provider}-password`,
    role: "creator",
  });
}

export function logoutUser() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(SESSION_KEY);
  emit("creator-adda-auth-changed");
}

export function getCustomJobs() {
  return readJson<StoredJob[]>(JOBS_KEY, []);
}

export function saveCustomJob(input: Omit<StoredJob, "id" | "proposals" | "postedAgo" | "createdAt" | "source">) {
  const jobs = getCustomJobs();
  const job: StoredJob = {
    ...input,
    id: Date.now(),
    proposals: 0,
    postedAgo: "Just now",
    createdAt: new Date().toISOString(),
    source: "custom",
  };

  jobs.unshift(job);
  writeJson(JOBS_KEY, jobs);
  emit("creator-adda-jobs-changed");
  return job;
}
