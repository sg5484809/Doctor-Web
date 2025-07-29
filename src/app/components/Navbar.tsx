'use client';
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-semibold text-blue-700">
        Doctor Portal
      </Link>
      <div className="space-x-4">
        <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        <Link href="/signup" className="text-gray-700 hover:text-blue-600">Sign Up</Link>
        <Link href="/doctor/patients" className="text-gray-700 hover:text-blue-600">Doctor Patients</Link>
      </div>
    </nav>
  );
}
