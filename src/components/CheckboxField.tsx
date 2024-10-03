import React, { useState } from 'react';

type CheckboxFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  checked: boolean;
  error: string;
  onChange: (value: boolean) => void;
  onErrorChange: (error: string) => void;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  required,
  checked,
  error,
  onChange,
  onErrorChange,
}) => {
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    validate(checked); // Validate on blur
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked;
    onChange(newValue);
    validate(newValue); // Validate on change
  };

  const validate = (value: boolean) => {
    let errorMsg = '';
    if (required && !value) {
      errorMsg = `${label} is required.`;
    }
    onErrorChange(errorMsg); // Pass the error to the parent
  };

  return (
    <div>
      <label className="flex items-center">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`mr-2 ${error && touched ? 'border-red-500' : ''}`}
        />
        {label}
      </label>
      {error && touched && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default CheckboxField;
