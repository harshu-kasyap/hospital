"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AppointmentDialog } from "@/components/appointments/appointment-dialog"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { Appointment } from "@/types"

export function AppointmentsList() {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      _id: "1",
      patient: { _id: "1", name: "John Doe" },
      doctor: { _id: "1", name: "Dr. John Smith" },
      date: "2023-05-15",
      time: "10:00",
      status: "Scheduled",
      reason: "General Checkup",
      notes: "",
      createdAt: "2023-05-01",
    },
    {
      _id: "2",
      patient: { _id: "2", name: "Jane Smith" },
      doctor: { _id: "2", name: "Dr. Sarah Johnson" },
      date: "2023-05-16",
      time: "14:30",
      status: "Completed",
      reason: "Follow-up",
      notes: "Patient is recovering well",
      createdAt: "2023-05-02",
    },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleAddAppointment = () => {
    setSelectedAppointment(null)
    setIsDialogOpen(true)
  }

  const handleEditAppointment = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDialogOpen(true)
  }

  const handleDeleteAppointment = async (id: string) => {
    try {
      // In a real app, you would call the API here
      // await fetch(`/api/appointments/${id}`, {
      //   method: "DELETE",
      //   headers: {
      //     Authorization: `Bearer ${getCookie("token")}`,
      //   },
      // })

      // For demo purposes, we'll just update the state
      setAppointments(appointments.filter((appointment) => appointment._id !== id))

      toast({
        title: "Appointment deleted",
        description: "The appointment has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete appointment. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSaveAppointment = (appointment: Appointment) => {
    if (selectedAppointment) {
      // Edit existing appointment
      setAppointments(appointments.map((a) => (a._id === appointment._id ? appointment : a)))
      toast({
        title: "Appointment updated",
        description: "The appointment has been updated successfully.",
      })
    } else {
      // Add new appointment
      const newAppointment = {
        ...appointment,
        _id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString().split("T")[0],
      }
      setAppointments([...appointments, newAppointment])
      toast({
        title: "Appointment added",
        description: "The appointment has been added successfully.",
      })
    }
    setIsDialogOpen(false)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Appointments</CardTitle>
            <CardDescription>Schedule and manage appointments.</CardDescription>
          </div>
          <Button onClick={handleAddAppointment}>
            <Plus className="mr-2 h-4 w-4" />
            Add Appointment
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell className="font-medium">{appointment.patient.name}</TableCell>
                  <TableCell>{appointment.doctor.name}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === "Scheduled"
                          ? "bg-blue-100 text-blue-800"
                          : appointment.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "Cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditAppointment(appointment)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteAppointment(appointment._id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {appointments.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No appointments found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AppointmentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        appointment={selectedAppointment}
        onSave={handleSaveAppointment}
      />
    </>
  )
}

