import { Metadata } from "next"
import { Sidebar } from "@/components/admin/Sidebar"
import { Header } from "@/components/admin/Header"

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Tutor Management System Admin Dashboard",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3 xl:col-span-2">
            <Sidebar />
          </div>
          <div className="col-span-12 lg:col-span-9 xl:col-span-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
