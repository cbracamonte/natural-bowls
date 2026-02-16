'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function FirstOrderModal() {
  const [isOpen, setIsOpen] = useState(() => {
    // Verificar si ya tiene código de descuento
    const savedCode = localStorage.getItem('firstOrderCode');
    return !savedCode; // Abierto si no hay código guardado
  });
  const [phone, setPhone] = useState('');
  const [generatedCode, setGeneratedCode] = useState(() => {
    // Inicializar con el código guardado si existe
    return localStorage.getItem('firstOrderCode') || '';
  });
  const [error, setError] = useState('');

  const generateCode = (): string => {
    // Código de descuento para Natural Bowls: NB15 (15% descuento)
    return 'NB15';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const cleanPhone = phone.replace(/\D/g, '');

    if (!cleanPhone) {
      setError('Por favor ingresa un número de WhatsApp');
      return;
    }

    if (cleanPhone.length !== 9) {
      setError('El número debe tener 9 dígitos');
      return;
    }

    // Generar código
    const code = generateCode();

    // Guardar en localStorage con timestamp y estado
    localStorage.setItem('firstOrderCode', code);
    localStorage.setItem('firstOrderPhone', cleanPhone);
    localStorage.setItem('firstOrderCodeTime', new Date().toISOString());
    localStorage.setItem('firstOrderCodeUsed', 'false');

    setGeneratedCode(code);

  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-xl">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            🎉 ¡Bienvenido!
          </h2>
          <p className="text-gray-600">
            Obtén tu código de descuento para tu primer pedido
          </p>
        </div>

        {!generatedCode ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de WhatsApp
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setError('');
                }}
                placeholder="912 341 818"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6B8E4E]-500 focus:border-transparent"
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>

            <Button type="submit" className="w-full">
              Generar Código
            </Button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="bg-[#6B8E4E]/10 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-2">Tu código de descuento:</p>
              <p className="text-2xl font-bold text-[#6B8E4E] font-mono">
                {generatedCode}
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs text-gray-600 mb-2">
                <span className="font-semibold">Importante:</span> Este código es personal y válido por 7 días. Solo puede usarse una vez.
              </p>
              <p className="text-xs text-gray-500">
                Descuento: 15% en tu primer pedido
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Copia este código para usarlo en tu primer pedido
            </p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedCode);
                alert('Código copiado al portapapeles');
              }}
              className="text-[#6B8E4E] hover:text-[#5D4E37] font-medium text-sm"
            >
              Copiar código
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
