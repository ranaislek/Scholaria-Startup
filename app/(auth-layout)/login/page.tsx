"use client";

import { API_BASE_URL } from "@/api";
import Loader from "@/components/loader";
import { useAuth } from "@/contexts/auth.context";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useState } from "react";

type LoginPageCreds = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [creds, setCreds] = useState<LoginPageCreds>({
    email: "",
    password: "",
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
    setIsLoading(true);
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
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
    router.push("/home");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      redirect("/home");
    }
  }, []);

  return (
    <>
      <div className="text-2xl font-bold mb-4">Login to your account</div>
      <div className="w-full flex flex-col justify-start items-start gap-2">
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
      </div>
      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className="flex justify-center items-center h-10 bg-primary text-center py-2 w-full text-white font-bold mt-6 rounded-md hover:bg-opacity-75"
      >
        {isLoading ? <Loader size={20} color={"white"} /> : "Login"}
      </button>

      <div className="mt-2">
        New to Scholaria?{" "}
        <Link href="/register" className="text-primary">
          Register
        </Link>
      </div>
    </>
  );
}
