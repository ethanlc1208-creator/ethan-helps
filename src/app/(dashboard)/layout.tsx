import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession, isStaff } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen flex">
      <aside className="w-60 border-r border-[var(--border)] bg-[var(--bg-card)] flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-[var(--border)] flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-sm">
            EH
          </div>
          <span className="font-semibold">Ethan Helps</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/chapters/ch7">Chapter 7</NavLink>
          <NavLink href="/chapters/ch8">Chapter 8</NavLink>
          <NavLink href="/support">Support</NavLink>
          {isStaff(session.role) && (
            <>
              <div className="pt-4 pb-1 px-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                Admin
              </div>
              <NavLink href="/admin">Users & Tiers</NavLink>
            </>
          )}
        </nav>

        <div className="px-4 py-4 border-t border-[var(--border)]">
          <div className="text-sm font-medium truncate">{session.displayName}</div>
          <div className="text-xs text-[var(--text-muted)] capitalize">
            {session.role} · {session.tier}
          </div>
          <div className="mt-3">
            <LogoutButton />
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="px-6 py-6 max-w-6xl">{children}</div>
      </main>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:text-white hover:bg-[var(--bg-elevated)] transition-colors"
    >
      {children}
    </Link>
  );
}
