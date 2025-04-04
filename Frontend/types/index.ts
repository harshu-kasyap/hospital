export interface User {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
}

export interface Patient {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  medicalHistory: string
  createdAt: string
}

export interface Doctor {
  _id: string
  name: string
  email: string
  phone: string
  specialization: string
  qualification: string
  experience: string
  consultationFee: number
  department: string
  createdAt: string
}

export interface Appointment {
  _id: string
  patient: {
    _id: string
    name: string
  }
  doctor: {
    _id: string
    name: string
  }
  date: string
  time: string
  status: string
  reason: string
  notes: string
  createdAt: string
}

export interface Prescription {
  _id: string
  patient: {
    _id: string
    name: string
  }
  doctor: {
    _id: string
    name: string
  }
  date: string
  diagnosis: string
  medications: {
    name: string
    dosage: string
    duration: string
    instructions: string
  }[]
  notes: string
  createdAt: string
}

export interface Billing {
  _id: string
  patient: {
    _id: string
    name: string
  }
  date: string
  services: {
    name: string
    cost: number
  }[]
  totalAmount: number
  paymentStatus: string
  paymentMethod: string
  notes: string
  createdAt: string
}

export interface Department {
  _id: string
  name: string
  description: string
  head: {
    _id: string
    name: string
  }
  createdAt: string
}

