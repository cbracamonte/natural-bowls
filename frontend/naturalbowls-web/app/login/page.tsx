"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { loginSchema, type LoginFormData } from "@/lib/schemas/login";
import { login } from "@/lib/services/auth";

export default function LoginPage() {
  const [form, setForm] = useState<LoginFormData>({ email: "", password: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (serverError) setServerError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError("");

    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: typeof errors = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof LoginFormData;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await login(result.data);
      // TODO: Guardar token, redirigir al usuario
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Error inesperado");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo — Imagen */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <Image
          src="/images/smoothie-bowl.jpg"
          alt="Smoothie bowl de Natural Bowls"
          fill
          className={`object-cover transition-transform duration-[1200ms] ease-out ${
            mounted ? "scale-100" : "scale-110"
          }`}
          priority
        />
        <div className="absolute inset-0 bg-[#5D4E37]/40" />
        <div className={`absolute inset-0 flex flex-col items-center justify-center px-12 text-center transition-all duration-700 ease-out delay-300 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <Image
            src="/icons/nb-logotipo-white.svg"
            alt="Natural Bowls"
            width={240}
            height={80}
            className="mb-8"
          />
          <p className="text-white/90 text-xl max-w-md leading-relaxed">
            Alimentación saludable, fresca y deliciosa en el corazón de Trujillo.
          </p>
        </div>
      </div>

      {/* Panel derecho — Formulario */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className={`w-full max-w-md space-y-8 transition-all duration-700 ease-out delay-150 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}>
          {/* Logo mobile */}
          <div className="flex justify-center lg:hidden">
            <Link href="/">
              <Image
                src="/icons/nb-logotipo.svg"
                alt="Natural Bowls"
                width={180}
                height={60}
              />
            </Link>
          </div>

          {/* Encabezado */}
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-[#5D4E37]">
              Bienvenido de vuelta
            </h1>
            <p className="mt-2 text-gray-500">
              Ingresa tus datos para acceder a tu cuenta
            </p>
          </div>

          {/* Error del servidor */}
          {serverError && (
            <div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm"
              role="alert"
            >
              {serverError}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#5D4E37] mb-1.5"
              >
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`w-full px-4 py-3 rounded-xl border bg-gray-50 text-[#5D4E37] placeholder:text-gray-400 outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-[#9CB973] ${
                  errors.email ? "border-red-400 focus:ring-red-300" : "border-gray-200"
                }`}
                placeholder="tu@correo.com"
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#5D4E37] mb-1.5"
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={handleChange}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`w-full px-4 py-3 pr-12 rounded-xl border bg-gray-50 text-[#5D4E37] placeholder:text-gray-400 outline-none transition-colors focus:bg-white focus:ring-2 focus:ring-[#9CB973] ${
                    errors.password ? "border-red-400 focus:ring-red-300" : "border-gray-200"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#5D4E37] transition-colors"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" aria-hidden />
                  ) : (
                    <Eye className="w-5 h-5" aria-hidden />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="mt-1 text-sm text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Olvidé contraseña */}
            <div className="flex justify-end">
              <Link
                href="#"
                className="text-sm text-[#6B8E4E] hover:text-[#5a7a40] font-medium transition-colors"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#5D4E37] text-white rounded-xl font-semibold hover:bg-[#4A3E2C] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" aria-hidden />
                  Ingresando...
                </>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Registro */}
          <p className="text-center text-sm text-gray-500">
            ¿No tienes cuenta?{" "}
            <Link
              href="#"
              className="text-[#6B8E4E] hover:text-[#5a7a40] font-semibold transition-colors"
            >
              Regístrate
            </Link>
          </p>

          {/* Volver */}
          <p className="text-center">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-[#5D4E37] transition-colors"
            >
              Volver al inicio
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
