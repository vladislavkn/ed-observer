import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, ReactNode, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { auth } from "../firebase";

const userContext = createContext<User | null>(null);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => onAuthStateChanged(auth, setUser), []);

  return <userContext.Provider value={user}>{children}</userContext.Provider>;
};

export const useUser = () => useContext(userContext);
