import { DoctorsList } from "@/components/doctors/doctors-list"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function DoctorsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Doctors" text="View our medical professionals." />
      <DoctorsList />
    </DashboardShell>
  )
}

