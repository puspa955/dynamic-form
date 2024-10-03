import React, { useState } from 'react';

type TextAreaFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  value: any;
  onChange: (value: string) => void;
  required?: boolean;
  maxLength?: number;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
  maxLength,
}) => {
  const [error, setError] = useState('');

  const handleBlur = () => {
    if (required && !value) {
      setError(`${label} is required.`);
    } else if (maxLength && value.length > maxLength) {
      setError(`${label} must be at most ${maxLength} characters long.`);
    } else {
      setError('');
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-1">{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        required={required}
        maxLength={maxLength}
        className={`border p-2 rounded w-full ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextAreaField;
