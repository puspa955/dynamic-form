import React, { useState, useEffect } from 'react';

type TextAreaFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  value: string;
  error: string;
  onChange: (name:string,value: string) => void;
  onErrorChange: (error: string) => void;
  required?: boolean;
  maxLength?: number;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  placeholder,
  value,
  error,
  onChange,
  onErrorChange,
  required,
  maxLength,
}) => {
  const [fieldError, setFieldError] = useState('');

  useEffect(() => {
    validate(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(name, newValue); // Sends the value to the form
    validate(newValue); // Validates the value inside the field
  };

  const validate = (value: string) => {
    let errorMsg = '';
    if (required && !value) {
      errorMsg = `${label} is required.`;
    }
    if (maxLength && value.length > maxLength) {
      errorMsg = `${label} must be at most ${maxLength} characters long.`;
    }

    setFieldError(errorMsg); // Set the error inside the component
    onErrorChange(errorMsg); // Sends the error to the form
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      {fieldError && <p className="text-red-500">{fieldError}</p>}
    </div>
  );
};

export default TextAreaField;
