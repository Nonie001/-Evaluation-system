// components/ui/Input.tsx

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export default function Input({ 
  label, 
  error, 
  helper, 
  className = '', 
  ...props 
}: InputProps) {
  const baseClasses = 'w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all';
  const errorClasses = error ? 'border-red-300 focus:ring-red-500' : 'border-gray-200';

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`${baseClasses} ${errorClasses} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
      {helper && !error && (
        <p className="text-gray-500 text-sm">{helper}</p>
      )}
    </div>
  );
}
