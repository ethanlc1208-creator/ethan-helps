import { NextRequest, NextResponse } from "next/server";
import { getQuestionsForUnit } from "@/data/chapters";
import { getSession } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ unitId: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { unitId } = await params;
  const questions = getQuestionsForUnit(unitId);
  // Don't send correct answers until after submit in a more advanced version;
  // for Phase 1 we include them for explanation display after submit.
  return NextResponse.json({ questions });
}
