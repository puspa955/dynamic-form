import React, { useState, useEffect } from 'react';

type FileFieldProps = {
  name: string;
  label: string;
  value: File | null;
  error: string;
  onChange: (file: File | null) => void;
  onErrorChange: (error: string) => void;
  required?: boolean;
};

const FileField: React.FC<FileFieldProps> = ({
  name,
  label,
  value,
  error,
  onChange,
  onErrorChange,
  required,
}) => {
  const [fieldError, setFieldError] = useState('');

  useEffect(() => {
    validate(value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    onChange(file); // Sends the file to the form
    validate(file); // Validates the file inside the field
  };

  const validate = (file: File | null) => {
    let errorMsg = '';
    if (required && !file) {
      errorMsg = `${label} is required.`;
    }

    setFieldError(errorMsg); // Set the error inside the component
    onErrorChange(errorMsg); // Sends the error to the form
  };

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type="file" name={name} onChange={handleChange} className="border p-2 rounded w-full" />
      {fieldError && <p className="text-red-500">{fieldError}</p>}
    </div>
  );
};

export default FileField;
