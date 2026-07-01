import { createContext } from "react";

import type { LoginPayload } from "../types";

interface AuthContextValue {
  loggedIn: boolean;
  login: (payload: LoginPayload) => void;
  loginError: Error | null;
  isLoggingIn: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
