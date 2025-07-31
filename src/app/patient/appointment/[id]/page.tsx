'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function BookAppointmentPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<any>(null);
  const [paymentOption, setPaymentOption] = useState<string>('');
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
    if (!paymentOption) {
      alert('Please select a payment option');
      return;
    }

    router.push(`/patient/success?name=${doctor.name}&payment=${paymentOption}`);
  };

  if (!doctor) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-green-700 mb-4">Book Appointment</h1>
        
        <p className='text-gray-700'><strong className='text-gray-800'>Name:</strong> {doctor.name}</p>
        <p className='text-gray-700'><strong className='text-gray-800'>Specialization:</strong> {doctor.specialization}</p>
        <p className='text-gray-700'><strong className='text-gray-800'>Availability:</strong> {doctor.availability}</p>
        <p className='text-gray-700'><strong className='text-gray-800'>Time:</strong> {doctor.time}</p>
        <p className='text-gray-700 mb-4'><strong className='text-gray-800'>Fees:</strong> ₹{doctor.fees}</p>

        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="payNow"
              checked={paymentOption === 'payNow'}
              onChange={() => setPaymentOption('payNow')}
              className="accent-green-600"
            />
            <span className="text-green-700 font-medium">Pay Now</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="payment"
              value="payLater"
              checked={paymentOption === 'payLater'}
              onChange={() => setPaymentOption('payLater')}
              className="accent-yellow-500"
            />
            <span className="text-yellow-600 font-medium">Pay Later</span>
          </label>
        </div>

        <button
          onClick={handleConfirm}
          className="mt-2 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}
