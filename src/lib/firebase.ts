import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";

export type UserRole = "creator" | "client";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AccountSettings {
  emailNotifications: boolean;
  projectAlerts: boolean;
  marketingEmails: boolean;
  profileVisible: boolean;
}

export interface AccountProfile extends SessionUser {
  headline: string;
  bio: string;
  location: string;
  website: string;
  photoURL: string;
  createdAt: string;
  settings: AccountSettings;
}

export interface StoredJob {
  id: string;
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
  source: "custom";
  clientId: string;
  clientName: string;
}

interface UserDocument {
  name?: string;
  email?: string;
  role?: UserRole;
  headline?: string;
  bio?: string;
  location?: string;
  website?: string;
  photoURL?: string;
  createdAt?: Timestamp | null;
  settings?: Partial<AccountSettings>;
}

interface JobDocument {
  title?: string;
  description?: string;
  budget?: string;
  category?: string;
  delivery?: string;
  location?: string;
  skills?: string[];
  proposals?: number;
  urgent?: boolean;
  createdAt?: Timestamp | null;
  clientId?: string;
  clientName?: string;
}

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "REDACTED_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "firstweb-df640.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "firstweb-df640",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "firstweb-df640.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "REDACTED_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "REDACTED_APP_ID",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "REDACTED_MEASUREMENT_ID",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

if (typeof window !== "undefined" && firebaseConfig.measurementId) {
  void isAnalyticsSupported()
    .then((supported) => {
      if (supported) {
        getAnalytics(app);
      }
    })
    .catch(() => undefined);
}

export const auth = getAuth(app);
export const db = getFirestore(app);

const authPersistenceReady = setPersistence(auth, browserLocalPersistence).catch(() => undefined);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

const githubProvider = new GithubAuthProvider();
githubProvider.addScope("user:email");

const defaultAccountSettings: AccountSettings = {
  emailNotifications: true,
  projectAlerts: true,
  marketingEmails: false,
  profileVisible: true,
};

function getErrorCode(error: unknown) {
  if (typeof error === "object" && error && "code" in error) {
    return String((error as { code?: unknown }).code);
  }

  return "";
}

function formatAuthError(error: unknown, fallback: string) {
  const code = getErrorCode(error);

  switch (code) {
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/invalid-email":
      return "Enter a valid email address.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Invalid email or password.";
    case "auth/weak-password":
      return "Password should be at least 6 characters long.";
    case "auth/popup-closed-by-user":
      return "The sign-in popup was closed before completing authentication.";
    case "auth/popup-blocked":
      return "The browser blocked the Google sign-in popup. Allow popups for this site and try again.";
    case "auth/cancelled-popup-request":
      return "Another sign-in popup is already open.";
    case "auth/account-exists-with-different-credential":
      return "An account already exists with the same email using a different sign-in method.";
    case "auth/operation-not-allowed":
      return "This sign-in method is not enabled in Firebase Authentication yet.";
    case "auth/unauthorized-domain":
      return "This domain is not authorized for Firebase Authentication. Add it under Authentication > Settings > Authorized domains.";
    default:
      return code ? `${fallback} (${code})` : fallback;
  }
}

function formatFirestoreError(error: unknown, fallback: string) {
  switch (getErrorCode(error)) {
    case "permission-denied":
      return "Firestore permissions blocked this request. Check your Firebase rules.";
    case "unavailable":
      return "Firestore is unavailable right now. Make sure the Firestore database exists in Firebase Console, then try again.";
    default:
      return getErrorCode(error) ? `${fallback} (${getErrorCode(error)})` : fallback;
  }
}

function getDefaultName(user: User) {
  if (user.displayName?.trim()) return user.displayName.trim();
  if (user.email) return user.email.split("@")[0];
  return "Creator Adda User";
}

function buildFallbackSessionUser(user: User, fallbackRole: UserRole = "creator", preferredName?: string): SessionUser {
  return {
    id: user.uid,
    name: preferredName?.trim() || getDefaultName(user),
    email: user.email || "",
    role: fallbackRole,
  };
}

function buildAccountProfile(id: string, data: UserDocument, fallback: SessionUser): AccountProfile {
  return {
    id,
    name: data.name?.trim() || fallback.name,
    email: data.email || fallback.email,
    role: data.role === "client" ? "client" : fallback.role,
    headline: data.headline?.trim() || (fallback.role === "creator" ? "Creator on Creator Adda" : "Hiring on Creator Adda"),
    bio: data.bio?.trim() || "",
    location: data.location?.trim() || "",
    website: data.website?.trim() || "",
    photoURL: data.photoURL?.trim() || "",
    createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
    settings: {
      ...defaultAccountSettings,
      ...(data.settings || {}),
    },
  };
}

async function resolveSessionUser(user: User, fallbackRole: UserRole = "creator", preferredName?: string) {
  try {
    const sessionUser = await ensureUserDocument(user, fallbackRole, preferredName);
    return { ok: true as const, user: sessionUser, degraded: false as const };
  } catch (error) {
    return {
      ok: true as const,
      user: buildFallbackSessionUser(user, fallbackRole, preferredName),
      degraded: true as const,
      warning: formatFirestoreError(error, "Your account signed in, but profile sync with Firestore failed."),
    };
  }
}

async function ensureUserDocument(user: User, fallbackRole: UserRole = "creator", preferredName?: string) {
  if (!user.email) {
    throw new Error("This Firebase account does not expose an email address.");
  }

  const userRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const name = preferredName?.trim() || getDefaultName(user);
    await setDoc(userRef, {
      name,
      email: user.email,
      role: fallbackRole,
      headline: fallbackRole === "creator" ? "Creator on Creator Adda" : "Hiring on Creator Adda",
      bio: "",
      location: "",
      website: "",
      photoURL: user.photoURL || "",
      settings: defaultAccountSettings,
      createdAt: serverTimestamp(),
    });

    return {
      id: user.uid,
      name,
      email: user.email,
      role: fallbackRole,
    } satisfies SessionUser;
  }

  const data = snapshot.data() as UserDocument;
  const sessionUser: SessionUser = {
    id: user.uid,
    name: data.name?.trim() || preferredName?.trim() || getDefaultName(user),
    email: data.email || user.email,
    role: data.role === "client" ? "client" : "creator",
  };

  if (data.name !== sessionUser.name || data.email !== sessionUser.email) {
    await setDoc(
      userRef,
      {
        name: sessionUser.name,
        email: sessionUser.email,
        photoURL: user.photoURL || data.photoURL || "",
      },
      { merge: true },
    );
  }

  return sessionUser;
}

function formatTimeAgo(timestamp?: Timestamp | null) {
  if (!timestamp) return "Just now";

  const diffMs = Date.now() - timestamp.toDate().getTime();
  const diffMinutes = Math.max(1, Math.floor(diffMs / 60000));

  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? "" : "s"} ago`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 5) return `${diffWeeks} week${diffWeeks === 1 ? "" : "s"} ago`;

  const diffMonths = Math.floor(diffDays / 30);
  return `${Math.max(1, diffMonths)} month${diffMonths === 1 ? "" : "s"} ago`;
}

function mapJobDocument(id: string, data: JobDocument): StoredJob {
  const createdAt = data.createdAt ?? null;

  return {
    id,
    title: data.title || "Untitled Job",
    description: data.description || "",
    budget: data.budget || "Open / Negotiable",
    category: data.category || "General",
    delivery: data.delivery || "Flexible",
    location: data.location || "Remote",
    skills: Array.isArray(data.skills) ? data.skills : [],
    proposals: Number.isFinite(data.proposals) ? Number(data.proposals) : 0,
    postedAgo: formatTimeAgo(createdAt),
    urgent: Boolean(data.urgent),
    createdAt: createdAt ? createdAt.toDate().toISOString() : new Date().toISOString(),
    source: "custom",
    clientId: data.clientId || "",
    clientName: data.clientName || "Creator Adda Client",
  };
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}) {
  try {
    await authPersistenceReady;
    const credential = await createUserWithEmailAndPassword(auth, input.email.trim(), input.password);
    await updateProfile(credential.user, { displayName: input.name.trim() });
    const result = await resolveSessionUser(credential.user, input.role, input.name.trim());
    return result.warning
      ? { ok: true as const, user: result.user, warning: result.warning }
      : { ok: true as const, user: result.user };
  } catch (error) {
    return { ok: false as const, error: formatAuthError(error, "Unable to create your account right now.") };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    await authPersistenceReady;
    const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
    const result = await resolveSessionUser(credential.user);
    return result.warning
      ? { ok: true as const, user: result.user, warning: result.warning }
      : { ok: true as const, user: result.user };
  } catch (error) {
    return { ok: false as const, error: formatAuthError(error, "Unable to sign in right now.") };
  }
}

export async function signInWithProvider(provider: "google" | "github") {
  try {
    await authPersistenceReady;
    const credential = await signInWithPopup(auth, provider === "google" ? googleProvider : githubProvider);
    const result = await resolveSessionUser(credential.user);
    return result.warning
      ? { ok: true as const, user: result.user, warning: result.warning }
      : { ok: true as const, user: result.user };
  } catch (error) {
    return { ok: false as const, error: formatAuthError(error, `Unable to sign in with ${provider}.`) };
  }
}

export async function logoutUser() {
  await signOut(auth);
}

export function subscribeToAuthUser(callback: (user: SessionUser | null) => void) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      callback(null);
      return;
    }

    const result = await resolveSessionUser(user);
    if (result.degraded) {
      console.warn(result.warning);
    }
    callback(result.user);
  });
}

export function subscribeToAccountProfile(
  sessionUser: SessionUser,
  callback: (profile: AccountProfile) => void,
) {
  const userRef = doc(db, "users", sessionUser.id);

  return onSnapshot(
    userRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        callback(
          buildAccountProfile(sessionUser.id, {}, sessionUser),
        );
        return;
      }

      callback(buildAccountProfile(sessionUser.id, snapshot.data() as UserDocument, sessionUser));
    },
    () => {
      callback(buildAccountProfile(sessionUser.id, {}, sessionUser));
    },
  );
}

export async function updateAccountProfile(
  sessionUser: SessionUser,
  input: Pick<AccountProfile, "name" | "headline" | "bio" | "location" | "website">,
) {
  try {
    const userRef = doc(db, "users", sessionUser.id);
    const name = input.name.trim();

    await setDoc(
      userRef,
      {
        name,
        email: sessionUser.email,
        role: sessionUser.role,
        headline: input.headline.trim(),
        bio: input.bio.trim(),
        location: input.location.trim(),
        website: input.website.trim(),
      },
      { merge: true },
    );

    if (auth.currentUser && auth.currentUser.uid === sessionUser.id && auth.currentUser.displayName !== name) {
      await updateProfile(auth.currentUser, { displayName: name });
    }

    return { ok: true as const };
  } catch (error) {
    return { ok: false as const, error: formatFirestoreError(error, "Unable to save your profile right now.") };
  }
}

export async function updateAccountSettings(
  sessionUser: SessionUser,
  settings: AccountSettings,
) {
  try {
    const userRef = doc(db, "users", sessionUser.id);
    await setDoc(
      userRef,
      {
        email: sessionUser.email,
        role: sessionUser.role,
        settings,
      },
      { merge: true },
    );

    return { ok: true as const };
  } catch (error) {
    return { ok: false as const, error: formatFirestoreError(error, "Unable to save your settings right now.") };
  }
}

export async function saveJob(
  input: Omit<StoredJob, "id" | "proposals" | "postedAgo" | "createdAt" | "source" | "clientId" | "clientName">,
  currentUser: SessionUser,
) {
  try {
    const payload = {
      title: input.title.trim(),
      description: input.description.trim(),
      budget: input.budget,
      category: input.category,
      delivery: input.delivery,
      location: input.location.trim() || "Remote",
      skills: input.skills,
      urgent: Boolean(input.urgent),
      proposals: 0,
      clientId: currentUser.id,
      clientName: currentUser.name,
      createdAt: serverTimestamp(),
    };

    const documentRef = await addDoc(collection(db, "jobs"), payload);

    return {
      ok: true as const,
      job: {
        id: documentRef.id,
        ...payload,
        createdAt: new Date().toISOString(),
        postedAgo: "Just now",
        source: "custom" as const,
      },
    };
  } catch (error) {
    return { ok: false as const, error: formatFirestoreError(error, "Unable to post the job right now.") };
  }
}

export function subscribeToJobs(callback: (jobs: StoredJob[]) => void) {
  const jobsQuery = query(collection(db, "jobs"), orderBy("createdAt", "desc"));

  return onSnapshot(
    jobsQuery,
    (snapshot) => {
      callback(snapshot.docs.map((job) => mapJobDocument(job.id, job.data() as JobDocument)));
    },
    (error) => {
      console.error("Failed to load Firestore jobs.", error);
      callback([]);
    },
  );
}

export function subscribeToUserJobs(userId: string, callback: (jobs: StoredJob[]) => void) {
  const userJobsQuery = query(
    collection(db, "jobs"),
    where("clientId", "==", userId),
    orderBy("createdAt", "desc"),
  );

  return onSnapshot(
    userJobsQuery,
    (snapshot) => {
      callback(snapshot.docs.map((j) => mapJobDocument(j.id, j.data() as JobDocument)));
    },
    (error) => {
      console.error("Failed to load user jobs.", error);
      callback([]);
    },
  );
}

export async function deleteJob(jobId: string, userId: string) {
  try {
    const jobRef = doc(db, "jobs", jobId);
    const snapshot = await getDoc(jobRef);
    if (!snapshot.exists()) return { ok: true as const };
    const data = snapshot.data() as JobDocument;
    if (data.clientId !== userId) {
      return { ok: false as const, error: "You can only delete your own jobs." };
    }
    await deleteDoc(jobRef);
    return { ok: true as const };
  } catch (error) {
    return { ok: false as const, error: formatFirestoreError(error, "Unable to delete this job right now.") };
  }
}

export async function updateJob(
  jobId: string,
  userId: string,
  input: { title: string; description: string; budget: string; category: string; delivery: string; location: string; skills: string[]; urgent: boolean },
) {
  try {
    const jobRef = doc(db, "jobs", jobId);
    const snapshot = await getDoc(jobRef);
    if (!snapshot.exists()) return { ok: false as const, error: "This job no longer exists." };
    const data = snapshot.data() as JobDocument;
    if (data.clientId !== userId) {
      return { ok: false as const, error: "You can only edit your own jobs." };
    }
    await setDoc(
      jobRef,
      {
        title: input.title.trim(),
        description: input.description.trim(),
        budget: input.budget,
        category: input.category,
        delivery: input.delivery,
        location: input.location.trim() || "Remote",
        skills: input.skills,
        urgent: Boolean(input.urgent),
      },
      { merge: true },
    );
    return { ok: true as const };
  } catch (error) {
    return { ok: false as const, error: formatFirestoreError(error, "Unable to update this job right now.") };
  }
}