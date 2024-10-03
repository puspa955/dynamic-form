import React, { useState } from 'react';

type FileFieldProps = {
  name: string;
  label: string;
  onChange: (file: File | null) => void;
  required?: boolean;
};

const FileField: React.FC<FileFieldProps> = ({
  name,
  label,
  onChange,
  required,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type="file"
        name={name}
        onChange={(e) => onChange(e.target.files?.[0] || null)}
        required={required}
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

export default FileField;
