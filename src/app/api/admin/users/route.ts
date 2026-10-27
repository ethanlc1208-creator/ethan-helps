import { NextRequest, NextResponse } from "next/server";
import { getSession, isStaff } from "@/lib/auth";
import { getUsers, createUser, updateUser } from "@/lib/store";

export async function GET() {
  const session = await getSession();
  if (!session || !isStaff(session.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  const users = await getUsers();
  // Never return password hashes
  const safe = users.map(({ passwordHash, ...u }) => u);
  return NextResponse.json({ users: safe });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || !isStaff(session.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { email, username, password, displayName, role, tier } = body;

    if (!email || !username || !password || !displayName) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Only owner can create staff/owner accounts
    if ((role === "staff" || role === "owner") && session.role !== "owner") {
      return NextResponse.json(
        { error: "Only the Owner can create staff accounts" },
        { status: 403 }
      );
    }

    const user = await createUser({
      email,
      username,
      password,
      displayName,
      role: role || "student",
      tier: tier || "basic",
    });

    const { passwordHash, ...safe } = user;
    return NextResponse.json({ user: safe }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create user";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session || !isStaff(session.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { id, tier, role, isActive, displayName, username } = body;
    if (!id) {
      return NextResponse.json({ error: "User id required" }, { status: 400 });
    }

    // Only owner can change roles
    if (role !== undefined && session.role !== "owner") {
      return NextResponse.json(
        { error: "Only the Owner can change roles" },
        { status: 403 }
      );
    }

    const updated = await updateUser(id, { tier, role, isActive, displayName, username });
    if (!updated) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const { passwordHash, ...safe } = updated;
    return NextResponse.json({ user: safe });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
