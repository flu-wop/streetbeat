import type { Metadata } from "next"
import { isAdmin } from "@/lib/admin-auth"
import { AdminShell } from "@/components/admin/AdminShell"

export const metadata: Metadata = { title: "Admin", robots: { index: false, follow: false } }

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Signed out: the login (or the System secret gate) renders on its own, no shell.
  if (!(await isAdmin())) return <>{children}</>
  return <AdminShell>{children}</AdminShell>
}
