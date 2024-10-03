import React, { useState } from 'react';

type SelectFieldProps = {
  name: string;
  label: string;
  options: string[];
  value: any;
  onChange: (value: string) => void;
  required?: boolean;
};

const SelectField: React.FC<SelectFieldProps> = ({
  name,
  label,
  options,
  value,
  onChange,
  required,
}) => {
  const [error, setError] = useState('');

  const handleBlur = () => {
    if (required && !value) {
      setError(`${label} is required.`);
    } else {
      setError('');
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        required={required}
        className={`border p-2 rounded w-full ${error ? 'border-red-500' : ''}`}
      >
        <option value="">Select</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default SelectField;
