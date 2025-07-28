'use client';

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function DoctorDetailsPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Doctor Details:", data);
    // TODO: Send to backend or store in context
    router.push("/doctor/patients");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4 text-center text-blue-700">Doctor Profile Setup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm text-blue-500">Name</label>
            <input {...register("name")} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 border-blue-500 " required />
          </div>
          <div>
            <label className="block mb-1 text-sm text-blue-500">Specialization</label>
            <input {...register("specialization")} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 border-blue-500" required />
          </div>
          <div>
            <label className="block mb-1 text-sm text-blue-500">Available Time</label>
            <input {...register("time")} className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 border-blue-500" placeholder="10 AM - 1 PM" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer">
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
