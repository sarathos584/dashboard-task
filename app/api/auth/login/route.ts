import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return new NextResponse("Missing credentials", { status: 400 })
    }

    // Find user by email
    const user = await db.select().from(users).where(eq(users.email, email)).limit(1)

    if (!user.length) {
      return new NextResponse("Invalid credentials", { status: 401 })
    }

    const foundUser = user[0]

    // Verify password
    const isValidPassword = await bcrypt.compare(password, foundUser.password)

    if (!isValidPassword) {
      return new NextResponse("Invalid credentials", { status: 401 })
    }

    // Return user data without password
    return NextResponse.json({
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
    })
  } catch (error) {
    console.error("[LOGIN_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
} 