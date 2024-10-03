import React, { useState } from 'react';

type SelectFieldProps = {
  name: string;
  label: string;
  options: string[];
  required?: boolean;
  onValueChange: (name: string, value: string) => void; 
};

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  required,
  onValueChange,
}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onValueChange(name, newValue);
    validate(newValue);
  };

  const validate = (newValue: string) => {
    const errorMsg = required && !newValue ? `${label} is required.` : '';
    setError(errorMsg);
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={() => validate(value)} 
        className={`border p-2 rounded w-full ${error ? 'border-red-500' : ''}`}
      >
        <option value="">Select...</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectField;
