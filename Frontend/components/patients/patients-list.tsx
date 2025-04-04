"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PatientDialog } from "@/components/patients/patient-dialog"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Pencil, Trash2 } from "lucide-react"
import type { Patient } from "@/types"

export function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([
    {
      _id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
      dateOfBirth: "1990-01-01",
      gender: "Male",
      bloodGroup: "O+",
      medicalHistory: "None",
      createdAt: "2023-01-01",
    },
    {
      _id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "987-654-3210",
      address: "456 Oak Ave",
      dateOfBirth: "1985-05-15",
      gender: "Female",
      bloodGroup: "A+",
      medicalHistory: "Asthma",
      createdAt: "2023-02-15",
    },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleAddPatient = () => {
    setSelectedPatient(null)
    setIsDialogOpen(true)
  }

  const handleEditPatient = (patient: Patient) => {
    setSelectedPatient(patient)
    setIsDialogOpen(true)
  }

  const handleDeletePatient = async (id: string) => {
    try {
      // In a real app, you would call the API here
      // await fetch(`/api/patients/${id}`, {
      //   method: "DELETE",
      //   headers: {
      //     Authorization: `Bearer ${getCookie("token")}`,
      //   },
      // })

      // For demo purposes, we'll just update the state
      setPatients(patients.filter((patient) => patient._id !== id))

      toast({
        title: "Patient deleted",
        description: "The patient has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete patient. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSavePatient = (patient: Patient) => {
    if (selectedPatient) {
      // Edit existing patient
      setPatients(patients.map((p) => (p._id === patient._id ? patient : p)))
      toast({
        title: "Patient updated",
        description: "The patient has been updated successfully.",
      })
    } else {
      // Add new patient
      const newPatient = {
        ...patient,
        _id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString().split("T")[0],
      }
      setPatients([...patients, newPatient])
      toast({
        title: "Patient added",
        description: "The patient has been added successfully.",
      })
    }
    setIsDialogOpen(false)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Patients</CardTitle>
            <CardDescription>Manage patient records and information.</CardDescription>
          </div>
          <Button onClick={handleAddPatient}>
            <Plus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Blood Group</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient._id}>
                  <TableCell className="font-medium">{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{patient.phone}</TableCell>
                  <TableCell>{patient.gender}</TableCell>
                  <TableCell>{patient.bloodGroup}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditPatient(patient)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeletePatient(patient._id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {patients.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PatientDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        patient={selectedPatient}
        onSave={handleSavePatient}
      />
    </>
  )
}

