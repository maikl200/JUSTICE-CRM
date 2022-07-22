import * as yup from "yup";
import {regEx} from "../../../assets/regEx";

export const validationSchema = () => yup.object().shape({
  firstName: yup.string()
    .required('Required field')
    .max(15, 'The first name is too long')
    .matches(regEx.name, 'invalid first name'),
  lastName: yup.string()
    .required('Required field')
    .max(20, 'The last name is too long')
    .matches(regEx.name, 'invalid last name'),
  companyName: yup.string()
    .required('Required field')
    .max(10, 'The company name is too long')
    .matches(regEx.name, 'invalid company name'),
  productCategory: yup.string()
    .nullable()
    .max(10, 'The product category is too long')
    .matches(regEx.name, 'invalid product category'),
  address: yup.string()
    .required('Required field')
    .max(15, 'The address is too long'),
  oldPassword: yup.string()
    .test('oldPassword', 'Fill in this field', function (value, data) {
      if (data.parent.password) {
        return data.parent.oldPassword
      }
      return true
    })
    .matches(regEx.password, 'invalid password'),
  password: yup.string()
    .test('checkPassword', 'Passwords must not match', function (value, data) {
      if (!value && !data.parent.oldPassword) {
        return true
      }
      if (value === data.parent.oldPassword) {
        return false
      }
      return true
    })
    .test('oldPassword', "Fill in this field", function (value, data) {
      if (data.parent.oldPassword) {
        return data.parent.password
      }
      return true
    })
    .matches(regEx.password, 'invalid password'),
})