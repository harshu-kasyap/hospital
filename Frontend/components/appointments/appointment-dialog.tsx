"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { Appointment } from "@/types"

interface AppointmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  appointment: Appointment | null
  onSave: (appointment: Appointment) => void
}

export function AppointmentDialog({ open, onOpenChange, appointment, onSave }: AppointmentDialogProps) {
  // Mock data for patients and doctors
  const patients = [
    { _id: "1", name: "John Doe" },
    { _id: "2", name: "Jane Smith" },
  ]

  const doctors = [
    { _id: "1", name: "Dr. John Smith" },
    { _id: "2", name: "Dr. Sarah Johnson" },
  ]

  const [formData, setFormData] = useState<Partial<Appointment>>({
    patient: { _id: "", name: "" },
    doctor: { _id: "", name: "" },
    date: "",
    time: "",
    status: "Scheduled",
    reason: "",
    notes: "",
  })

  useEffect(() => {
    if (appointment) {
      setFormData(appointment)
    } else {
      setFormData({
        patient: { _id: "", name: "" },
        doctor: { _id: "", name: "" },
        date: "",
        time: "",
        status: "Scheduled",
        reason: "",
        notes: "",
      })
    }
  }, [appointment, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "patientId") {
      const selectedPatient = patients.find((p) => p._id === value)
      if (selectedPatient) {
        setFormData((prev) => ({
          ...prev,
          patient: { _id: selectedPatient._id, name: selectedPatient.name },
        }))
      }
    } else if (name === "doctorId") {
      const selectedDoctor = doctors.find((d) => d._id === value)
      if (selectedDoctor) {
        setFormData((prev) => ({
          ...prev,
          doctor: { _id: selectedDoctor._id, name: selectedDoctor.name },
        }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData as Appointment)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{appointment ? "Edit Appointment" : "Add New Appointment"}</DialogTitle>
            <DialogDescription>
              {appointment ? "Update the appointment details." : "Fill in the details to schedule a new appointment."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient</Label>
              <Select value={formData.patient?._id} onValueChange={(value) => handleSelectChange("patientId", value)}>
                <SelectTrigger id="patientId">
                  <SelectValue placeholder="Select patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient._id} value={patient._id}>
                      {patient.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctorId">Doctor</Label>
              <Select value={formData.doctor?._id} onValueChange={(value) => handleSelectChange("doctorId", value)}>
                <SelectTrigger id="doctorId">
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor._id} value={doctor._id}>
                      {doctor.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="No-show">No-show</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason</Label>
              <Input id="reason" name="reason" value={formData.reason} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" name="notes" value={formData.notes} onChange={handleChange} rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

