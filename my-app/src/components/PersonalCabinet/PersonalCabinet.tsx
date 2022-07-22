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
import {bindddInputProps} from "./BindInputProps/BindInputProps";

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
  const bindInputProps = () => {
    return (
      {
        initialValues: initialState,
        validationSchema: validationSchema(),
        onSubmit: (data: TypeUser, helper: FormikHelpers<TypeUser>) => {
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
        }
      }
    )
  }

  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_personalCabinetBar}>
        <Header title='Personal Cabinet'
                subTitle='Information about your account'/>
        {!!Object.keys(user).length &&
          <Formik
            {...bindInputProps()}
          >
            {({
                values,
                errors,
                isValid,
                handleChange,
                handleBlur,
                touched,
                dirty
              }) => {




              const functionAttribute = {
                firstName: ['firstName', handleChange, handleBlur, values,touched, errors,'text','First'],

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
                        {/*@ts-ignore*/}
                        <Input

                          /*{...bindddInputProps(...functionAttribute.firstName)}*/
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
                          {...bindddInputProps('lastName', handleChange, handleBlur, values, touched, errors)}
                          placeholder='Last name'
                          title='Last name'
                          type='text'/>
                      </div>
                      <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                        <Input
                          {...bindddInputProps('companyName', handleChange, handleBlur, values, touched, errors)}
                          placeholder='Company name'
                          title='Company name'
                          type='text'/>
                        <Input
                          {...bindddInputProps('productCategory', handleChange, handleBlur, values, touched, errors)}
                          placeholder='Product Category'
                          title='Product Category'
                          type='text'/>
                      </div>
                      <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                        <Input
                          {...bindddInputProps('address', handleChange, handleBlur, values, touched, errors)}
                          placeholder='Address'
                          title='Address'
                        />

                        <Input
                          {...bindddInputProps('oldPassword', handleChange, null, values, touched, errors, 'password')}

                          onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                            setValueOldPassword(e.target.value)
                            handleBlur(e)
                          }}
                          placeholder='Enter old password'
                          title='Enter old password'
                          type='password'
                        />
                      </div>
                      <div className={style.main_personalCabinetBar_wrapper_userSettings_row}>
                        <Input
                          {...bindddInputProps('image', null, handleBlur, null, touched, errors, 'file')}
                          onChange={(e) => {
                            imageHandler(e)
                            setFileName(e.target.value)
                            setImage(e.target.files)
                          }}
                          value={fileName}
                          placeholder='Avatar'
                          title='Avatar'
                        />
                        <Input
                          {...bindddInputProps('password', handleChange, null, values, touched, errors, 'password')}
                          placeholder='Enter a new password'
                          title='Enter a new password'
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