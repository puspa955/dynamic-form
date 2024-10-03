import React, { useState } from 'react';

type InputFieldProps = {
  name: string;
  label: string;
  type: string; 
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  onValueChange: (name: string, value: string) => void; 
};

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  required,
  minLength,
  maxLength,
  onValueChange,
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onValueChange(name, newValue);
    validate(newValue);
  };

  const validate = (newValue: string) => {
    let errorMsg = '';
    
    // Check for required field
    if (required && !newValue) {
      errorMsg = `${label} is required.`;
    } 
    // Validate email format
    else if (type === 'email' && newValue && !/\S+@\S+\.\S+/.test(newValue)) {
      errorMsg = 'Please enter a valid email address.';
    }
    // Check for minimum length
    else if (minLength && newValue.length < minLength) {
      errorMsg = `${label} must be at least ${minLength} characters long.`;
    } 
    // Check for maximum length
    else if (maxLength && newValue.length > maxLength) {
      errorMsg = `${label} must be at most ${maxLength} characters long.`;
    }

    setError(errorMsg);
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-1">{label}</label>
      <input
        type={type}
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

export default InputField;
