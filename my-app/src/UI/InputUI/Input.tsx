import React, {ChangeEvent, forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef} from 'react';

import style from './input.module.scss'
import {FieldErrors, FieldValues} from "react-hook-form";

interface Props {
  label?: string
  placeholder?: string
  type?: string
  width?: string
  name?: string
  className?: string
  defaultValue?: string | number
  errorBorder?: string
  error?: FieldErrors<FieldValues> | string | boolean
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  readOnly?: boolean
  value?: string | number
}

const InputUI: ForwardRefRenderFunction<any, Props> = (
  {
    label,
    placeholder,
    name,
    type,
    onBlur,
    width,
    defaultValue,
    errorBorder,
    error,
    onChange,
    value,
    className,
    readOnly,
    ...props
  },
  ref
) => {

  const inputRef = useRef(null)

  useImperativeHandle(ref, () => {
    return inputRef.current
  })

  return (
    <>
      <label className={style.label}>
        {label}
        <input
          className={className}
          name={name}
          onChange={onChange}
          readOnly={readOnly}
          onBlur={onBlur}
          defaultValue={defaultValue}
          style={{border: errorBorder}}
          type={type}
          value={value}
          placeholder={placeholder}
          ref={inputRef}
          {...props}
        />
        {error && <span className={style.label_error}>{`${error}`}</span>}
      </label>
    </>
  );
};

export const Input = forwardRef(InputUI);