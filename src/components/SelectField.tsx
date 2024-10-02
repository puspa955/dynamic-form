import React from "react";

type Field = {
  name: string;
  label: string;
  options?: string[];
};

type SelectFieldProps = {
  field: Field;
  value: string;
  error?: string;
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const SelectField: React.FC<SelectFieldProps> = ({ field, value, error, handleChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={field.name} className="text-black">
        {field.label}
      </label>
      <select
        name={field.name}
        id={field.name}
        value={value}
        onChange={handleChange}
        className="p-2 bg-gray-500 text-white rounded-md"
      >
        {field.options?.map((option, idx) => (
          <option key={idx} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default SelectField;
