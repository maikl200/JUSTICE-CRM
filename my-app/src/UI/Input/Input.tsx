import React, {ChangeEvent, FC} from 'react';

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
    errorBorder
  }
) => {
  return (
    <>
      <label className={style.label}>
        {title}
        <input
          name={name}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          style={{width: width, border: errorBorder}}
          type={type}
          placeholder={placeholder}
        />
      </label>
    </>
  );
};

export default Input;