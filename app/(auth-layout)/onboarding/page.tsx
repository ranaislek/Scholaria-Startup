"use client";

import { API_BASE_URL } from "@/api";
import Loader from "@/components/loader";
import { useAuth } from "@/contexts/auth.context";
import { UserType, userTypeMapper } from "@/models/user";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Category = {
  id: string;
  name: string;
};

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType | null>(null);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [selectedCategorys, setSelectedCategorys] = useState<string[]>([]);

  const fetchCategorys = async () => {
    const res = await fetch(`${API_BASE_URL}/auth/category`);
    const data = await res.json();
    setCategorys(data);
  };

  useEffect(() => {
    fetchCategorys();
  }, []);

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserType(e.target.value as UserType);
  };

  const handleCategoryChange = (targetId: string) => {
    if (selectedCategorys?.includes(targetId)) {
      setSelectedCategorys((prev) => prev.filter((id) => id !== targetId));
    } else {
      setSelectedCategorys((prev) => [...prev, targetId]);
    }
    console.log(selectedCategorys);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const userData = {
      userType,
      categories: selectedCategorys,
    };
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/user/onboarding`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });
    setIsLoading(false);
    const data = await res.json();
    if (data.error) {
      alert(data.error ?? data.message);
      return;
    }

    router.push("/home");
  };

  return (
    <>
      <div className="text-2xl font-bold mb-1">Welcome, {user?.fullName}!</div>
      <div className="text-lg mb-4 text-gray-600">Tell us more about you.</div>
      <div className="w-full flex flex-col justify-start items-start gap-2">
        <div className="text-gray-500">What describes you best?</div>
        <select
          value={userType ?? ""}
          onChange={handleUserTypeChange}
          className="w-full rounded-sm bg-gray-200 h-10 p-1"
        >
          <option value="" disabled>
            Select user type
          </option>
          <option value="masters">{userTypeMapper["masters"]}</option>
          <option value="phd">{userTypeMapper["phd"]}</option>
          <option value="professor">{userTypeMapper["professor"]}</option>
          <option value="professional">{userTypeMapper["professional"]}</option>
        </select>

        <div className="text-gray-500 mt-4">Select Categorys of Interest</div>
        <div className="w-full flex flex-wrap gap-2">
          {categorys.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="checkbox"
                value={category.id}
                checked={selectedCategorys.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
                className="mr-2"
              />
              {category.name}
            </label>
          ))}
        </div>
      </div>

      <button
        disabled={isLoading}
        onClick={handleSubmit}
        className="flex justify-center items-center h-10 bg-primary text-center py-2 w-full text-white font-bold mt-6 rounded-md hover:bg-opacity-75"
      >
        {isLoading ? <Loader size={20} color={"white"} /> : "Submit"}
      </button>
    </>
  );
}
