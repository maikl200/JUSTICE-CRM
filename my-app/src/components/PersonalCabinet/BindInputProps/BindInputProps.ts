import {Dispatch, SetStateAction} from "react";
import {TypeUser} from "../../../types/types";

export const bindInputProps =
  (
    field: string,
    handleChange: any,
    handleBlur: any,
    values: TypeUser,
    errors: any,
    type?: string,
    title?: string,
    fieldValue?: Dispatch<SetStateAction<string>>,) => {
    return {
      name: field,
      onChange: handleChange && handleChange,
      onBlur: {
        handleBlur: handleBlur && handleBlur,
        fieldValue: fieldValue && fieldValue,
      },
      value: values && values[field],
      errorBorder: errors[field] ? '1px solid red' : '',
      error: errors[field] && errors[field],
      type: type ? type : 'text',
      placeholder: title && title,
      title: title && title,
    }
  }
