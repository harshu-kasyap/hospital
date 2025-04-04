import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // In a real app, you would validate credentials against your database
    // For demo purposes, we'll just check for a specific email/password
    if (email === "admin@example.com" && password === "password") {
      return NextResponse.json({
        success: true,
        token: "demo-jwt-token",
      })
    }

    // For demo purposes, accept any credentials
    return NextResponse.json({
      success: true,
      token: "demo-jwt-token",
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
  }
}

