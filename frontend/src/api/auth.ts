import request from "./client";
import type { LoginPayload, LoginResponse } from "../types";

export function login(payload: LoginPayload): Promise<LoginResponse> {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function saveToken(token: string) {
  sessionStorage.setItem("admin_token", token);
}

export function clearToken() {
  sessionStorage.removeItem("admin_token");
}

export function isLoggedIn(): boolean {
  return !!sessionStorage.getItem("admin_token");
}
