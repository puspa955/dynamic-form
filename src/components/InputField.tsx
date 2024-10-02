import React from 'react';

type InputFieldProps = {
    name: string;
    label: string;
    type: 'text' | 'email' | 'number' | 'tel';
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    minLength?: number; 
    maxLength?: number; 
};

const InputField: React.FC<InputFieldProps> = ({ name, label, type, placeholder, value, onChange, required, minLength, maxLength }) => {
    return (
        <div>
            <label htmlFor={name} className="block mb-1">{label}</label>
            <input
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
                className="border p-2 rounded w-full"
            />
        </div>
    );
};

export default InputField;
