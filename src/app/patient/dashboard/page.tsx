// src/app/patient/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PatientDashboard() {
  const [doctors, setDoctors] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctors = async () => {
      const res = await fetch('/api/doctors');
      const data = await res.json();
      setDoctors(data);
    };
    fetchDoctors();
  }, []);

  const handleBook = (doctorId: string) => {
    router.push(`/patient/appointment/${doctorId}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold text-center text-green-600 mb-8">
        Available Doctors
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc: any) => (
          <div
            key={doc.id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-bold text-gray-800">{doc.name}</h2>
              <p className="text-gray-600 mt-1">Specialization: {doc.specialization}</p>
              <p className="text-gray-600">Availability: {doc.availability}</p>
            </div>
            <button
              onClick={() => handleBook(doc.id)}
              className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
