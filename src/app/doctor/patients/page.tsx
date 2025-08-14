'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Patient {
  id: string;
  name: string;
  appointmentDate: string;
  appointmentTime: string;
  status?: string;
}

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('appointments');
    if (stored) {
      setPatients(JSON.parse(stored));
      setLoading(false);
    } else {
      fetch('https://mocki.io/v1/e7847e95-9773-41b2-a063-c1885c70c42a')
        .then((res) => res.json())
        .then((data: Patient[]) => {
          const updated = data.map((p) => ({
            ...p,
            status: p.status || 'pending',
          }));
          setPatients(updated);
          localStorage.setItem('appointments', JSON.stringify(updated));
        })
        .catch((err) => console.error('Fetch error:', err))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleStatusChange = (id: string, newStatus: string) => {
    const updated = patients.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    setPatients(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  const getStatusClasses = (status: string) => {
    switch (status) {
      case 'seen':
        return 'bg-green-50 border border-green-500';
      case 'cancelled':
        return 'bg-red-50 border border-red-500';
      default:
        return 'bg-white border border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 relative">
      {/* Header with button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-blue-500">
          Patient Appointments
        </h1>
        <button
          onClick={() => router.push('/doctor/calendar')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md"
        >
          View Calendar
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : patients.length === 0 ? (
        <div className="text-center text-red-500">No patients found.</div>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className={`shadow-lg rounded-lg p-5 ${getStatusClasses(patient.status || '')}`}
            >
              <p>
                <strong className="text-gray-700">Name:</strong> {patient.name}
              </p>
              <p>
                <strong className="text-gray-700">Appointment Date:</strong> {patient.appointmentDate}
              </p>
              <p>
                <strong className="text-gray-700">Time:</strong> {patient.appointmentTime}
              </p>
              <p>
                <strong className="text-gray-700">Status:</strong>{' '}
                <span className="capitalize">{patient.status}</span>
              </p>

              <div className="mt-4 flex flex-wrap gap-4">
                {patient.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleStatusChange(patient.id, 'cancelled')}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleStatusChange(patient.id, 'seen')}
                      className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded cursor-pointer"
                    >
                      Mark as Seen
                    </button>
                  </>
                )}

                {patient.status === 'seen' && (
                  <>
                    <Link
                      href={`/doctor/prescriptions?patientId=${patient.id}&name=${encodeURIComponent(patient.name)}`}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-4 rounded cursor-pointer"
                    >
                      Make Prescription
                    </Link>

                    <button
                      onClick={() => router.push(`/doctor/reviews/${patient.id}`)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-4 rounded cursor-pointer"
                    >
                      Show Ratings
                    </button>
                  </>
                )}

                <Link href={`/doctor/patients/history/${patient.id}`}>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white py-1 px-4 rounded cursor-pointer">
                    View History
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
