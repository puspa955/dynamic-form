import React, { useState, useEffect } from 'react';

type SelectFieldProps = {
  name: string;
  label: string;
  options: string[];
  value: string;
  error: string;
  onChange: (name:string ,value: string) => void;
  onErrorChange: (error: string) => void;
  required?: boolean;
};

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  value,
  error,
  onChange,
  onErrorChange,
  required,
}) => {
  const [fieldError, setFieldError] = useState('');

  useEffect(() => {
    validate(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    onChange(name, newValue); // Sends the value to the form
    // validate(newValue); // Validates the value inside the field
  };

  const validate = (value: string) => {
    let errorMsg = '';
    if (required && !value) {
      errorMsg = `${label} is required.`;
    }

    setFieldError(errorMsg); // Set the error inside the component
    onErrorChange(errorMsg); // Sends the error to the form
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <select name={name} value={value} onChange={handleChange} className="border p-2 rounded w-full">
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {fieldError && <p className="text-red-500">{fieldError}</p>}
    </div>
  );
};

export default SelectField;
