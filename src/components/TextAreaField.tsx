import React, { useState } from 'react';

type TextAreaFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  onValueChange: (name: string, value: string) => void; 
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  placeholder,
  required,
  maxLength,
  onValueChange,
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onValueChange(name, newValue);
    validate(newValue);
  };

  const validate = (newValue: string) => {
    let errorMsg = '';
    if (required && !newValue) {
      errorMsg = `${label} is required.`;
    } else if (maxLength && newValue.length > maxLength) {
      errorMsg = `${label} must be at most ${maxLength} characters long.`;
    }
    setError(errorMsg);
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-1">{label}</label>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={() => validate(value)} 
        className={`border p-2 rounded w-full ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default TextAreaField;
