'use client';

import { useEffect, useState } from 'react';

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch('https://mocki.io/v1/e7847e95-9773-41b2-a063-c1885c70c42a');
        const data = await res.json();

        // Add default 'pending' status if missing
        const updated = data.map((p: any) => ({
          ...p,
          status: p.status || 'pending',
        }));

        setPatients(updated);
      } catch (err) {
        console.error('Failed to fetch patients:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleStatusChange = (id: string, newStatus: string) => {
    const updated = patients.map((p) =>
      p.id === id ? { ...p, status: newStatus } : p
    );
    setPatients(updated);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center text-green-700">Patient Appointments</h1>

      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : patients.length === 0 ? (
        <div className="text-center text-red-500">No patients found.</div>
      ) : (
        <div className="grid gap-6 max-w-4xl mx-auto">
          {patients.map((patient) => (
            <div key={patient.id} className="bg-white shadow-lg rounded-lg p-5">
              <p><strong className="text-gray-700">Name:</strong> {patient.name}</p>
              <p><strong className="text-gray-700">Appointment Date:</strong> {patient.appointmentDate}</p>
              <p><strong className="text-gray-700">Time:</strong> {patient.appointmentTime}</p>
              <p><strong className="text-gray-700">Status:</strong> {patient.status}</p>

              {patient.status === 'pending' && (
                <div className="mt-4 flex gap-4">
                  <button
                    onClick={() => handleStatusChange(patient.id, 'cancelled')}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleStatusChange(patient.id, 'seen')}
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded"
                  >
                    Mark as Seen
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
