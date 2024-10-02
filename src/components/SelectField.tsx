import React from 'react';

type SelectFieldProps = {
  name: string;
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
};

const SelectField: React.FC<SelectFieldProps> = ({ name, label, options, value, onChange, required }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required={required}
      className="p-2 bg-gray-500 text-white rounded-md"
    >
      {options.map((option, idx) => (
        <option key={idx} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default SelectField;
