"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DoctorDialog } from "@/components/doctors/doctor-dialog"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Pencil, Trash2, Eye } from "lucide-react"
import type { Doctor } from "@/types"

export function DoctorsList() {
  const [doctors, setDoctors] = useState<Doctor[]>([
    {
      _id: "1",
      name: "Dr. John Smith",
      email: "john.smith@example.com",
      phone: "123-456-7890",
      specialization: "Cardiology",
      qualification: "MD",
      experience: "10 years",
      consultationFee: 150,
      department: "Cardiology",
      createdAt: "2023-01-01",
    },
    {
      _id: "2",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@example.com",
      phone: "987-654-3210",
      specialization: "Neurology",
      qualification: "MD, PhD",
      experience: "15 years",
      consultationFee: 200,
      department: "Neurology",
      createdAt: "2023-02-15",
    },
  ])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()
  const isAdmin = user?.role === "admin"

  const handleAddDoctor = () => {
    setSelectedDoctor(null)
    setIsDialogOpen(true)
  }

  const handleEditDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setIsDialogOpen(true)
  }

  const handleDeleteDoctor = async (id: string) => {
    try {
      // In a real app, you would call the API here
      // await fetch(`/api/doctors/${id}`, {
      //   method: "DELETE",
      //   headers: {
      //     Authorization: `Bearer ${getCookie("token")}`,
      //   },
      // })

      // For demo purposes, we'll just update the state
      setDoctors(doctors.filter((doctor) => doctor._id !== id))

      toast({
        title: "Doctor deleted",
        description: "The doctor has been deleted successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete doctor. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSaveDoctor = (doctor: Doctor) => {
    if (selectedDoctor) {
      // Edit existing doctor
      setDoctors(doctors.map((d) => (d._id === doctor._id ? doctor : d)))
      toast({
        title: "Doctor updated",
        description: "The doctor has been updated successfully.",
      })
    } else {
      // Add new doctor
      const newDoctor = {
        ...doctor,
        _id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString().split("T")[0],
      }
      setDoctors([...doctors, newDoctor])
      toast({
        title: "Doctor added",
        description: "The doctor has been added successfully.",
      })
    }
    setIsDialogOpen(false)
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Doctors</CardTitle>
            <CardDescription>View our medical professionals.</CardDescription>
          </div>
          {isAdmin && (
            <Button onClick={handleAddDoctor}>
              <Plus className="mr-2 h-4 w-4" />
              Add Doctor
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Qualification</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Fee</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {doctors.map((doctor) => (
                <TableRow key={doctor._id}>
                  <TableCell className="font-medium">{doctor.name}</TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.qualification}</TableCell>
                  <TableCell>{doctor.experience}</TableCell>
                  <TableCell>${doctor.consultationFee}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleEditDoctor(doctor)}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    {isAdmin && (
                      <>
                        <Button variant="ghost" size="icon" onClick={() => handleEditDoctor(doctor)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteDoctor(doctor._id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
              {doctors.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No doctors found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isAdmin && (
        <DoctorDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          doctor={selectedDoctor}
          onSave={handleSaveDoctor}
        />
      )}
    </>
  )
}

