// src/app/api/admin/health/route.ts
// Reuses STREETBEAT_ACCESS_SECRET as the auth gate — same secret and same
// Authorization: Bearer pattern as /api/admin/send-legacy-announcement.
// Streetbeat has no separate ADMIN_PASSWORD, so this doesn't invent one.

import { NextRequest, NextResponse } from "next/server"
import {
  checkEnvVars, checkStripe, checkResend, checkTurso, checkMetaPixel, checkSales,
} from "@/lib/health-checks"

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization")
  if (auth !== `Bearer ${process.env.STREETBEAT_ACCESS_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const [envVars, stripe, resend, turso, metaPixel, sales] = await Promise.all([
    Promise.resolve(checkEnvVars()),
    checkStripe(),
    checkResend(),
    checkTurso(),
    checkMetaPixel(),
    checkSales(),
  ])

  return NextResponse.json({
    envVars,
    integrationHealth: { stripe, resend, turso, metaPixel },
    sales,
    checkedAt: new Date().toISOString(),
  })
}
