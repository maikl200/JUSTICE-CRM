import React, {FC, useEffect, useState} from 'react';

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

const PersonalCabinet: FC = () => {

  const [form, changeForm, setForm] = useHandleChange<TypeUser>({})
  const [image, setImage] = useState<FileList | null>()
  const [previewAvatarState, setPreviewAvatarState] = useState<string | ArrayBuffer | null>()
  const [currentPassword, setCurrentPassword] = useState<boolean>(false)
  const [inputOldPassword, setInputOldPassword] = useState<string>()
  const [inputNewPassword, setInputNewPassword] = useState<string>()
  const [fileName, setFileName] = useState('')

  const user = useTypedSelector(state => state.user)
  const {width} = useWindowSize()

  const {fetchUsers, changeCurrentPassword, changeProfile, uploadAvatar, deleteAvatar} = useAction()

  const changePassword = () => {
    console.log(!currentPassword)
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

  const validationSchema = yup.object().shape({
    firstName: yup.string().matches(regEx.name, 'invalid first name'),
    lastName: yup.string().matches(regEx.name, 'invalid last name'),
    companyName: yup.string().matches(regEx.name, 'invalid company name'),
    productCategory: yup.string().matches(regEx.name, 'invalid product category'),
    oldPassword: yup.string().matches(regEx.password, 'invalid password'),
    password: yup.string().matches(regEx.password, 'invalid password'),
  })

  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_personalCabinetBar}>
        <Header title='Personal Cabinet'
                subTitle='Information about your account'/>
        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            companyName: '',
            productCategory: '',
            address: '',
            oldPassword: '',
            password: ''
          }}
          validateOnBlur
          validationSchema={validationSchema}
          onSubmit={(data) => {
            console.log(data)
            changeProfile({payload: data})
            setPreviewAvatarState('')
            setFileName('')
            if (!image) return
            uploadAvatar({payload: image[0]})
          }}>
          {({
              values,
              errors,
              handleChange,
              handleBlur,
              isValid,
              handleSubmit,
            }) => (
            <>
              <form
                className={style.main_personalCabinetBar_userSettings}
                method='POST'
                action='/upload'
                encType='multipart/form-data'
                onSubmit={handleSubmit}
              >
                <div className={style.main_personalCabinetBar_userSettings_row}>
                  <Input
                    name='firstName'
                    onChange={(e) => {
                      handleChange(e)
                      changeForm(e)
                    }}
                    onBlur={handleBlur}
                    value={form.firstName}
                    errorBorder={errors.firstName && '1px solid red'}
                    error={errors.firstName && errors.firstName}
                    placeholder='First name'
                    title='First name'
                    type='text'
                    width='380px'/>
                  {
                    previewAvatarState
                      ?
                      <div className={style.main_personalCabinetBar_userSettings_row_avatarContainer}>
                        <span>Avatar preview</span>
                        <div
                          className={style.main_personalCabinetBar_userSettings_row_avatarContainer_imgPreviewContainer}>
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
                      handleChange(e)
                      changeForm(e)
                    }}
                    onBlur={handleBlur}
                    errorBorder={errors.lastName && '1px solid red'}
                    error={errors.lastName && errors.lastName}
                    placeholder='Last name'
                    title='Last name'
                    type='text'
                    width='380px'/>
                </div>
                <div className={style.main_personalCabinetBar_userSettings_row}>
                  <Input
                    name='companyName'
                    onChange={(e) => {
                      handleChange(e)
                      changeForm(e)
                    }}
                    onBlur={handleBlur}
                    errorBorder={errors.companyName && '1px solid red'}
                    error={errors.companyName && errors.companyName}
                    value={form.companyName}
                    placeholder='Company name'
                    title='Company name'
                    type='text'
                    width='380px'/>
                  <Input
                    value={form.productCategory}
                    name='productCategory'
                    onChange={(e) => {
                      handleChange(e)
                      changeForm(e)
                    }}
                    onBlur={handleBlur}
                    errorBorder={errors.productCategory && '1px solid red'}
                    error={errors.productCategory && errors.productCategory}
                    placeholder='Product Category'
                    title='Product Category'
                    type='text'
                    width='380px'/>
                </div>
                <div className={style.main_personalCabinetBar_userSettings_row}>
                  <Input
                    value={form.address}
                    name='address'
                    onChange={(e) => {
                      handleChange(e)
                      changeForm(e)
                    }}
                    placeholder='Address'
                    title='Address'
                    type='text'
                    width='380px'/>

                  <Input
                    name='oldPassword'
                    onChange={handleChange}
                    onBlur={() => changePassword()}
                    value={values.oldPassword}
                    error={errors.oldPassword && errors.oldPassword}
                    errorBorder={errors.oldPassword && '1px solid red'}
                    placeholder='Enter old password'
                    title='Enter old password'
                    type='password'
                    width='380px'
                  />

                </div>
                <div className={style.main_personalCabinetBar_userSettings_row}>
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
                    type='file'
                    width='380px'/>
                  <Input
                    readOnly={!currentPassword}
                    name='password'
                    onBlur={handleBlur}
                    value={values.password}
                    onChange={(e) => {
                      changeForm(e)
                      handleChange(e)
                      setInputNewPassword(e.target.value)
                    }}
                    error={errors.password && errors.password}
                    errorBorder={errors.password && '1px solid red'}
                    placeholder='Enter a new password'
                    title='Enter a new password'
                    type='password'
                    width='380px'
                  />
                </div>
                {
                  width! < 1590
                    ?
                    <div className={style.main_personalCabinetBar_userSettings_row_downAvatarContainer}>
                      {
                        previewAvatarState
                          ?
                          <>
                            <span>Avatar preview</span>
                            <div
                              className={style.main_personalCabinetBar_userSettings_row_downAvatarContainer_imgPreviewContainer}>
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
                    // onClick={() => profileChanges()}
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
            </>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default PersonalCabinet;