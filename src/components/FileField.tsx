import React, { useState } from 'react';

type FileFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  onValueChange: (name: string, value: File | null) => void; 
};

const FileField: React.FC<FileFieldProps> = ({
  name,
  label,
  required,
  onValueChange,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files ? e.target.files[0] : null;
    setFile(newFile);
    onValueChange(name, newFile);
    validate(newFile);
  };

  const validate = (newFile: File | null) => {
    const errorMsg = required && !newFile ? `${label} is required.` : '';
    setError(errorMsg);
  };

  return (
    <div>
      <label htmlFor={name} className="block mb-1">{label}</label>
      <input
        type="file"
        onChange={handleChange}
        onBlur={() => validate(file)} 
        className={`border p-2 rounded w-full ${error ? 'border-red-500' : ''}`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FileField;
