import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import type {
  User,
  Announcement,
  UnitProgress,
  QuizAttempt,
  TestAttempt,
  FlashcardSession,
} from "@/types";
import { hashPassword } from "./auth";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const ANNOUNCEMENTS_FILE = path.join(DATA_DIR, "announcements.json");
const PROGRESS_FILE = path.join(DATA_DIR, "progress.json");
const ATTEMPTS_FILE = path.join(DATA_DIR, "attempts.json");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    await ensureDataDir();
    const raw = await fs.readFile(file, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(file, JSON.stringify(data, null, 2), "utf-8");
}

// ─── Users ───────────────────────────────────────────────

export async function getUsers(): Promise<User[]> {
  return readJson<User[]>(USERS_FILE, []);
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getUsers();
  return users.find((u) => u.id === id) || null;
}

export async function createUser(input: {
  email: string;
  username: string;
  password: string;
  displayName: string;
  role?: User["role"];
  tier?: User["tier"];
}): Promise<User> {
  const users = await getUsers();
  if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
    throw new Error("Email already registered");
  }
  if (users.some((u) => u.username.toLowerCase() === input.username.toLowerCase())) {
    throw new Error("Username already taken");
  }

  const user: User = {
    id: randomUUID(),
    email: input.email.toLowerCase(),
    username: input.username,
    passwordHash: await hashPassword(input.password),
    role: input.role || "student",
    tier: input.tier || "basic",
    displayName: input.displayName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isActive: true,
  };

  users.push(user);
  await writeJson(USERS_FILE, users);
  return user;
}

export async function updateUser(
  id: string,
  updates: Partial<Pick<User, "tier" | "role" | "displayName" | "isActive" | "username">>
): Promise<User | null> {
  const users = await getUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = {
    ...users[idx],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  await writeJson(USERS_FILE, users);
  return users[idx];
}

export async function ensureOwnerAccount() {
  const users = await getUsers();
  const ownerExists = users.some((u) => u.role === "owner");
  if (!ownerExists) {
    await createUser({
      email: "ethan@ethanhelps.com",
      username: "ethan",
      password: "EthanOwner2026!",
      displayName: "Ethan",
      role: "owner",
      tier: "platinum",
    });
    console.log("Created default owner account: ethan@ethanhelps.com");
  }
}

// ─── Announcements ───────────────────────────────────────

export async function getAnnouncements(): Promise<Announcement[]> {
  return readJson<Announcement[]>(ANNOUNCEMENTS_FILE, []);
}

export async function createAnnouncement(
  data: Omit<Announcement, "id" | "createdAt" | "readBy">
): Promise<Announcement> {
  const list = await getAnnouncements();
  const ann: Announcement = {
    ...data,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    readBy: [],
  };
  list.unshift(ann);
  await writeJson(ANNOUNCEMENTS_FILE, list);
  return ann;
}

export async function markAnnouncementRead(id: string, userId: string) {
  const list = await getAnnouncements();
  const ann = list.find((a) => a.id === id);
  if (ann && !ann.readBy.includes(userId)) {
    ann.readBy.push(userId);
    await writeJson(ANNOUNCEMENTS_FILE, list);
  }
}

// ─── Progress ────────────────────────────────────────────

export async function getProgressForUser(userId: string): Promise<UnitProgress[]> {
  const all = await readJson<UnitProgress[]>(PROGRESS_FILE, []);
  return all.filter((p) => p.userId === userId);
}

export async function upsertProgress(progress: UnitProgress): Promise<void> {
  const all = await readJson<UnitProgress[]>(PROGRESS_FILE, []);
  const idx = all.findIndex(
    (p) => p.userId === progress.userId && p.unitId === progress.unitId
  );
  if (idx >= 0) {
    all[idx] = progress;
  } else {
    all.push(progress);
  }
  await writeJson(PROGRESS_FILE, all);
}

// ─── Attempts (for grade calculation) ────────────────────

interface AttemptsStore {
  quizzes: QuizAttempt[];
  tests: TestAttempt[];
  flashcards: FlashcardSession[];
}

async function getAttempts(): Promise<AttemptsStore> {
  return readJson<AttemptsStore>(ATTEMPTS_FILE, {
    quizzes: [],
    tests: [],
    flashcards: [],
  });
}

export async function saveQuizAttempt(attempt: QuizAttempt) {
  const store = await getAttempts();
  store.quizzes.push(attempt);
  await writeJson(ATTEMPTS_FILE, store);
}

export async function saveTestAttempt(attempt: TestAttempt) {
  const store = await getAttempts();
  store.tests.push(attempt);
  await writeJson(ATTEMPTS_FILE, store);
}

export async function saveFlashcardSession(session: FlashcardSession) {
  const store = await getAttempts();
  store.flashcards.push(session);
  await writeJson(ATTEMPTS_FILE, store);
}

export async function getQuizAttempts(userId: string, unitId?: string) {
  const store = await getAttempts();
  return store.quizzes.filter(
    (a) => a.userId === userId && (!unitId || a.unitId === unitId)
  );
}

export async function getTestAttempts(userId: string, unitId?: string) {
  const store = await getAttempts();
  return store.tests.filter(
    (a) => a.userId === userId && (!unitId || a.unitId === unitId)
  );
}
