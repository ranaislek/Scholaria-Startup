"use client";
import { API_BASE_URL } from "@/api";
import Loader from "@/components/loader";
import { useAuth } from "@/contexts/auth.context";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type RegisterPageCreds = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const { setUser } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [creds, setCreds] = useState<RegisterPageCreds>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreds((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (creds.password !== creds.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    setIsLoading(false);
    const data = await res.json();
    if (data.error) {
      alert(data.error ?? data.message);
      return;
    }
    setUser(data);
    router.push("/onboarding");
  };

  return (
    <>
      <div className="text-2xl font-bold mb-4">Register an account</div>
      <div className="w-full flex flex-col justify-start items-start gap-2">
        <div className="text-gray-500">Full Name</div>
        <input
          type="text"
          name="fullName"
          value={creds.fullName}
          onChange={handleChange}
          className="w-full rounded-sm bg-gray-200 h-10 p-1"
        />
        <div className="text-gray-500">Email address</div>
        <input
          type="text"
          name="email"
          value={creds.email}
          onChange={handleChange}
          className="w-full rounded-sm bg-gray-200 h-10 p-1"
        />
        <div className="text-gray-500">Password</div>
        <input
          type="password"
          name="password"
          value={creds.password}
          onChange={handleChange}
          className="w-full rounded-sm bg-gray-200 h-10 p-1"
        />
        <div className="text-gray-500">Confirm Password</div>
        <input
          type="password"
          name="confirmPassword"
          value={creds.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-sm bg-gray-200 h-10 p-1"
        />
      </div>
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className="flex justify-center items-center h-10 bg-primary text-center py-2 w-full text-white font-bold mt-6 rounded-md hover:bg-opacity-75"
      >
        {isLoading ? <Loader size={20} color={"white"} /> : "Register"}
      </button>

      <div className="mt-2">
        Already have an account?{" "}
        <Link href="/login" className="text-primary">
          Login
        </Link>
      </div>
    </>
  );
}
