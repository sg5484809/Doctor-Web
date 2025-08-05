"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background: "linear-gradient(135deg, #dbeafe 0%, #d1fae5 100%)", // soft blue-green gradient
      }}
    >
      <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
        Welcome to the Healthcare Portal
      </h1>
      <p className="text-gray-700 mb-8 max-w-md text-center">
        Please select your role to continue.
      </p>

      <div className="flex gap-6">
        <button
          onClick={() => router.push("/doctor/login")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition text-lg"
        >
          I am a Doctor
        </button>

        <button
          onClick={() => router.push("/patient/login")}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition text-lg"
        >
          I am a Patient
        </button>
      </div>
    </div>
  );
}
