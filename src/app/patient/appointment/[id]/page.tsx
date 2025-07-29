'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function BookAppointmentPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`https://6888ed05adf0e59551bbf1a6.mockapi.io/v1/doctors/${id}`);

        const data = await res.json();
        setDoctor(data);
      } catch (err) {
        console.error('Failed to fetch doctor:', err);
      }
    };

    fetchDoctor();
  }, [id]);

  const handleConfirm = () => {
    alert(`Appointment booked with Dr. ${doctor.name}`);
    router.push('/patient/dashboard');
  };

  if (!doctor) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-green-700 mb-4">Book Appointment</h1>
        <p className='text-gray-700'><strong className='text-gray-800'>Name:</strong> {doctor.name}</p>
        <p className='text-gray-700'><strong className='text-gray-800'>Specialization:</strong> {doctor.specialization}</p>
        <p className='text-gray-700'><strong className='text-gray-800'>Availability:</strong> {doctor.availability}</p>

        <button
          onClick={handleConfirm}
          className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}
