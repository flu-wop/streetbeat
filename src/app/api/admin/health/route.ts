// src/app/api/admin/health/route.ts
// Uses its own ADMIN_ACCESS_SECRET, deliberately NOT the shared
// STREETBEAT_ACCESS_SECRET — that one signs paying customers' lifetime
// access cookies (see lib/access.ts) and magic-link tokens. Rotating it
// would log out every existing customer; this route needs to be
// independently rotatable without touching customer access at all.

import { NextRequest, NextResponse } from "next/server"
import {
  checkEnvVars, checkStripe, checkResend, checkTurso, checkMetaPixel, checkSales,
} from "@/lib/health-checks"

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization")
  if (auth !== `Bearer ${process.env.ADMIN_ACCESS_SECRET}`) {
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
