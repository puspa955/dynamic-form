import React, { useState } from 'react';

type InputFieldProps = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  value: any;
  onChange: (value: string) => void;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
};

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  minLength,
  maxLength,
}) => {
  const [error, setError] = useState('');

  const handleBlur = () => {
    if (required && !value) {
      setError(`${label} is required.`);
    } else if (minLength && value.length < minLength) {
      setError(`${label} must be at least ${minLength} characters long.`);
    } else if (maxLength && value.length > maxLength) {
      setError(`${label} must be at most ${maxLength} characters long.`);
    } else {
      setError('');
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-1">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        className={`border p-2 rounded w-full ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default InputField;
