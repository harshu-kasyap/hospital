"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"

export function MainNav() {
  const pathname = usePathname()
  const { user } = useAuth()

  const isAdmin = user?.role === "admin"
  const isDoctor = user?.role === "doctor"
  const isReceptionist = user?.role === "receptionist"
  const isStaff = isAdmin || isDoctor || isReceptionist

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="text-lg font-medium transition-colors hover:text-primary">
        HMS
      </Link>
      <Link
        href="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/doctors"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === "/doctors" ? "text-primary" : "text-muted-foreground",
        )}
      >
        Doctors
      </Link>
      {isStaff && (
        <Link
          href="/patients"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/patients" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Patients
        </Link>
      )}
      {isStaff && (
        <Link
          href="/appointments"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/appointments" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Appointments
        </Link>
      )}
      {(isAdmin || isDoctor) && (
        <Link
          href="/prescriptions"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/prescriptions" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Prescriptions
        </Link>
      )}
      {(isAdmin || isReceptionist) && (
        <Link
          href="/billing"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/billing" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Billing
        </Link>
      )}
      {isAdmin && (
        <Link
          href="/departments"
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === "/departments" ? "text-primary" : "text-muted-foreground",
          )}
        >
          Departments
        </Link>
      )}
    </nav>
  )
}

