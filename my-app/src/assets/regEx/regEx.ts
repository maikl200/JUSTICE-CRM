export const regEx = {
  name: /^[a-zA-Z]+$/,
  email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{6,})/
}