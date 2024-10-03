import React, { useState } from 'react';
import InputField from './InputField';
import TextAreaField from './TextAreaField';
import SelectField from './SelectField';
import CheckboxField from './CheckboxField';
import FileField from './FileField';

type Field = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
};

type FormProps = {
  schema: Field[];
  onSubmit: (data: any) => void;
};

const Form: React.FC<FormProps> = ({ schema, onSubmit }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isValid, setIsValid] = useState(true);

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name: string, value: any) => {
    const field = schema.find((f) => f.name === name);
    if (!field) return;

    let errorMsg = '';
    if (field.required && (value === undefined || value === null || value === '')) {
      errorMsg = `${field.label} is required.`;
    } 
    else if (field.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMsg = 'Please enter a valid email address.';
      }
    }

    if (typeof value === 'string') { 
      if (field.minLength && value.length < field.minLength) {
        errorMsg = `${field.label} must be at least ${field.minLength} characters long.`;
      }
      if (field.maxLength && value.length > field.maxLength) {
        errorMsg = `${field.label} must be at most ${field.maxLength} characters long.`;
      }
    }
    
    if (field.min !== undefined && value < field.min) {
      errorMsg = `${field.label} must be at least ${field.min}.`;
    }
    
    if (field.max !== undefined && value > field.max) {
      errorMsg = `${field.label} must be at most ${field.max}.`;
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));

    setIsValid(Object.values({ ...formErrors, [name]: errorMsg }).every((err) => !err));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    schema.forEach((field) => validateField(field.name, formData[field.name]));

    if (isValid) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {schema.map((field, index) => {
        switch (field.type) {
          case 'text':
          case 'email':
          case 'number':
            return (
              <InputField
                key={index}
                name={field.name}
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                minLength={field.minLength}
                maxLength={field.maxLength}
                onValueChange={handleFieldChange}
              />
            );
          case 'textarea':
            return (
              <TextAreaField
                key={index}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                maxLength={field.maxLength}
                onValueChange={handleFieldChange}
              />
            );
          case 'select':
            return (
              <SelectField
                key={index}
                name={field.name}
                label={field.label}
                options={field.options || []}
                required={field.required}
                onValueChange={handleFieldChange}
              />
            );
          case 'checkbox':
            return (
              <CheckboxField
                key={index}
                name={field.name}
                label={field.label}
                required={field.required}
                onValueChange={handleFieldChange}
              />
            );
          case 'file':
            return (
              <FileField
                key={index}
                name={field.name}
                label={field.label}
                required={field.required}
                onValueChange={handleFieldChange}
              />
            );
          default:
            return null;
        }
      })}
      <button
        type="submit"
        disabled={!isValid}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
