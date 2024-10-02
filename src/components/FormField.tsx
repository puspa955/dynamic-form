import React, { ChangeEvent } from "react";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import SelectField from "./SelectField";
import CheckboxField from "./CheckboxField";
import FileField from "./FileField"; // Optional: If you need file upload

type Field = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  options?: string[];
};

type FormFieldProps = {
  field: Field;
  value: any;
  error?: string;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

const FormField: React.FC<FormFieldProps> = ({ field, value, error, handleChange }) => {
  switch (field.type) {
    case "textarea":
      return <TextAreaField field={field} value={value} handleChange={handleChange} error={error} />;
    case "select":
      return <SelectField field={field} value={value} handleChange={handleChange} error={error} />;
    case "checkbox":
      return <CheckboxField field={field} value={value} handleChange={handleChange} error={error} />;
    case "file":
      return <FileField field={field} value={value} handleChange={handleChange} error={error} />;
    default:
      return <InputField field={field} value={value} handleChange={handleChange} error={error} />;
  }
};

export default FormField;
