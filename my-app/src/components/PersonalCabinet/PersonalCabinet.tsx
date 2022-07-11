import React, {FC, useEffect, useLayoutEffect, useState} from 'react';

import {useHandleChange} from "../../hooks/useHandleChange";

import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";

import style from './personalCabinet.module.scss'

import {Formik} from 'formik'
import * as yup from 'yup'
import {Input} from "../../UI/InputUI/Input";
import ButtonUI from "../../UI/ButtonTS/ButtonUI";
import {regEx} from "../../assets/regEx";
import {useAction} from "../../hooks/useAction";
import {changeCurrentPassword, deleteAvatar} from "../../redux/action-creater/user";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {TypeUser} from "../../types/types";
import {useWindowSize} from "../../hooks/useWindowSize";


const validationSchema = yup.object({
  firstName: yup.string()
    .required('need')
    .min(1, 'ada')
    .max(15, 'The first name is too long')
    .matches(regEx.name, 'invalid first name'),
  lastName: yup.string()
    .min(2, 'The last name is too short')
    .max(20, 'The last name is too long')
    .matches(regEx.name, 'invalid last name'),
  companyName: yup.string()
    .min(2, 'The company name is too short')
    .max(10, 'The company name is too long')
    .matches(regEx.name, 'invalid company name'),
  productCategory: yup.string()
    .min(2, 'The company name is too short')
    .nullable()
    .max(10, 'The product category is too long')
    .matches(regEx.name, 'invalid product category'),
  oldPassword: yup.string()
    .test('password', 'Fill in this field', function (value, data) {
      if (data.parent.password) {
        return data.parent.oldPassword
      }
      return true
    })
    .matches(regEx.password, 'invalid password'),
  password: yup.string()
    .test('oldPassword', "Fill in this field", function (value, data) {
      if (data.parent.oldPassword) {
        return data.parent.password
      }
      return true
    })
    .matches(regEx.password, 'invalid password'),
})

const PersonalCabinet: FC = () => {
  const [form, changeForm, setForm] = useHandleChange<TypeUser>({})
  const [image, setImage] = useState<FileList | null>()
  const [previewAvatarState, setPreviewAvatarState] = useState<string | ArrayBuffer | null>()
  const [currentPassword, setCurrentPassword] = useState<boolean>(false)
  const [fileName, setFileName] = useState('')

  const user = useTypedSelector(state => state.user)
  const {width} = useWindowSize()
  console.log(form.firstName)
  const {fetchUsers, changeCurrentPassword, changeProfile, uploadAvatar, deleteAvatar} = useAction()

  const changePassword = () => {
    changeCurrentPassword(setCurrentPassword, {payload: form.oldPassword as string})
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
    deleteAvatar()
  }

  useEffect(() => {
    setForm(user)
  }, [user])
  console.log('123', user)
  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_personalCabinetBar}>
        <Header title='Personal Cabinet'
                subTitle='Information about your account'/>
        {!!Object.keys(user).length && <Formik
          initialValues={{
            firstName: user.firstName,
            lastName: user.lastName,
            companyName: user.companyName,
            productCategory: user.productCategory,
            address: '',
            oldPassword: '',
            password: ''
          }}

          validationSchema={validationSchema}
          onSubmit={(data) => {
            changeProfile({payload: data})
            setPreviewAvatarState('')
            setFileName('')
            console.log(data)
            if (!image) return
            uploadAvatar({payload: image[0]})
          }}>
          {({
              errors,
              isValid,
              handleSubmit,
              handleChange,
              touched,

            }) => (
            <>
              <div className={style.main_personalCabinetBar_wrapper}>
                <form
                  className={style.main_personalCabinetBar_wrapper_userSettings}
                  method='POST'
                  action='/upload'
                  encType='multipart/form-data'
                  onSubmit={handleSubmit}
                >
                  <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                    <Input
                      name='firstName'
                      onChange={(e) => {
                        changeForm(e)
                        handleChange(e)
                      }}
                      value={form.firstName}
                      errorBorder={errors.firstName && '1px solid red'}
                      error={errors.firstName && errors.firstName}
                      placeholder='First name'
                      title='First name'
                      type='text'
                    />

                    {
                      previewAvatarState
                        ?
                        <div className={style.main_personalCabinetBar_wrapper_userSettings_row_avatarContainer}>
                          <span>Avatar preview</span>
                          <div
                            className={style.main_personalCabinetBar_wrapper_userSettings_row_avatarContainer_imgPreviewContainer}>
                            <img src={previewAvatarState as string} alt='preview Avatar'/>
                          </div>
                        </div>
                        :
                        ''
                    }
                    <Input
                      name='lastName'
                      value={form.lastName}
                      onChange={(e) => {
                        changeForm(e)
                        handleChange(e)
                      }}
                      errorBorder={errors.lastName && '1px solid red'}
                      error={errors.lastName && errors.lastName}
                      placeholder='Last name'
                      title='Last name'
                      type='text'/>
                  </div>
                  <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                    <Input
                      name='companyName'
                      onChange={(e) => {
                        changeForm(e)
                        handleChange(e)
                      }}
                      errorBorder={errors.companyName && '1px solid red'}
                      error={errors.companyName && errors.companyName}
                      value={form.companyName}
                      placeholder='Company name'
                      title='Company name'
                      type='text'/>
                    <Input
                      value={form.productCategory}
                      name='productCategory'
                      onChange={(e) => {
                        changeForm(e)
                        handleChange(e)
                      }}
                      onBlur={handleSubmit}
                      errorBorder={errors.productCategory && '1px solid red'}
                      error={errors.productCategory && errors.productCategory}
                      placeholder='Product Category'
                      title='Product Category'
                      type='text'/>
                  </div>
                  <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                    <Input
                      value={form.address}
                      name='address'
                      onChange={(e) => {
                        changeForm(e)
                        handleChange(e)
                      }}
                      placeholder='Address'
                      title='Address'
                      type='text'
                    />

                    <Input
                      name='oldPassword'
                      onChange={(e) => {
                        changeForm(e)
                        handleChange(e)
                      }}
                      onBlur={() => changePassword()}
                      error={errors.oldPassword && errors.oldPassword}
                      errorBorder={errors.oldPassword && '1px solid red'}
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
                      // readOnly={!currentPassword}
                      name='password'
                      onChange={(e) => {
                        changeForm(e)
                        handleChange(e)
                      }}
                      error={errors.password && errors.password}
                      errorBorder={errors.password && '1px solid red'}
                      placeholder='Enter a new password'
                      title='Enter a new password'
                      type='password'
                    />
                  </div>
                  {
                    width! < 1590
                      ?
                      <div className={style.main_personalCabinetBar_wrapper_userSettings_row_downAvatarContainer}>
                        {
                          previewAvatarState
                            ?
                            <>
                              <span>Avatar preview</span>
                              <div
                                className={style.main_personalCabinetBar_wrapper_userSettings_row_downAvatarContainer_imgPreviewContainer}>
                                <img src={previewAvatarState as string} alt='preview Avatar'/>
                              </div>
                            </>
                            : ''
                        }
                      </div>
                      :
                      ''
                  }
                  <div className={style.main_personalCabinetBar_btns}>
                    <ButtonUI
                      type='submit'
                      disabled={!isValid}
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
                </form>
              </div>
            </>
          )}
        </Formik>}
      </div>
    </main>
  );
};

export default PersonalCabinet;