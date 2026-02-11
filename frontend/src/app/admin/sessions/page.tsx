import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DataTable } from "@/components/admin/DataTable"
import { columns } from "./columns"
import { getSessions } from "@/lib/actions/sessions"
export default async function SessionsPage() {
  const sessions = await getSessions()
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Sessions</h2>
        <Button asChild>
          <Link href="/admin/sessions/new">Add Session</Link>
        </Button>
      </div>
      <div className="rounded-md border p-4">
        <DataTable columns={columns} data={sessions} />
      </div>
    </div>
  )
}
