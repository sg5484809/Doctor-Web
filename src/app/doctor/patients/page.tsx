'use client';

export default function PatientListPage() {
  // Dummy data (can be replaced with API or context)
  const patients = [
    { id: 1, name: "Alice Roy", age: 30, issue: "Fever" },
    { id: 2, name: "Bob Singh", age: 45, issue: "Headache" },
    { id: 3, name: "Catherine Das", age: 29, issue: "Cough" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Patient Applicants</h2>
        <ul className="space-y-4">
          {patients.map((patient) => (
            <li key={patient.id} className="border p-4 rounded shadow-sm">
              <p className="text-cyan-950"><span className="font-semibold text-cyan-950">Name:</span> {patient.name}</p>
              <p className="text-cyan-900"><span className="font-semibold text-cyan-900">Age:</span> {patient.age}</p>
              <p className="text-cyan-800"><span className="font-semibold text-cyan-800">Issue:</span> {patient.issue}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}