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
  const [currentPassword, setCurrentPassword] = useState<boolean>()
  const [img, setImg] = useState(null)
  const [avatar, setAvatar] = useState()

  const profileChanges = async (e: any) => {
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
  }

  const myProfile = () => {

    axios.get('http://localhost:5100/profile/myProfile', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      }
    }).then((res) => {
      const currentProfile = res.data.find((user: any) => user)
      setFormEdit(currentProfile)
    }).catch((e) => {
      console.error(e)
    })
  }
  useLayoutEffect(() => {
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

  useEffect(() => {
    if (!!errorNewPassword || !!errorOldPassword) {
      setIsValid(false)
    } else {
      setIsValid(true)
      setCurrentPassword(false)
    }
  }, [errorNewPassword, form.newPassword, errorOldPassword])

  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_personalCabinetBar}>
        <Header avatar={avatar} title='Personal Cabinet' subTitle='Information about your account'/>
        <form className={style.main_personalCabinetBar_userSettings}
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
              name='oldPassword'
              onChange={(e) => {
                changeForm(e)
                setTouched({...touched, oldPassword: true})
              }}
              placeholder='Enter old password'
              title='Enter old password'
              type='password'
              width='380px'
              error={touched.oldPassword ? errorOldPassword : undefined}
            />

          </div>
          <div className={style.main_personalCabinetBar_userSettings_row}>
            {/*<Input*/}
            {/*  // defaultValue={loginUsers.address}*/}
            {/*  name='avatar'*/}
            {/*  onChange={(e) => changeForm(e.target.files[0])}*/}
            {/*  placeholder='Avatar'*/}
            {/*  title='Avatar'*/}
            {/*  type='file'*/}
            {/*  width='380px'/>*/}

            <Input
              // readOnly={!currentPassword}
              name='password'
              onChange={(e) => {
                changeForm(e)
                setTouched({...touched, newPassword: true})
              }}
              placeholder='Enter a new password'
              title='Enter a new password'
              type='password'
              error={touched.newPassword ? errorNewPassword : undefined}
              width='380px'
            />
          </div>
          <ButtonUI
            onClick={(e: any) => profileChanges(e)}
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