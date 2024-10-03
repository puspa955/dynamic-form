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
  const [isValid, setIsValid] = useState(true);

  const handleFieldChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate the field after change
    const field = schema.find(f => f.name === name);
    if (field) {
      const error = validateField(field, value);
      setIsValid(!error);
    }
  };

  const validateField = (field: Field, value: any) => {
    if (field.required && (value === undefined || value === null || value === '')) {
      return `${field.label} is required.`;
    }
    
    if (typeof value === 'string') { // Check if value is a string before checking length
      if (field.minLength && value.length < field.minLength) {
        return `${field.label} must be at least ${field.minLength} characters long.`;
      }
      if (field.maxLength && value.length > field.maxLength) {
        return `${field.label} must be at most ${field.maxLength} characters long.`;
      }
    }
    
    if (field.min !== undefined && value < field.min) {
      return `${field.label} must be at least ${field.min}.`;
    }
    
    if (field.max !== undefined && value > field.max) {
      return `${field.label} must be at most ${field.max}.`;
    }
    
    return ''; // No error
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check all fields for validation
    const errors = schema.map(field => validateField(field, formData[field.name]));
    setIsValid(!errors.some(error => error));

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
                value={formData[field.name] || ''}
                onChange={(value) => handleFieldChange(field.name, value)}
                required={field.required}
                minLength={field.minLength}
                maxLength={field.maxLength}
              />
            );
          case 'textarea':
            return (
              <TextAreaField
                key={index}
                name={field.name}
                label={field.label}
                placeholder={field.placeholder}
                value={formData[field.name] || ''}
                onChange={(value) => handleFieldChange(field.name, value)}
                required={field.required}
                maxLength={field.maxLength}
              />
            );
          case 'select':
            return (
              <SelectField
                key={index}
                name={field.name}
                label={field.label}
                options={field.options || []}
                value={formData[field.name] || ''}
                onChange={(value) => handleFieldChange(field.name, value)}
                required={field.required}
              />
            );
          case 'checkbox':
            return (
              <CheckboxField
                key={index}
                name={field.name}
                label={field.label}
                checked={formData[field.name] || false}
                onChange={(checked) => handleFieldChange(field.name, checked)}
                required={field.required}
              />
            );
          case 'file':
            return (
              <FileField
                key={index}
                name={field.name}
                label={field.label}
                onChange={(file) => handleFieldChange(field.name, file)}
                required={field.required}
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
