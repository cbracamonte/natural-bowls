import type { LoginFormData } from "@/lib/schemas/login";

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface AuthError {
  message: string;
  code?: string;
}

/**
 * Inicia sesión con correo y contraseña.
 * TODO: Conectar con la API del backend (POST /auth/login)
 */
export async function login(data: LoginFormData): Promise<AuthResponse> {
  // TODO: Reemplazar con llamada real al backend
  // const res = await fetch(`${API_BASE_URL}/auth/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) {
  //   const error: AuthError = await res.json();
  //   throw new Error(error.message);
  // }
  // return res.json();

  await new Promise((resolve) => setTimeout(resolve, 1000));
  throw new Error("Servicio no disponible. Intenta más tarde.");
}
