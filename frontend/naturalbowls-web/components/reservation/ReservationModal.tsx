
'use client';

import { useState, useEffect, useMemo } from 'react';
import { X, Calendar, Clock, User, ChevronRight } from 'lucide-react';
import { SITE_CONFIG, BUSINESS_HOURS } from '@/lib/seo/constants';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  // State
  const [formData, setFormData] = useState({
    name: '',
    date: '', // YYYY-MM-DD
    time: '' // HH:MM
  });
  const [error, setError] = useState('');

  // Generate next 14 days
  const upcomingDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' }); // lun, mar
      const dayNumber = date.getDate();
      const monthName = date.toLocaleDateString('es-ES', { month: 'short' });
      const fullDate = date.toISOString().split('T')[0];
      const isSunday = date.getDay() === 0;

      dates.push({
        date: date,
        dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        dayNumber,
        monthName: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        fullDate,
        isSunday
      });
    }
    return dates;
  }, []);


  // Generate time slots (9:00 AM to 8:00 PM in 30 min intervals)
  const timeSlots = useMemo(() => {
    const slots = [];
    let currentTime = 9 * 60; // 9:00 in minutes
    const endTime = 20 * 60; // 20:00 (8:00 PM) in minutes

    while (currentTime <= endTime) {
      const hours = Math.floor(currentTime / 60);
      const minutes = currentTime % 60;
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      // Format for display (e.g., 9:00 AM)
      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours > 12 ? hours - 12 : hours;
      const displayTime = `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;

      slots.push({
        value: timeString,
        label: displayTime
      });
      
      currentTime += 30;
    }
    return slots;
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleDateSelect = (date: string) => {
    setFormData(prev => ({ ...prev, date }));
    setError('');
  };

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, time }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!formData.name.trim()) {
      setError('Por favor ingresa tu nombre.');
      return;
    }
    if (!formData.date) {
      setError('Por favor selecciona una fecha.');
      return;
    }
    if (!formData.time) {
      setError('Por favor selecciona una hora.');
      return;
    }

    // Double check Sunday validation (though UI prevents it)
    const selectedDate = new Date(formData.date);
    if (selectedDate.getDay() === 0) { // Sunday technically 6 in some locales but 0 in JS getDay()
      // Note: We create date from YYYY-MM-DD string, which is UTC usually, but for validation relies on local checks in UI.
      // JS Date(string) acts differently. Let's trust UI Disabled state primarily.
      // But adding a check just in case.
      const day = new Date(formData.date + 'T12:00:00').getDay();
      if (day === 0) {
         setError('Lo sentimos, los domingos estamos cerrados (Server check).');
         return;
      }
    }

    // Format message for WhatsApp
    const message = `Hola Natural Bowls, quisiera realizar una reserva:\n\n*Nombre:* ${formData.name}\n*Fecha:* ${formData.date}\n*Hora:* ${formData.time}\n\nGracias!`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappPhone = SITE_CONFIG.phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative bg-[#FAFAFA] rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="bg-white px-6 py-4 flex justify-between items-center border-b border-gray-100 sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-bold text-[#5D4E37]">Reservar Mesa</h2>
            <p className="text-gray-500 text-sm">Reserva tu experiencia Natural Bowls</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Name Input */}
            <div className="space-y-3">
              <label htmlFor="name" className="text-sm font-bold text-[#5D4E37] uppercase tracking-wider flex items-center gap-2">
                <User className="w-4 h-4" />
                Tu Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-white border-0 ring-1 ring-gray-200 rounded-xl px-4 py-3 text-[#5D4E37] placeholder:text-gray-400 focus:ring-2 focus:ring-[#6B8E4E] transition-all shadow-sm"
                placeholder="Ej. María Pérez"
                autoComplete="name"
              />
            </div>

            {/* 2. Date Selection - Scrollable Cards */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#5D4E37] uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Fecha
              </label>
              <div className="flex gap-3 overflow-x-auto pb-4 pt-1 snap-x custom-scrollbar -mx-2 px-2">
                {upcomingDates.map((day) => (
                  <button
                    key={day.fullDate}
                    type="button"
                    disabled={day.isSunday}
                    onClick={() => handleDateSelect(day.fullDate)}
                    className={`
                      flex-shrink-0 w-20 h-24 rounded-2xl flex flex-col items-center justify-center gap-1 border transition-all duration-200 snap-start
                      ${day.isSunday 
                        ? 'bg-gray-50 border-gray-100 opacity-50 cursor-not-allowed grayscale' 
                        : formData.date === day.fullDate
                          ? 'bg-[#6B8E4E] border-[#6B8E4E] text-white shadow-lg shadow-[#6B8E4E]/30 scale-105'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-[#6B8E4E] hover:text-[#6B8E4E] hover:shadow-md'
                      }
                    `}
                  >
                    <span className="text-xs font-medium uppercase tracking-wide opacity-80">{day.monthName}</span>
                    <span className="text-2xl font-bold">{day.dayNumber}</span>
                    <span className="text-xs font-medium uppercase">{day.isSunday ? 'Dom' : day.dayName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Time Selection - Grid */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-[#5D4E37] uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Hora
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.value}
                    type="button"
                    onClick={() => handleTimeSelect(slot.value)}
                    className={`
                      py-2 px-1 rounded-lg text-sm font-medium border transition-all duration-200
                      ${formData.time === slot.value
                        ? 'bg-[#5D4E37] border-[#5D4E37] text-white shadow-md'
                        : 'bg-white border-gray-200 text-gray-600 hover:border-[#6B8E4E] hover:text-[#6B8E4E]'
                      }
                    `}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2 font-medium">
                {BUSINESS_HOURS.days} {BUSINESS_HOURS.reservation}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-red-50 text-red-700 text-sm rounded-xl flex items-start gap-3 border border-red-100 animate-pulse">
                <div className="mt-0.5 min-w-[16px]">⚠️</div>
                <span className="font-medium">{error}</span>
              </div>
            )}
          </form>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-gray-100 sticky bottom-0 z-10">
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full bg-[#6B8E4E] hover:bg-[#5a7a40] text-white font-bold text-lg py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:shadow-[#6B8E4E]/20 active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <span>Confirmar Reserva via WhatsApp</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}
