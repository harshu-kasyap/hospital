import { NextResponse } from "next/server"
import { headers } from "next/headers"

export async function GET(request: Request) {
  try {
    const headersList = headers()
    const authorization = headersList.get("authorization")

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const token = authorization.split(" ")[1]

    // In a real app, you would verify the token and fetch user data
    // For demo purposes, we'll just return mock data

    return NextResponse.json({
      success: true,
      data: {
        _id: "1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
        createdAt: "2023-01-01",
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Authentication failed" }, { status: 401 })
  }
}

