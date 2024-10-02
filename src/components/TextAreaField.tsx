import React from 'react';

type TextAreaFieldProps = {
    name: string;
    label: string;
    placeholder?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
    return (
        <div>
            <label htmlFor={name} className="block mb-1">{label}</label>
            <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                maxLength={maxLength} 
                className="border p-2 rounded w-full"
            />
        </div>
    );
};

export default TextAreaField;
