import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, password, role } = body

    // In a real app, you would validate and store user data in your database
    // For demo purposes, we'll just return a success response

    return NextResponse.json({
      success: true,
      token: "demo-jwt-token",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Registration failed" }, { status: 400 })
  }
}

