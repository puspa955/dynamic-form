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
  onSubmit: (data: any) => void; // Callback function to handle form submission
};

const Form: React.FC<FormProps> = ({ schema, onSubmit }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;

    // Handle checkbox input
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked; // Cast to HTMLInputElement
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
                required={field.required}
              />
            );
          case 'file':
            return (
              <FileField
                key={index}
                name={field.name}
                label={field.label}
                onChange={handleChange}
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
