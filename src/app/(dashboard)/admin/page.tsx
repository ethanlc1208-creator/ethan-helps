"use client";

import { useEffect, useState } from "react";

interface SafeUser {
  id: string;
  email: string;
  username: string;
  role: string;
  tier: string;
  displayName: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<SafeUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
    displayName: "",
    role: "student",
    tier: "basic",
  });
  const [saving, setSaving] = useState(false);

  async function loadUsers() {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    if (!res.ok) {
      setError("Failed to load users");
      setLoading(false);
      return;
    }
    const data = await res.json();
    setUsers(data.users);
    setLoading(false);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  async function createUser(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Failed to create user");
      return;
    }
    setShowForm(false);
    setForm({
      email: "",
      username: "",
      password: "",
      displayName: "",
      role: "student",
      tier: "basic",
    });
    loadUsers();
  }

  async function updateTier(id: string, tier: string) {
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, tier }),
    });
    loadUsers();
  }

  async function toggleActive(id: string, isActive: boolean) {
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isActive: !isActive }),
    });
    loadUsers();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Users & Subscriptions</h1>
          <p className="text-sm text-[var(--text-muted)]">
            Create accounts and assign Ethan&apos;s Basic / Premium / Platinum
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Create User"}
        </button>
      </div>

      {error && (
        <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {showForm && (
        <form onSubmit={createUser} className="card p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Display Name</label>
            <input
              className="input"
              value={form.displayName}
              onChange={(e) => setForm({ ...form, displayName: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              className="input"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="input"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={8}
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Role</label>
            <select
              className="input"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Subscription Tier</label>
            <select
              className="input"
              value={form.tier}
              onChange={(e) => setForm({ ...form, tier: e.target.value })}
            >
              <option value="basic">Ethan&apos;s Basic</option>
              <option value="premium">Ethan&apos;s Premium</option>
              <option value="platinum">Ethan Platinum</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? "Creating…" : "Create Account"}
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <p className="text-[var(--text-muted)]">Loading users…</p>
      ) : (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-left text-[var(--text-muted)]">
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium">Tier</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium">{u.displayName}</div>
                    <div className="text-xs text-[var(--text-muted)]">@{u.username}</div>
                  </td>
                  <td className="px-4 py-3 text-[var(--text-muted)]">{u.email}</td>
                  <td className="px-4 py-3 capitalize">{u.role}</td>
                  <td className="px-4 py-3">
                    <select
                      className="input py-1 text-xs"
                      value={u.tier}
                      onChange={(e) => updateTier(u.id, e.target.value)}
                      disabled={u.role === "owner"}
                    >
                      <option value="basic">Basic</option>
                      <option value="premium">Premium</option>
                      <option value="platinum">Platinum</option>
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`badge ${
                        u.isActive
                          ? "bg-emerald-500/15 text-emerald-400"
                          : "bg-red-500/15 text-red-400"
                      }`}
                    >
                      {u.isActive ? "Active" : "Suspended"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.role !== "owner" && (
                      <button
                        className="text-xs text-[var(--text-muted)] hover:text-white"
                        onClick={() => toggleActive(u.id, u.isActive)}
                      >
                        {u.isActive ? "Suspend" : "Restore"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
