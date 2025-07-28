// src/app/api/doctor/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  // Mock authentication logic
  if (email === 'doctor@example.com' && password === 'password123') {
    return NextResponse.json({
      success: true,
      doctorId: 'doc123',
      name: 'Dr. Smith',
    });
  } else {
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  }
}
