import { cn } from '@/lib/utils';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, name, required, ...props }, ref) => {
    const inputId = id || name;
    const errorId = error ? `${inputId || 'input'}-error` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-600"> *</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          name={name}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
          required={required}
          className={cn(
            'w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6B8E4E] focus:border-transparent transition-colors',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
