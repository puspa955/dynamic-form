import React, { useState, ChangeEvent, FormEvent } from "react";

// Define the structure of the fields in the JSON schema, including validation rules
type Field = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: string[]; // For select elements
  validationMessage?: string;
};

// Define the props for the Form component
type FormProps = {
  schema: Field[];
};

const Form: React.FC<FormProps> = ({ schema }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Handle input changes and updates form data
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox case specifically
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
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

  // Validate the fields based on schema
  const validateField = (field: Field, value: string): string | null => {
    if (field.required && !value) {
      return `${field.label} is required`;
    }
    if (field.minLength && value.length < field.minLength) {
      return `${field.label} must be at least ${field.minLength} characters`;
    }
    if (field.maxLength && value.length > field.maxLength) {
      return `${field.label} must be at most ${field.maxLength} characters`;
    }
    return null;
  };

  // Handle form submission and validation
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Validate all fields
    schema.forEach((field) => {
      const errorMessage = validateField(field, formData[field.name] || "");
      if (errorMessage) {
        newErrors[field.name] = errorMessage;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setFormErrors(newErrors);
      return;
    }

    console.log("Form Submitted with data:", formData);
    setFormErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {schema.map((field, index) => (
        <div key={index} className="flex flex-col space-y-2">
          {field.type === "checkbox" ? (
            // Align checkbox and label side by side
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name={field.name}
                id={field.name}
                onChange={handleChange}
                className="p-2 bg-gray-500 text-white rounded-md"
              />
              <label htmlFor={field.name} className="text-black">
                {field.label}
              </label>
            </div>
          ) : (
            <>
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
            </>
          )}

          {formErrors[field.name] && (
            <span className="text-red-500">{formErrors[field.name]}</span>
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
