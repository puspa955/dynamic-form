import React from "react";

type Field = {
  name: string;
  label: string;
  placeholder?: string;
};

type TextAreaFieldProps = {
  field: Field;
  value: string;
  error?: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({ field, value, error, handleChange }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={field.name} className="text-black">
        {field.label}
      </label>
      <textarea
        name={field.name}
        id={field.name}
        placeholder={field.placeholder}
        value={value}
        onChange={handleChange}
        className="p-2 bg-gray-400 text-white rounded-md"
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default TextAreaField;
