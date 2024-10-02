import React from "react";

type Field = {
  name: string;
  label: string;
};

type FileFieldProps = {
  field: Field;
  value: string;
  error?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileField: React.FC<FileFieldProps> = ({ field, value, handleChange, error }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={field.name} className="text-black">
        {field.label}
      </label>
      <input
        type="file"
        name={field.name}
        id={field.name}
        onChange={handleChange}
        className="p-2 bg-gray-500 text-white rounded-md"
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default FileField;
