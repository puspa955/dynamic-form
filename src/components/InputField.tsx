import React from 'react';

type InputFieldProps = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  value: any;
  onChange: (value: string) => void; 
  required?: boolean;
  minLength?: number;
  maxLength?: number;
};

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  minLength,
  maxLength,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); 
  };

  return (
    <div>
      <label htmlFor={name} className='block mb-1'>
        {label}</label>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required={required}
          minLength={minLength}
          maxLength={maxLength}
           className="border p-2 rounded w-full"
        />
      
    </div>
  );
};

export default InputField;
