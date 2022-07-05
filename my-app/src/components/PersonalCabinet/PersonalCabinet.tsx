import React, {FC, useEffect, useState} from 'react';

import {useHandleChange} from "../../utils/useHandleChange";

import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";

import style from './personalCabinet.module.scss'
import previewAvatar from '../../assets/previeAvatar.jpg'

import Input from "../../UI/Input/Input";
import ButtonUI from "../../UI/ButtonTS/ButtonUI";
import {regEx} from "../../assets/regEx";
import axios from "axios";
import Cookies from "js-cookie";
import {typeUser} from "../../types/types";


interface InitialTouchedTypes {
  firstName: boolean,
  lastName: boolean,
  companyName: boolean,
  productCategory: boolean,
  address: boolean,
  oldPassword: boolean,
  newPassword: boolean

}

const initialTouched: InitialTouchedTypes = {
  firstName: false,
  lastName: false,
  companyName: false,
  productCategory: false,
  address: false,
  oldPassword: false,
  newPassword: false
}

const PersonalCabinet: FC = () => {

  const [errorOldPassword, setErrorOldPassword] = useState<string>('')
  const [errorNewPassword, setErrorNewPassword] = useState<string>('')
  const [touched, setTouched] = useState<InitialTouchedTypes>(initialTouched)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [form, changeForm, setFormEdit] = useHandleChange()
  const [image, setImage] = useState<FileList | null>()
  const [previewAvatarState, setPreviewAvatarState] = useState<string | ArrayBuffer | null>()
  const [avatar, setAvatar] = useState()
  const [currentPassword, setCurrentPassword] = useState<boolean>(false)
  const [inputOldPassword, setInputOldPassword] = useState<string>()
  const [inputNewPassword, setInputNewPassword] = useState<string>()

  const changePassword = async () => {
    await axios.post('http://localhost:5100/profile/changePassword', {
      oldPassword: form.oldPassword
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
      .then(() => {
        setErrorOldPassword('')
        setCurrentPassword(true)
      }).catch(() => {
        setErrorOldPassword('invalid password')
        setCurrentPassword(false)
      })
  }

  const profileChanges = async () => {
    axios.patch('http://localhost:5100/profile/changeProfile', {
      ...form
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    })
      .then(() => {

      }).catch((e) => {
      console.error(e)
    })

    setInputOldPassword('')
    setInputNewPassword('')

    if (image) {
      await axios.post('http://localhost:5100/upload',
        {
          image: image[0]
        },
        {
          headers: {
            Authorization: `${Cookies.get("token")}`,
            'content-type': 'multipart/form-data'
          }
        })
        .then((res) => setAvatar(res.data))
        .catch((e) => console.error(e))
    }
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

  const myProfile = () => {

    axios.get<typeUser[]>('http://localhost:5100/profile/myProfile', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    }).then((res) => {
      const currentProfile = res.data.find((user: typeUser) => user)
      setFormEdit(currentProfile)
    }).catch((e) => {
      console.error(e)
    })
  }

  useEffect(() => {
    myProfile()
  }, [])

  const onBlurHandler = (e: React.FocusEvent<HTMLFormElement>) => {
    switch (e.target.name) {
      case 'oldPassword':
        if (regEx.password.test(form.oldPassword)) {
          setErrorOldPassword('')
        } else {
          setErrorOldPassword('Invalid password')
        }
        break
      case 'password':
        if (regEx.password.test(form.password)) {
          setErrorNewPassword('')
        } else {
          setErrorNewPassword('Invalid password')
        }
        break
    }
  }

  const deleteAvatar = () => {
    axios.delete('http://localhost:5100/upload/deleteAvatar', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
      .then((res) => {
        setAvatar(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  useEffect(() => {
    if (!!errorNewPassword) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [errorNewPassword, form.newPassword])

  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_personalCabinetBar}>
        <Header avatar={avatar} title='Personal Cabinet'
                subTitle='Information about your account'/>
        <form
          className={style.main_personalCabinetBar_userSettings}
          method='POST'
          action='/upload'
          encType='multipart/form-data'
          onBlur={(e) => onBlurHandler(e)}
        >
          <div className={style.main_personalCabinetBar_userSettings_row}>
            <Input
              value={form.firstName}
              name='firstName'
              onChange={changeForm}
              placeholder='First name'
              title='First name'
              type='text'
              width='380px'/>
            <Input
              value={form.lastName}
              name='lastName'
              onChange={changeForm}
              placeholder='Last name'
              title='Last name'
              type='text'
              width='380px'/>
            <div className={style.main_personalCabinetBar_userSettings_row_avatarContainer}>
              <span>Avatar preview</span>
              <div className={style.main_personalCabinetBar_userSettings_row_avatarContainer_imgPreviewContainer}>
                {
                  previewAvatarState
                    ?
                    //@ts-ignore
                    <img src={previewAvatarState} alt='preview Avatar'/>
                    // todo Спросить у димы про ArrayBuffer
                    :
                    <img src={previewAvatar} alt='preview Avatar'/>
                }
              </div>
            </div>

          </div>
          <div className={style.main_personalCabinetBar_userSettings_row}>
            <Input
              name='companyName'
              onChange={changeForm}
              value={form.companyName}
              placeholder='Company name'
              title='Company name'
              type='text'
              width='380px'/>
            <Input
              value={form.productCategory}
              name='productCategory'
              onChange={changeForm}
              placeholder='Product Category'
              title='Product Category'
              type='text'
              width='380px'/>
          </div>
          <div className={style.main_personalCabinetBar_userSettings_row}>
            <Input
              value={form.address}
              name='address'
              onChange={changeForm}
              placeholder='Address'
              title='Address'
              type='text'
              width='380px'/>

            <Input
              defaultValue={inputOldPassword}
              value={inputOldPassword}
              name='oldPassword'
              onBlur={() => changePassword()}
              onChange={(e) => {
                changeForm(e)
                setTouched({...touched, oldPassword: true})
                setInputOldPassword(e.target.value)
              }}
              placeholder='Enter old password'
              title='Enter old password'
              type='password'
              width='380px'
              error={touched.oldPassword ? errorOldPassword : undefined}
            />

          </div>
          <div className={style.main_personalCabinetBar_userSettings_row}>
            <Input
              name='image'
              onChange={(e) => {
                imageHandler(e)
                setImage(e.target.files)
              }}
              placeholder='Avatar'
              title='Avatar'
              type='file'
              width='380px'/>

            <Input
              readOnly={!currentPassword}
              defaultValue={inputNewPassword}
              value={inputNewPassword}
              name='password'
              onChange={(e) => {
                changeForm(e)
                setTouched({...touched, newPassword: true})
                setInputNewPassword(e.target.value)
              }}
              placeholder='Enter a new password'
              title='Enter a new password'
              type='password'
              error={touched.newPassword ? errorNewPassword : undefined}
              width='380px'
            />
          </div>
          <div className={style.main_personalCabinetBar_btns}>
            <ButtonUI
              onClick={() => profileChanges()}
              disabled={!isValid}
              width='158px'
              title='Save changes'
              height='52px'/>
            <ButtonUI
              bch='#c23616'
              bc='#e84118'
              onClick={() => deleteAvatar()}
              width='158px'
              title='Delete avatar'
              height='52px'/>
          </div>
        </form>
      </div>
    </main>
  );
};

export default PersonalCabinet;