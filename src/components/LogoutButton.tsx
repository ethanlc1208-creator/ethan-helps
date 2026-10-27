"use client";

export function LogoutButton() {
  return (
    <button
      type="button"
      className="text-xs text-[var(--text-muted)] hover:text-white transition-colors"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
      }}
    >
      Sign out
    </button>
  );
}
