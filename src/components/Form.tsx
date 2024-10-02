import React, { useState, FormEvent } from 'react';
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

  const handleFieldChange = (name: string, value: any) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {schema.map((field, index) => {
        switch (field.type) {
          case 'text':
          case 'email':
          case 'number':
          case 'tel':
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
      <button type="submit" className="bg-green-700 p-2 rounded-md hover:bg-green-600 text-white">
        Submit
      </button>
    </form>
  );
};

export default Form;
