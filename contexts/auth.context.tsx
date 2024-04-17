'use client'
import React from "react";

type IAuth = {
  isLoggedIn: boolean;
};

const AuthContext = React.createContext<IAuth>({
  isLoggedIn: false,
});

const useAuth = () => React.useContext(AuthContext);

const AuthProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); 

  return <AuthContext.Provider value={{ isLoggedIn }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider, useAuth };