import React from 'react';

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
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
       <label htmlFor={name}>{label}</label>
        <select name={name} value={value} onChange={handleChange} required={required} className="border p-2 rounded w-full">
          <option value="">Select</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      
    </div>
  );
};

export default SelectField;
