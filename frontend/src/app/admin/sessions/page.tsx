import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SessionsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Sessions</h2>
        <Button asChild>
          <Link href="/admin/sessions/new">Add Session</Link>
        </Button>
      </div>
      <div className="rounded-md border p-4">
        {/* TODO: Add DataTable here */}
        <p className="text-sm text-muted-foreground">List of sessions will appear here.</p>
      </div>
    </div>
  )
}
