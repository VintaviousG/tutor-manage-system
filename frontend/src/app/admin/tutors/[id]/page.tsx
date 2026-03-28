import { Button } from "@/components/ui/button"
import { getTutorById } from "@/lib/actions/tutors"
import Link from "next/link"

export default async function ViewTutorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tutor = await getTutorById(id)
  
  return (
    <div className="max-w-2xl space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Tutor Details</h2>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/admin/tutors/${id}/edit`}>Edit Tutor</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/tutors">Back</Link>
          </Button>
        </div>
      </div>
      <div className="rounded-md border p-6 space-y-4 bg-card">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">First Name</h3>
            <p className="text-lg">{tutor.first_name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Last Name</h3>
            <p className="text-lg">{tutor.last_name}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
            <p className="text-lg">{tutor.email}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
            <p className="text-lg">{tutor.phone || "N/A"}</p>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Subject</h3>
          <p className="text-lg mt-1"><span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">{tutor.subject}</span></p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Hourly Rate</h3>
            <p className="text-lg font-medium">
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(tutor.hourly_rate || 0)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
            <p className="text-lg mt-1">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${tutor.is_active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                {tutor.is_active ? 'Active' : 'Inactive'}
              </span>
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
