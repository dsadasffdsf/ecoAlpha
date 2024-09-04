import React, { forwardRef, InputHTMLAttributes } from 'react';

interface InputForForm {
  title: string;
  placeholder: string;
  error: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputForForm = ({ title, placeholder, error, value, onChange }: InputForForm) => {
  return (
    <li>
      <h4>{title}</h4>
      <input
        className="create-product_input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange} // Обработчик изменений
      />
      {error ? <div className="text-red-600 text-sm mt-1">{error}</div> : ''}
    </li>
  );
};
export default InputForForm;
