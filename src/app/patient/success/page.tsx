'use client';

import { useSearchParams } from 'next/navigation';

export default function AppointmentSuccessPage() {
  const searchParams = useSearchParams();
  const doctorName = searchParams.get('name');
  const payment = searchParams.get('payment');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white rounded shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Appointment Confirmed!</h1>
        <p className="text-gray-700 mb-2">
          Your appointment with <strong>{doctorName}</strong> has been successfully booked.
        </p>
        <p className="text-gray-700 mb-4">
          Payment Option: <strong className={`${payment === 'payNow' ? 'text-green-600' : 'text-yellow-600'}`}>
            {payment === 'payNow' ? 'Pay Now' : 'Pay Later'}
          </strong>
        </p>
        <p className="text-sm text-gray-400">Thank you for using our service.</p>
      </div>
    </div>
  );
}
