import React, {ChangeEvent, FC, useEffect, useState} from 'react';

import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";

import style from './personalCabinet.module.scss'

import {Form, Formik} from 'formik'
import * as yup from 'yup'
import {Input} from "../../UI/InputUI/Input";
import ButtonUI from "../../UI/ButtonTS/ButtonUI";
import {regEx} from "../../assets/regEx";
import {useAction} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useWindowSize} from "../../hooks/useWindowSize";
import {useDispatch} from "react-redux";
import {setEditLoading} from "../../redux/action/user";

const validationSchema = () => yup.object().shape({
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

const PersonalCabinet: FC = () => {
  const [valueOldPassword, setValueOldPassword] = useState<string>('')
  const [image, setImage] = useState<FileList | null>()
  const [previewAvatarState, setPreviewAvatarState] = useState<string | ArrayBuffer | null>()
  const [fileName, setFileName] = useState('')
  const {user, isEditLoading} = useTypedSelector(state => state.user)
  const {width} = useWindowSize()
  const dispatch = useDispatch()
  const {
    fetchUsers,
    changeCurrentPassword,
    changeProfile,
    uploadAvatar,
    deleteAvatar
  } = useAction()

  const changePassword = (validateError: (field: string, message: (string | undefined)) => void) => {
    changeCurrentPassword({validateError, valueOldPassword})
  }

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreviewAvatarState(reader.result)
      }
    }
    reader.readAsDataURL(e.target.files![0])
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  const deleteAvatarFunk = () => {
    dispatch(deleteAvatar())
  }

  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_personalCabinetBar}>
        <Header title='Personal Cabinet'
                subTitle='Information about your account'/>
        {!!Object.keys(user).length &&
            <Formik
                initialValues={{
                  firstName: user.firstName,
                  lastName: user.lastName,
                  companyName: user.companyName,
                  productCategory: user.productCategory ?? '',
                  address: user.address ?? '15 Krylatskaya',
                  oldPassword: '',
                  password: '',
                }}
                validationSchema={validationSchema()}
                onSubmit={(data, helper) => {
                  if (data.oldPassword) {
                    changePassword(helper.setFieldError)
                  }
                  dispatch(setEditLoading(true))
                  dispatch(changeProfile(data))
                  setPreviewAvatarState('')
                  setFileName('')
                  if (!image) return
                  // @ts-ignore
                  uploadAvatar(image[0])
                }}
            >
              {({
                  values,
                  errors,
                  isValid,
                  handleChange,
                  handleBlur,
                  touched,
                }) => (
                <>
                  <div className={style.main_personalCabinetBar_wrapper}>
                    <Form
                      className={style.main_personalCabinetBar_wrapper_userSettings}
                      method='POST'
                      action='/upload'
                      encType='multipart/form-data'
                    >
                      <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                        <Input
                          name='firstName'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.firstName}
                          errorBorder={touched.firstName && errors.firstName ? '1px solid red' : ''}
                          error={touched.firstName && errors.firstName && errors.firstName}
                          placeholder='First name'
                          title='First name'
                          type='text'
                        />
                        {previewAvatarState && (
                          <div className={style.main_personalCabinetBar_wrapper_userSettings_row_avatarContainer}>
                            <span>Avatar preview</span>
                            <div
                              className={style.main_personalCabinetBar_wrapper_userSettings_row_avatarContainer_imgPreviewContainer}>
                              <img src={previewAvatarState as string} alt='preview Avatar'/>
                            </div>
                          </div>
                        )}
                        <Input
                          name='lastName'
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errorBorder={touched.lastName && errors.lastName ? '1px solid red' : ''}
                          error={touched.lastName && errors.lastName && errors.lastName}
                          placeholder='Last name'
                          title='Last name'
                          type='text'/>
                      </div>
                      <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                        <Input
                          name='companyName'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errorBorder={touched.companyName && errors.companyName ? '1px solid red' : ''}
                          error={touched.companyName && errors.companyName && errors.companyName}
                          value={values.companyName}
                          placeholder='Company name'
                          title='Company name'
                          type='text'/>
                        <Input
                          value={values.productCategory}
                          name='productCategory'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          errorBorder={touched.productCategory && errors.productCategory ? '1px solid red' : ''}
                          error={touched.productCategory && errors.productCategory && errors.productCategory}
                          placeholder='Product Category'
                          title='Product Category'
                          type='text'/>
                      </div>
                      <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                        <Input
                          value={values.address}
                          name='address'
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.address && errors.address && errors.address}
                          errorBorder={touched.address && errors.address ? '1px solid red' : ''}
                          placeholder='Address'
                          title='Address'
                          type='text'
                        />

                        <Input
                          name='oldPassword'
                          onChange={handleChange}
                          onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                            setValueOldPassword(e.target.value)
                            handleBlur(e)
                          }}
                          error={touched.oldPassword && errors.oldPassword && errors.oldPassword}
                          errorBorder={touched.oldPassword && errors.oldPassword ? '1px solid red' : ''}
                          placeholder='Enter old password'
                          title='Enter old password'
                          type='password'
                        />
                      </div>
                      <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                        <Input
                          name='image'
                          onChange={(e) => {
                            imageHandler(e)
                            setFileName(e.target.value)
                            setImage(e.target.files)
                          }}
                          value={fileName}
                          placeholder='Avatar'
                          title='Avatar'
                          type='file'/>
                        <Input
                          name='password'
                          onChange={handleChange}
                          error={touched.password && errors.password && errors.password}
                          errorBorder={touched.password && errors.password ? '1px solid red' : ''}
                          placeholder='Enter a new password'
                          title='Enter a new password'
                          type='password'
                        />
                      </div>
                      {width! < 1590 && previewAvatarState && (
                        <div className={style.main_personalCabinetBar_wrapper_userSettings_row_downAvatarContainer}>
                          <>
                            <span>Avatar preview</span>
                            <div
                              className={style.main_personalCabinetBar_wrapper_userSettings_row_downAvatarContainer_imgPreviewContainer}>
                              <img src={previewAvatarState as string} alt='preview Avatar'/>
                            </div>
                          </>
                        </div>
                      )}
                      <div className={style.main_personalCabinetBar_btns}>
                        <ButtonUI
                          type='submit'
                          disabled={!isValid || isEditLoading}
                          width='158px'
                          title='Save changes'
                          height='52px'/>
                        <ButtonUI
                          bch='#c23616'
                          bc='#e84118'
                          onClick={() => deleteAvatarFunk()}
                          width='158px'
                          title='Delete avatar'
                          height='52px'/>
                      </div>
                    </Form>
                  </div>
                </>
              )}
            </Formik>}
      </div>
    </main>
  );
};

export default PersonalCabinet;