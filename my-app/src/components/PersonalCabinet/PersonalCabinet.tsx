import React, {ChangeEvent, FC, useState} from 'react';

import NavBar from "../../UI/NavBar/NavBar";
import Header from "../../UI/Header/Header";

import style from './personalCabinet.module.scss'

import {Form, Formik, FormikHelpers} from 'formik'
import {Input} from "../../UI/InputUI/Input";
import ButtonUI from "../../UI/ButtonTS/ButtonUI";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useWindowSize} from "../../hooks/useWindowSize";
import rolling from "../../assets/Rolling.gif";
import {
  changeProfile,
  deleteAvatar,
  uploadAvatar
} from '../../redux/slices/user/userAsyncAction';
import {useAppDispatch} from "../../redux/store";
import {TypeUser} from "../../types/types";
import {validationSchema} from "./ValidationSchema/ValidationSchema";
import {bindInputProps} from "./BindInputProps/BindInputProps";

const PersonalCabinet: FC = () => {
  const [valueOldPassword, setValueOldPassword] = useState<string>('')
  const [image, setImage] = useState<FileList | null>()
  const [previewAvatarState, setPreviewAvatarState] = useState<string | ArrayBuffer | null>()
  const [fileName, setFileName] = useState('')
  const {user, status} = useTypedSelector(state => state.user)
  const {width} = useWindowSize()
  const dispatch = useAppDispatch()

  const changeCurrentProfile = (clearPasswordFields: (nextState: any) => void, validateError: (field: string, message: (string | undefined)) => void, data: TypeUser) => {
    dispatch(changeProfile({clearPasswordFields, validateError, valueOldPassword, data}))
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

  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_personalCabinetBar}>
        <Header title='Personal Cabinet'
                subTitle='Information about your account'/>
        {!!Object.keys(user).length &&
            <Formik
                initialValues={initialState}
                validationSchema={validationSchema()}
                onSubmit={(data: TypeUser, helper: FormikHelpers<TypeUser>) => {
                  if (status === 'loading') return
                  const clearPasswordFields = async () => {
                    helper.setFieldValue('oldPassword', '')
                    await helper.setFieldValue('password', '')
                    helper.setFieldError('password', '')
                  }
                  changeCurrentProfile(clearPasswordFields, helper.setFieldError, data)
                  setPreviewAvatarState('')
                  setFileName('')
                  helper.resetForm({values: data})
                  if (!image) return
                  dispatch(uploadAvatar(image[0]))
                }}
            >
              {({
                  values,
                  errors,
                  isValid,
                  handleChange,
                  handleBlur,
                  dirty
                }) => {

                const functionAttribute = {
                  firstName: ['firstName', handleChange, handleBlur, values, errors, 'text', 'First name'] as const,
                  lastName: ['lastName', handleChange, handleBlur, values, errors, 'text', 'Last name'] as const,
                  companyName: ['companyName', handleChange, handleBlur, values, errors, 'text', 'Company name'] as const,
                  productCategory: ['productCategory', handleChange, handleBlur, values, errors, 'text', 'Product category'] as const,
                  address: ['address', handleChange, handleBlur, values, errors, 'text', 'Address'] as const,
                  oldPassword: ['oldPassword', handleChange, handleBlur, values, errors, 'password', 'Enter old password', setValueOldPassword] as const,
                  image: ['image', null, handleBlur, null, errors, 'file', 'Avatar'] as const,
                  password: ['password', handleChange, handleBlur, values, errors, 'password', 'Enter a new password'] as const
                }
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
                          <Input{...bindInputProps(...functionAttribute.firstName)}/>
                          {previewAvatarState && (
                            <div className={style.main_personalCabinetBar_wrapper_userSettings_row_avatarContainer}>
                              <span>Avatar preview</span>
                              <div
                                className={style.main_personalCabinetBar_wrapper_userSettings_row_avatarContainer_imgPreviewContainer}>
                                <img src={previewAvatarState as string} alt='preview Avatar'/>
                              </div>
                            </div>
                          )}
                          <Input{...bindInputProps(...functionAttribute.lastName)}/>
                        </div>
                        <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                          <Input{...bindInputProps(...functionAttribute.companyName)}/>
                          <Input{...bindInputProps(...functionAttribute.productCategory)}/>
                        </div>
                        <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                          <Input{...bindInputProps(...functionAttribute.address)}/>
                          <Input{...bindInputProps(...functionAttribute.oldPassword)}/>
                        </div>
                        <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                          <Input
                            {...bindInputProps(...functionAttribute.image)}
                            onChange={(e) => {
                              imageHandler(e)
                              setFileName(e.target.value)
                              setImage(e.target.files)
                            }}
                            value={fileName}/>
                          <Input{...bindInputProps(...functionAttribute.password)}/>
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