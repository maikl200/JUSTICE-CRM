import React, {FC} from 'react';

import style from './input.module.scss'

interface Props {
  title?: string
  placeholder: string
  type: string
  width: string
  name?: string
  defaultValue?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: () => void
  errorBorder?: string
  error?: string
  readOnly?: boolean
  ref?: any
  value?: string | number | undefined
}

const Input: FC<Props> = (
  {
    title,
    placeholder,
    name,
    type,
    width,
    defaultValue,
    onChange,
    onBlur,
    errorBorder,
    error,
    value,
    readOnly,
    ref
  }
) => {
  return (
    <>
      <label className={style.label}>
        {title}
        <input
          ref={ref}
          name={name}
          readOnly={readOnly}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          style={{width: width, border: errorBorder}}
          type={type}
          value={value}
          placeholder={placeholder}
        />
        {error && <span className={style.label_error}>{error}</span>}
      </label>
    </>
  );
};

export default Input;