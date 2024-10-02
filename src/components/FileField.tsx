import React from 'react';

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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files?.[0] || null); 
  };

  return (
    <div>
       <label htmlFor={name}>{label}</label>
        <input
          type="file"
          name={name}
          onChange={handleChange}
          required={required}
          className="border p-2 rounded w-full"
        />
      
    </div>
  );
};

export default FileField;
