export const bindddInputProps = (
  field: string, handleChange: any, handleBlur: any, values: any, touched: any, errors: any, type?: string, title?: string) => {
  return {
    name: field,
    onChange: handleChange && handleChange,
    onBlur: handleBlur && handleBlur,
    value: values && values[field] ,
    errorBorder: touched[field] && errors[field] ? '1px solid red' : '',
    error: touched[field] && errors[field] && errors[field],
    type: type ? type : 'text',
    placeholder: title && `${title} name`,
    title: title && `${title} name`,
  }
}