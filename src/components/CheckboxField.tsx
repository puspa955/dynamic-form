import React from 'react';

type CheckboxFieldProps = {
  name: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void; 
  required?: boolean;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  checked,
  onChange,
  required,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked); 
  };

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={handleChange}
          required={required}
        />
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
