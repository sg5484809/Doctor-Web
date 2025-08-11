'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface HistoryRecord {
  date: string;
  diagnosis: string;
  prescription: string;
}

export default function PatientHistoryPage() {
  const { id } = useParams();
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetch('https://mocki.io/v1/5ca3dcee-53ac-4ee5-adc2-b5e4f67c0f37')
      .then((res) => res.json())
      .then((data) => {
        let records: HistoryRecord[] = [];

        if (Array.isArray(data)) {
          const patient = data.find((p: any) => String(p.id) === String(id));
          if (patient && Array.isArray(patient.history)) {
            records = patient.history;
          }
        }

        setHistory(records);
      })
      .catch((err) => {
        console.error('History fetch error:', err);
        setHistory([]);
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <Link href="/doctor/patients">
        <button className="mb-6 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
          ← Back to Patients
        </button>
      </Link>

      <h1 className="text-3xl font-semibold text-blue-500 mb-6">
        Patient History
      </h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : history.length === 0 ? (
        <p className="text-red-500">No history found for this patient.</p>
      ) : (
        <div className="space-y-4">
          {history.map((record, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              <p>
                <strong className="text-gray-700">Date:</strong> {record.date}
              </p>
              <p>
                <strong className="text-gray-700">Diagnosis:</strong>{' '}
                {record.diagnosis}
              </p>
              <p>
                <strong className="text-gray-700">Prescription:</strong>{' '}
                {record.prescription}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
