// lib/services/newsletter.ts

export interface SubscribeResponse {
  success: boolean;
  message: string;
  email?: string;
  error?: string;
}

export async function subscribeToNewsletter(
  email: string
): Promise<SubscribeResponse> {
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.error || 'Error al suscribirse',
        error: data.error,
      };
    }

    return {
      success: true,
      message: data.message || 'Suscripción exitosa',
      email: data.email,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error de conexión';
    return {
      success: false,
      message: 'Error de conexión. Intenta más tarde.',
      error: errorMessage,
    };
  }
}
