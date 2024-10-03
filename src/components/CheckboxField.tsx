import React, { useState } from 'react';

type CheckboxFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  onValueChange: (name: string, value: boolean) => void; 
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  required,
  onValueChange,
}) => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = e.target.checked;
    setChecked(newChecked);
    onValueChange(name, newChecked);
    validate(newChecked);
  };

  const validate = (newChecked: boolean) => {
    const errorMsg = required && !newChecked ? `${label} is required.` : '';
    setError(errorMsg);
  };

  return (
    <div>
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          onBlur={() => validate(checked)} 
          className={`mr-2 ${error ? 'border-red-500' : ''}`}
        />
        {label}
      </label>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CheckboxField;
