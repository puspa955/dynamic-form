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

  const handleFieldChange = (name: string, value: any) => {
    console.log(`Field changed: ${name}, New value: `, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: '', 
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const hasErrors = Object.values(formErrors).some(error => error !== '');

    if (!hasErrors) {
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
                {...field}
                value={formData[field.name] || ''}
                error={formErrors[field.name] || ''}
                onChange={handleFieldChange}
                onErrorChange={(error) => setFormErrors((prev) => ({ ...prev, [field.name]: error }))} 
              />
            );
          case 'textarea':
            return (
              <TextAreaField
                key={index}
                {...field}
                value={formData[field.name] || ''}
                error={formErrors[field.name] || ''}
                onChange={handleFieldChange} 
                onErrorChange={(error) => setFormErrors((prev) => ({ ...prev, [field.name]: error }))} 
              />
            );
          case 'select':
            return (
              <SelectField
                key={index}
               {...field}
                options={field.options || []}
                value={formData[field.name] || ''}
                error={formErrors[field.name] || ''}
                onChange={handleFieldChange} 
                onErrorChange={(error) => setFormErrors((prev) => ({ ...prev, [field.name]: error }))} 
              />
            );
          case 'checkbox':
            return (
              <CheckboxField
                key={index}
                {...field}
                checked={formData[field.name] || false}
                error={formErrors[field.name] || ''}
                onChange={handleFieldChange} 
                onErrorChange={(error) => setFormErrors((prev) => ({ ...prev, [field.name]: error }))} 
              />
            );
          case 'file':
            return (
              <FileField
                key={index}
                {...field}
                value={formData[field.name] || null}
                error={formErrors[field.name] || ''}
                onChange={handleFieldChange} 
                onErrorChange={(error) => setFormErrors((prev) => ({ ...prev, [field.name]: error }))} 
              />
            );
          default:
            return null;
        }
      })}
      <button
        type="submit"
        disabled={Object.values(formErrors).some(error => error !== '')}
        className={`bg-blue-500 text-white py-2 px-4 rounded ${Object.values(formErrors).some(error => error !== '') ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Submit
      </button>
    </form>
  );
};

export default Form;