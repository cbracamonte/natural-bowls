import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Verificar que la API key exista AL INICIAR
const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  console.error(
    '❌ CRÍTICO: RESEND_API_KEY no está configurada. Asegúrate de agregar la variable de entorno en Vercel o .env.local'
  );
}

const resend = new Resend(apiKey);

// Almacenamiento temporal de suscriptores (en producción usar base de datos)
const subscribers = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    // Validar que la API key esté presente
    if (!apiKey) {
      console.error('❌ API Key no configurada. Configúrala en Vercel Environment Variables');
      return NextResponse.json(
        {
          error:
            'Error de configuración del servidor. Falta RESEND_API_KEY en las variables de entorno',
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { email } = body;


    // Validar email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Verificar si ya está suscrito
    if (subscribers.has(email)) {
      return NextResponse.json(
        { error: 'Este email ya está suscrito' },
        { status: 400 }
      );
    }

    // Agregar a suscriptores
    subscribers.add(email);

    // Enviar email

    const result = await resend.emails.send({
      from: `Natural Bowls <${process.env.RESEND_FROM_EMAIL}>`,
      to: email,
      subject: '¡Bienvenido a Natural Bowls! Estarás entre los primeros en recibir ofertas',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #6B8E4E 0%, #5D7A42 100%); padding: 40px 20px; border-radius: 12px; color: white; text-align: center; margin-bottom: 30px;">
            <h1 style="margin: 0; font-size: 28px;">¡Bienvenido a Natural Bowls!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.95;">Ya formas parte de nuestra comunidad consciente</p>
          </div>
          
          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            Hola 👋,
          </p>
          
          <p style="font-size: 16px; color: #555; line-height: 1.6; margin-bottom: 20px;">
            ¡Gracias por suscribirte! Ahora estarás entre los primeros en recibir nuestras ofertas, promociones y contenido exclusivo que no verás en redes sociales.
          </p>
          
          <div style="background: #F5F3EF; padding: 20px; border-radius: 8px; margin: 30px 0; border-left: 4px solid #6B8E4E;">
            <p style="font-size: 14px; color: #333; margin: 0;"><strong>📬 ¿Qué esperar?</strong></p>
            <ul style="font-size: 14px; color: #555; margin: 10px 0; padding-left: 20px;">
              <li>Ofertas semanales exclusivas</li>
              <li>Nuevos lanzamientos antes que nadie</li>
              <li>Tips de nutrición y recetas</li>
              <li>Acceso prioritario a eventos especiales</li>
            </ul>
          </div>
          
          <p style="font-size: 14px; color: #666; line-height: 1.6; margin-bottom: 20px;">
            Tu email: <strong>${email}</strong>
          </p>
          
          <p style="font-size: 14px; color: #666; margin: 20px 0;">
            <a href="https://naturalbowls.cafe/menu" style="background: #6B8E4E; color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold;">
              Ver Menú Ahora
            </a>
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          
          <p style="font-size: 12px; color: #999; margin: 10px 0; text-align: center;">
            Natural Bowls • Trujillo, Perú<br>
            📍 Síguenos en <a href="https://instagram.com/naturalbowls.cafe" style="color: #6B8E4E; text-decoration: none;">Instagram @naturalbowls.cafe</a>
          </p>
        </div>
      `,
    });


    if (result.error) {
      console.error('❌ Error de Resend:', result.error);
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      );
    }


    return NextResponse.json(
      {
        success: true,
        message: 'Suscripción exitosa. Revisa tu email.',
        email: email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error en Newsletter:', error);

    // Mostrar error más específico
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';

    return NextResponse.json(
      { error: `Error: ${errorMessage}` },
      { status: 500 }
    );
  }
}

// Endpoint para debugging
export async function GET() {
  return NextResponse.json({
    message: 'API Newsletter endpoint',
    subscribers: subscribers.size,
    hasApiKey: !!apiKey,
    apiKeyLength: apiKey ? apiKey.length : 0,
  });
}
