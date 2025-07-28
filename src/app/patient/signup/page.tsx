'use client';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

const signupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function PatientSignupPage() {
  const router = useRouter();

  const {
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Patient signup data:", data);
    router.push("/patient/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold text-green-700 mb-6">Patient Signup</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-700">Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Jane Doe"
              className="w-full px-4 py-2 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="patient@example.com"
              className="w-full px-4 py-2 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700">Password</label>
            <input
              type="password"
              {...register("password")}
              placeholder="********"
              className="w-full px-4 py-2 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-700">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="********"
              className="w-full px-4 py-2 border border-green-500 rounded focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800"
            />
            {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href="/patient/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
