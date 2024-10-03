import React, { useState } from 'react';

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
  return (
    <div>
      <label>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required={required}
        />
        {label}
      </label>
    </div>
  );
};

export default CheckboxField;
