import React from 'react';

type CheckboxFieldProps = {
  name: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

const CheckboxField: React.FC<CheckboxFieldProps> = ({ name, label, checked, onChange, required }) => (
  <div>
    <label>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        required={required}
      />
      {label}
    </label>
  </div>
);

export default CheckboxField;
