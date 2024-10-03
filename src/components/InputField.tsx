import React, { useState } from 'react';

type InputFieldProps = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  value: string;
  error: string;
  onChange: (value: string) => void;
  onErrorChange: (error: string) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  required,
  minLength,
  maxLength,
  value,
  error,
  onChange,
  onErrorChange,
}) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    validate(value); // Validate on blur
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    // validate(newValue); // Validate on change
  };

  const validate = (value: string) => {
    let errorMsg = '';
    if (required && !value) {
      errorMsg = `${label} is required.`;
    } else if (minLength && value.length < minLength) {
      errorMsg = `${label} must be at least ${minLength} characters long.`;
    } else if (maxLength && value.length > maxLength) {
      errorMsg = `${label} must be at most ${maxLength} characters long.`;
    }
    onErrorChange(errorMsg); // Pass the error to the parent
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
        onBlur={handleBlur}  
        className={`border p-2 rounded w-full ${error && touched ? 'border-red-500' : ''}`}
      />
      {error && touched && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default InputField;
