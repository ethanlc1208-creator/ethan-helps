"use client";

import { useState } from "react";

export default function SupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Phase 1: store locally / show confirmation.
    // Later this can email or save to the database.
    console.log("Support request:", { name, email, message });
    setSent(true);
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-2">Contact Support</h1>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        Having trouble with your account, a quiz, or something else? Send a message and the Ethan Helps team will help.
      </p>

      {sent ? (
        <div className="card p-5 border border-emerald-500/30">
          <p className="font-medium text-emerald-400">Message sent</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Thanks — we’ll get back to you as soon as possible.
          </p>
          <button className="btn-ghost mt-4 text-sm" onClick={() => setSent(false)}>
            Send another
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              className="input min-h-[120px] resize-y"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
