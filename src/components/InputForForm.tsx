import React, { forwardRef, InputHTMLAttributes, memo, useCallback, useRef } from 'react';

interface InputForForm {
  title: string;
  placeholder: string;
  error: string;
  value?: string;
  onChange: (value: string) => void;
}

const InputForForm = memo(({ title, placeholder, error, value, onChange }: InputForForm) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = useCallback(() => {
    onChange(inputRef.current.value);
  }, [onChange]);
  console.log('rerender');

  return (
    <li>
      <h4>{title}</h4>
      <input
        className="create-product_input"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        ref={inputRef}
      />
      {error ? <div className="text-red-600 text-sm mt-1">{error}</div> : ''}
    </li>
  );
});
export default InputForForm;
