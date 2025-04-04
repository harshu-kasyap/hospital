import { AppointmentsList } from "@/components/appointments/appointments-list"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function AppointmentsPage() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")

  if (!token) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Appointments" text="Schedule and manage appointments." />
      <AppointmentsList />
    </DashboardShell>
  )
}

