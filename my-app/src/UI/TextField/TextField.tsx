import React, {FC} from 'react';

import {Input} from "../InputUI/Input";

import {useField} from "formik";

interface InputProps {
  field: string
  label?: string
  type?: string
}

const TextField: FC<InputProps> = ({...props}) => {
  const [field, meta] = useField(props.field)

  return (
    <Input
      {...field}
      name={props.field}
      type={props.type ? props.type : 'text'}
      label={props.label}
      error={meta.error && meta.error}
      errorBorder={meta.error && meta.error}
      placeholder={props.label}
    />
  );
};

export default TextField;