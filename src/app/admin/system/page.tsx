// src/app/admin/system/page.tsx
// The dashboard now lives at /admin directly. This redirect exists only
// in case /admin/system got bookmarked or linked anywhere before the move.
import { redirect } from "next/navigation"

export default function AdminSystemRedirect() {
  redirect("/admin")
}
