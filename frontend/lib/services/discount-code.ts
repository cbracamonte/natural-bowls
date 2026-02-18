import { DISCOUNTS_CODES } from '@/lib/seo/constants';

const SIGNING_SECRET = 'nb_k_2024_7x9p_d1sc0';

const STORAGE_KEYS = {
  session: '_nb_sess',
} as const;

interface DiscountSession {
  phone: string;
  code: string;
  createdAt: string;
  used: boolean;
  usedAt?: string;
  sig: string;
}

async function hmacSign(data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(SIGNING_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const buf = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(buf)));
}

async function hmacVerify(data: string, sig: string): Promise<boolean> {
  return (await hmacSign(data)) === sig;
}

function buildSigData(session: Omit<DiscountSession, 'sig'>): string {
  const base = `${session.phone}:${session.code}:${session.createdAt}:${session.used}`;
  return session.usedAt ? `${base}:${session.usedAt}` : base;
}

function readSession(): DiscountSession | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(STORAGE_KEYS.session);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DiscountSession;
  } catch {
    return null;
  }
}

export interface DiscountState {
  isEligible: boolean;
  existingCode: string;
}

export interface GenerateCodeResult {
  code: string;
  phone: string;
}

export interface PhoneValidationResult {
  isValid: boolean;
  error?: string;
}

export interface DiscountValidationResult {
  isValid: boolean;
  error?: string;
}

export class DiscountCodeService {
  /** Determina si el modal de primer pedido debe mostrarse (sync — solo lectura de storage) */
  static getInitialState(): DiscountState {
    const session = readSession();
    if (!session) return { isEligible: true, existingCode: '' };
    if (session.used) return { isEligible: false, existingCode: '' };
    return { isEligible: false, existingCode: session.code };
  }

  /** Recupera el teléfono guardado en sesión (sync) */
  static getPhoneFromStorage(): string {
    return readSession()?.phone ?? '';
  }

  static validatePhone(phone: string): PhoneValidationResult {
    const clean = phone.replace(/\D/g, '');
    if (!clean) return { isValid: false, error: 'Por favor ingresa un número de WhatsApp' };
    if (clean.length !== 9) return { isValid: false, error: 'El número debe tener 9 dígitos' };
    return { isValid: true };
  }

  /** Genera el código y guarda la sesión firmada con HMAC-SHA256 */
  static async saveCode(phone: string): Promise<GenerateCodeResult> {
    const cleanPhone = phone.replace(/\D/g, '');
    const code = DISCOUNTS_CODES.FIRSTORDER.code;
    const createdAt = new Date().toISOString();
    const partial = { phone: cleanPhone, code, createdAt, used: false };
    const sig = await hmacSign(buildSigData(partial));
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify({ ...partial, sig }));
    return { code, phone: cleanPhone };
  }

  /** Valida el código verificando la firma HMAC, expiración y uso previo */
  static async validateCode(
    inputCode: string,
    phone: string,
  ): Promise<DiscountValidationResult> {
    const code = inputCode.trim().toUpperCase();
    const session = readSession();

    if (!session) {
      return { isValid: false, error: 'No hay código disponible. Genera uno primero.' };
    }

    const isIntact = await hmacVerify(buildSigData(session), session.sig);
    if (!isIntact) {
      return { isValid: false, error: 'Código inválido o modificado' };
    }

    if (code !== DISCOUNTS_CODES.FIRSTORDER.code) {
      return { isValid: false, error: 'Código de descuento inválido' };
    }

    const phoneToValidate = phone.replace(/\D/g, '') || session.phone;
    if (phoneToValidate !== session.phone) {
      return {
        isValid: false,
        error: `Teléfono no coincide. Usaste ${session.phone} para generar el código.`,
      };
    }

    const expirationDate = new Date(
      new Date(session.createdAt).getTime() +
        DISCOUNTS_CODES.FIRSTORDER.expirationDays * 24 * 60 * 60 * 1000,
    );
    if (new Date() > expirationDate) {
      return {
        isValid: false,
        error: `El código ha expirado (válido ${DISCOUNTS_CODES.FIRSTORDER.expirationDays} días)`,
      };
    }

    if (session.used) {
      return { isValid: false, error: 'Este código ya fue utilizado' };
    }

    return { isValid: true };
  }

  /** Marca el código como usado regenerando el blob firmado con used: true */
  static async markAsUsed(): Promise<void> {
    const session = readSession();
    if (!session) return;
    const usedAt = new Date().toISOString();
    const updated = { ...session, used: true, usedAt };
    const sig = await hmacSign(buildSigData(updated));
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify({ ...updated, sig }));
  }

  static clearOrderStorage(): void {
    localStorage.removeItem('bowlOrder');
  }

  static copyToClipboard(text: string): Promise<void> {
    return navigator.clipboard.writeText(text);
  }
}
