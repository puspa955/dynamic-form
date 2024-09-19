import React, { useState, ChangeEvent, FormEvent } from "react";

// Define the structure of the fields in the JSON schema
type Field = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[]; // For select elements
};

// Define the props for the Form component
type FormProps = {
  schema: Field[];
};

const Form: React.FC<FormProps> = ({ schema }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted with data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {schema.map((field, index) => {
        if (field.type === "textarea") {
          return (
            <div key={index}>
              <label htmlFor={field.name}>{field.label}</label>
              <textarea
                name={field.name}
                id={field.name}
                placeholder={field.placeholder}
                onChange={handleChange}
              />
            </div>
          );
        } else if (field.type === "select") {
          return (
            <div key={index}>
              <label htmlFor={field.name}>{field.label}</label>
              <select name={field.name} id={field.name} onChange={handleChange}>
                {field.options?.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        } else {
          return (
            <div key={index}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                placeholder={field.placeholder}
                onChange={handleChange}
              />
            </div>
          );
        }
      })}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
