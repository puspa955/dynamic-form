import React from "react";

type Field = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
};

type InputFieldProps = {
  field: Field;
  value: string;
  error?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({ field, value, error, handleChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={field.name} className="text-black">
        {field.label}
      </label>
      <input
        type={field.type}
        name={field.name}
        id={field.name}
        placeholder={field.placeholder}
        value={value}
        onChange={handleChange}
        className="p-2 bg-gray-500 text-white rounded-md"
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default InputField;
