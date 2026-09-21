import {httpClient} from "@/api/http.ts";
import axios from "axios";
import type {Urls} from "@/types/urlTypes.ts";

export async function getAllUrls(): Promise<Urls[] | null> {
  try {
    const response = await httpClient.get("/api/v1/urls");
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 401) {
      return null;
    }

    throw new Error("Could not fetch all URL(s)");
  }
}

export async function deleteRow(id: number): Promise<void> {
  const csrfResponse = await httpClient.get("/api/csrf");

  const {token, headerName} = csrfResponse.data;

  await httpClient.delete(`/api/v1/delete/${id}`, {
    headers: {
      [headerName]: token
    }
  });
}