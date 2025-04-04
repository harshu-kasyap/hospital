import { PatientsList } from "@/components/patients/patients-list"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function PatientsPage() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")

  if (!token) {
    redirect("/login")
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Patients" text="Manage patient records and information." />
      <PatientsList />
    </DashboardShell>
  )
}

