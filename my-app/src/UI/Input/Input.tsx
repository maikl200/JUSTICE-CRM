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
    ...props
  }
) => {
  return (
    <>
      <label className={style.label}>
        {title}
        <input
          name={name}
          readOnly={readOnly}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          style={{width: width, border: errorBorder}}
          type={type}
          value={value}
          placeholder={placeholder}
          {...props}
        />
        {error && <span className={style.label_error}>{error}</span>}
      </label>
    </>
  );
};

export default Input;