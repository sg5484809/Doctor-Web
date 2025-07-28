// src/app/api/patient/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  // Mock credentials
  if (email === 'patient@example.com' && password === 'password123') {
    return NextResponse.json({
      success: true,
      patientId: 'pat123',
      name: 'John Doe',
    });
  } else {
    return NextResponse.json(
      { success: false, message: 'Invalid credentials' },
      { status: 401 }
    );
  }
}
