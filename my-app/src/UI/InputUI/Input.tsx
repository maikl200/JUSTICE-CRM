import React, {ChangeEvent, FC, forwardRef, ForwardRefRenderFunction, useImperativeHandle, useRef} from 'react';

import style from './input.module.scss'
import {DeepRequired, FieldErrors, FieldErrorsImpl, FieldValues} from "react-hook-form";
import {FormikErrors} from "formik";

interface Props {
  title?: string
  placeholder?: string
  type: string
  width?: string
  name?: string
  className?: string
  defaultValue?: string | number
  errorBorder?: string
  error?:  FieldErrors<FieldValues> | string | boolean
  onBlur?: any
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  readOnly?: boolean
  value?: string | number
}

const InputUI: ForwardRefRenderFunction<any, Props> = (
  {
    title,
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
        {title}
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