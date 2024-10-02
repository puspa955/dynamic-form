import React from "react";

type Field = {
  name: string;
  label: string;
};

type CheckboxFieldProps = {
  field: Field;
  value: boolean;
  error?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({ field, value, handleChange, error }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name={field.name}
        id={field.name}
        checked={value}
        onChange={handleChange}
        className="p-2 bg-gray-500 text-white rounded-md"
      />
      <label htmlFor={field.name} className="text-black">
        {field.label}
      </label>
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default CheckboxField;
