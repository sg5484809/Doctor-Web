// src/app/api/doctors/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const doctors = [
    {
      id: 'doc1',
      name: 'Dr. Ayesha Sharma',
      specialization: 'Cardiologist',
      availability: '10:00 AM - 2:00 PM',
    },
    {
      id: 'doc2',
      name: 'Dr. Rakesh Kumar',
      specialization: 'Dermatologist',
      availability: '1:00 PM - 5:00 PM',
    },
    {
      id: 'doc3',
      name: 'Dr. Meera Nair',
      specialization: 'Pediatrician',
      availability: '9:00 AM - 12:00 PM',
    },
  ];

  return NextResponse.json(doctors);
}
