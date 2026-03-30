import { apiClient } from "./client";

export interface BackendAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export async function loginWithGoogle(idToken: string): Promise<BackendAuthResponse> {
  return apiClient<BackendAuthResponse>("auth/login/oauth/google", {
    method: "POST",
    body: { idToken },
  });
}
