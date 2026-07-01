import { type ReactNode } from "react";

import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "./auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { loggedIn, login, loginError, isLoggingIn, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        login,
        loginError,
        isLoggingIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
