import React, {FC, useState} from 'react';

import NavBar from "../../UI/NavBar/NavBar";
import Header from "../../UI/Header/Header";
import TextField from "../../UI/TextField/TextField";
import {Input} from "../../UI/InputUI/Input";
import ButtonUI from "../../UI/ButtonTS/ButtonUI";
import {validationSchema} from "./ValidationSchema/ValidationSchema";

import {
  changeProfile,
  deleteAvatar,
  uploadAvatar
} from '../../redux/slices/user/userAsyncAction';
import {useAppDispatch} from "../../redux/store";
import {Form, Formik, FormikHelpers, FormikValues} from 'formik'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useWindowSize} from "../../hooks/useWindowSize";

import {TypeUser} from "../../types/types";

import style from './personalCabinet.module.scss'

import rolling from "../../assets/Rolling.gif";

const PersonalCabinet: FC = () => {
  const [image, setImage] = useState<FileList | null>()
  const [previewAvatarState, setPreviewAvatarState] = useState<string | ArrayBuffer | null>()
  const {user, status} = useTypedSelector(state => state.user)
  const {width} = useWindowSize()
  const dispatch = useAppDispatch()

  const changeCurrentProfile = (clearPasswordFields: (nextState: string) => void, validateError: (field: string, message: (string | undefined)) => void, data: TypeUser) => {
    dispatch(changeProfile({clearPasswordFields, validateError, data}))
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

  const deleteAvatarFunk = () => {
    if (user.avatar !== null) {
      dispatch(deleteAvatar())
    }
  }

  const initialState = {
    firstName: user.firstName,
    lastName: user.lastName,
    companyName: user.companyName,
    productCategory: user.productCategory ?? '',
    address: user.address ?? '15 Krylatskaya',
    oldPassword: '',
    password: '',
  }

  const onSubmit = (data: FormikValues, helper: FormikHelpers<FormikValues>) => {
    if (status === 'loading') return
    const clearPasswordFields = async () => {
      helper.setFieldValue('oldPassword', '')
      await helper.setFieldValue('password', '')
      helper.setFieldError('password', '')
    }
    changeCurrentProfile(clearPasswordFields, helper.setFieldError, data)
    setPreviewAvatarState('')
    helper.resetForm({values: data})
    if (!image) return
    dispatch(uploadAvatar(image[0]))
  }

  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_personalCabinetBar}>
        <Header
          title='Personal Cabinet'
          subTitle='Information about your account'/>
        {!!Object.keys(user).length &&
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema()}
            onSubmit={(data, helper: FormikHelpers<FormikValues>) => {
              onSubmit(data, helper)
            }}
          >
            {({
                isValid,
                dirty
              }) => {
              return (
                <>
                  <div className={style.main_personalCabinetBar_wrapper}>
                    <Form
                      className={style.main_personalCabinetBar_wrapper_userSettings}
                      method='POST'
                      action='/upload'
                      encType='multipart/form-data'
                    >
                      <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                        <TextField label='First name' field='firstName'/>
                        {previewAvatarState && (
                          <div className={style.main_personalCabinetBar_wrapper_userSettings_row_avatarContainer}>
                            <span>Avatar preview</span>
                            <div
                              className={style.main_personalCabinetBar_wrapper_userSettings_row_avatarContainer_imgPreviewContainer}>
                              <img src={previewAvatarState as string} alt='preview Avatar'/>
                            </div>
                          </div>
                        )}
                        <TextField field='lastName' label='Last Name'/>
                      </div>
                      <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                        <TextField field='companyName' label='Company name'/>
                        <TextField field='productCategory' label='Product category'/>
                      </div>
                      <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                        <TextField field='address' label='Address'/>
                        <TextField field='oldPassword' label='Enter old password' type='password'/>
                      </div>
                      <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                        <Input
                          name='image'
                          onChange={(e) => {
                            imageHandler(e)
                            setImage(e.target.files)
                          }}
                          label='Avatar'
                          type='file'
                        />
                        <TextField field='password' label='Enter new password' type='password'/>
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
                          disabled={!previewAvatarState && !dirty || !isValid || status === 'loading'}
                          rightSrc={status === 'loading' && rolling}
                          width='158px'
                          title={status === 'loading' ? 'Loading...' : 'Save changes'}
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
              )
            }}
          </Formik>}
      </div>
    </main>
  );
};

export default PersonalCabinet;