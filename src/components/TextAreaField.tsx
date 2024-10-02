import React from 'react';

type TextAreaFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  value: any;
  onChange: (value: string) => void;
  required?: boolean;
  maxLength?: number;
};

const TextAreaField: React.FC<TextAreaFieldProps> = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  required,
  maxLength,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value); 
  };

  return (
    <div>
     <label htmlFor={name} className="block mb-1">{label}</label>
        <textarea
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required={required}
          maxLength={maxLength}
          className="border p-2 rounded w-full"
        />
      
    </div>
  );
};

export default TextAreaField;
