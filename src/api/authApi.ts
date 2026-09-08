import type {CsrfToken, CurrentUser} from "../types/auth.ts";
import {httpClient} from "./http.ts";
import axios from "axios";

export async function getCsrfToken(): Promise<CsrfToken> {
  const response = await httpClient.get<CsrfToken>("/api/csrf")
  return response.data;
}

export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const response = await httpClient.get("/api/me");
    return response.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401
    ) {
      return null;
    }

    throw new Error(
      "Could not retrieve current user"
    );
  }

}

export async function login(username: string, password: string): Promise<CurrentUser> {
  const csrf = await getCsrfToken();

  const body = new URLSearchParams();

  body.set("username", username);
  body.set("password", password);

  try {
    await httpClient.post(
      "/login",
      body,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          [csrf.headerName]: csrf.token
        }
      }
    );
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error(
        "Invalid username or password"
      );
    }
    throw new Error("Login Failed!")
  }

  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Authentication succeeded but user could not be loaded");
  }

  return user;
}

export async function logout(): Promise<void> {

  const csrf =
    await getCsrfToken();

  await httpClient.post("/logout",
    null,
    {
      headers: {
        [csrf.headerName]:
        csrf.token
      }
    })
}