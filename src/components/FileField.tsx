import React from 'react';

type FileFieldProps = {
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const FileField: React.FC<FileFieldProps> = ({ name, label, onChange, required }) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input
      type="file"
      name={name}
      id={name}
      onChange={onChange}
      required={required}
      className="p-2 bg-gray-500 text-white rounded-md"
    />
  </div>
);

export default FileField;
