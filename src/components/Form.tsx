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
    <form onSubmit={handleSubmit} className="space-y-4">
      {schema.map((field, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <label htmlFor={field.name} className="text-black">
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              id={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              className="p-2 bg-gray-400 text-white rounded-md"
            />
          ) : field.type === "select" ? (
            <select
              name={field.name}
              id={field.name}
              onChange={handleChange}
              className="p-2 bg-gray-500 text-white rounded-md"
            >
              {field.options?.map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              className="p-2 bg-gray-500 text-white rounded-md"
            />
          )}
        </div>
      ))}
      <button
        className="bg-green-700 p-2 rounded-md hover:bg-green-600 text-white"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
