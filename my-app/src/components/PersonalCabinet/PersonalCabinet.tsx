import React, {FC, useEffect, useLayoutEffect, useState} from 'react';

import {useHandleChange} from "../../utils/useHandleChange";

import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";

import style from './personalCabinet.module.scss'
import Input from "../../UI/Input/Input";
import ButtonUI from "../../UI/Button/ButtonUI";
import {regEx} from "../../assets/regEx";
import axios from "axios";
import Cookies from "js-cookie";
import {cardContentClasses} from "@mui/material";

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
  const [currentPassword, setCurrentPassword] = useState<boolean>(false)
  const [dataProfile, setDataProfile] = useState()
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

  const profileChanges = () => {
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

    const data = new FormData()

    axios.post('http://localhost:5100/upload', data)
      .then((res) => console.log(res))
      .catch((e) => console.log(e))
  }
  const myProfile = () => {

    axios.get('http://localhost:5100/profile/myProfile', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    }).then((res) => {
      const currentProfile = res.data.find((user: any) => user)
      setFormEdit(currentProfile)
      setDataProfile(currentProfile)

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
        // @ts-ignore
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
        <Header title='Personal Cabinet' subTitle='Information about your account'/>
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
              // onChange={(e) => changeForm(e.target.files[0])}
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
          <ButtonUI
            onClick={() => profileChanges()}
            disabled={!isValid}
            width='158px'
            title='Save changes'
            height='52px'/>
        </form>
      </div>
    </main>
  );
};

export default PersonalCabinet;