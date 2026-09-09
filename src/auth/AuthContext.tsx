import type {CurrentUser, Role} from "@/types/auth.ts";
import type {ReactNode} from "react";
import {createContext, useContext, useEffect, useState} from "react";
import {getCurrentUser, login as loginRequest, logout as logoutRequest} from "../api/authApi";

interface AuthContextValue {
  user: CurrentUser | null;
  loading: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<CurrentUser>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  hasRole: (role: Role) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {

  const [user, setUser] = useState<CurrentUser | null>(null);

  const [loading, setLoading] = useState<boolean>(true);


  async function refreshUser(): Promise<void> {
    try {
      const currentUser = await getCurrentUser();

      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refreshUser();
  }, []);

  async function login(username: string, password: string): Promise<CurrentUser> {

    const loggedInUser = await loginRequest(username, password);
    setUser(loggedInUser);

    return loggedInUser;
  }


  async function logout(): Promise<void> {

    await logoutRequest();
    setUser(null);
  }


  function hasRole(
    role: Role
  ): boolean {

    return (
      user?.roles.includes(role)
      ?? false
    );
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth():
  AuthContextValue {

  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}
