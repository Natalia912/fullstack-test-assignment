import { useMutation } from "@tanstack/react-query";
import { useState, useCallback } from "react";
import * as api from "../api/auth";
import type { LoginPayload } from "../types";

export function useAuth() {
  const [loggedIn, setLoggedIn] = useState(api.isLoggedIn());

  const loginMutation = useMutation({
    mutationFn: (payload: LoginPayload) => api.login(payload),
    onSuccess: (data) => {
      api.saveToken(data.token);
      setLoggedIn(true);
    },
  });

  const logout = useCallback(() => {
    api.clearToken();
    setLoggedIn(false);
  }, []);

  return {
    loggedIn,
    login: loginMutation.mutate,
    loginError: loginMutation.error,
    isLoggingIn: loginMutation.isPending,
    logout,
  };
}
