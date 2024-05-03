"use client";
import { API_BASE_URL } from "@/api";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type IAuth = {
  isLoggedIn: boolean;
  user: IUser | null;
  setUser: (v: IUser) => void;
};

type IUser = {
  email: string;
  token: string;
  pictureUrl?: string;
};

const AuthContext = React.createContext<IAuth>({
  isLoggedIn: false,
  user: null,
  setUser: () => null,
});

const useAuth = () => React.useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const router = useRouter();
  const [user, setUser] = React.useState<IUser | null>(null);

  useEffect(() => {
    if (!user?.token) return;
    localStorage.setItem("token", user.token);
  }, [user?.token]);

  useEffect(() => {
    const getUserData = async (token: string) => {
      const userData = await fetch(`${API_BASE_URL}/user-profile`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(await userData.json());
    };

    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    getUserData(token);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };
