import { NextResponse } from "next/server"
import { db, isDatabaseAvailable } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return new NextResponse("Missing credentials", { status: 400 })
    }

    // If database is not available, use a dummy user for development
    if (!isDatabaseAvailable || !db) {
      if (email === "admin@example.com" && password === "password") {
        return NextResponse.json({
          id: "dummy-user-id",
          email: "admin@example.com",
          name: "Admin User"
        })
      }
      return new NextResponse("Invalid credentials", { status: 401 })
    }

    // Find user by email
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (!user.length) {
      return new NextResponse("Invalid credentials", { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password)

    if (!isPasswordValid) {
      return new NextResponse("Invalid credentials", { status: 401 })
    }

    const { password: _, ...userWithoutPassword } = user[0]
    return NextResponse.json(userWithoutPassword)
  } catch (error) {
    console.error("[LOGIN_ERROR]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}