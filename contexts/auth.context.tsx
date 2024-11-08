"use client";
import { API_BASE_URL } from "@/api";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

type IAuth = {
  user: IUser | null;
  setUser: (v: IUser) => void;
  logout: () => void;
};

type IUser = {
  userType?: string;
  fullName: string;
  email: string;
  token: string;
  pictureUrl?: string;
};

const NO_AUTH_ROUTES = ["/login", "/register", "/landing"];

const AuthContext = React.createContext<IAuth>({
  user: null,
  setUser: () => null,
  logout: () => null,
});

const useAuth = () => React.useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = React.useState<IUser | null>(null);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.replace("/login");
  };

  useEffect(() => {
    if (!user?.token) return;
    localStorage.setItem("token", user.token);
  }, [user?.token]);

  useEffect(() => {
    const getUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      const userData = await fetch(`${API_BASE_URL}/user/profile`, {
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
    if (!token && !NO_AUTH_ROUTES.includes(pathname)) {
      router.replace("/login");
      return;
    }

    getUserData();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider, useAuth };
