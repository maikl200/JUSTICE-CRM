import React, {FC, useState} from 'react';

import {useHandleChange} from "../../utils/useHandleChange";

import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";

import style from './personalCabinet.module.scss'
import Input from "../../UI/Input/Input";
import ButtonUI from "../../UI/Button/ButtonUI";

const PersonalCabinet: FC = () => {
  const loginUsers = JSON.parse(localStorage.getItem('loginUsers') as string)
  const dataProduct = JSON.parse(localStorage.getItem('dataProduct') as string)

  const [form, changeForm] = useHandleChange()

  const profileChanges = () => {
    const newProfile = loginUsers.map((user: any) => user.password === form.oldPassword ? {
      ...user,
      ...form
    } : user)
    localStorage.setItem('loginUsers', JSON.stringify(newProfile))
    localStorage.setItem('users', JSON.stringify(newProfile))
    localStorage.setItem('dataProduct', JSON.stringify(dataProduct, newProfile.address))
  }
  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_personalCabinetBar}>
        <Header title='Personal Cabinet' subTitle='Information about your account'/>
        <form className={style.main_personalCabinetBar_userSettings}>
          <div className={style.main_personalCabinetBar_userSettings_row}>
            <Input
              name='firstName'
              onChange={changeForm}
              placeholder='First name'
              title='First name'
              type='text'
              width='380px'/>
            <Input
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
              placeholder='Company name'
              title='Company name'
              type='text'
              width='380px'/>
            <Input
              name='productCategory'
              onChange={changeForm}
              placeholder='Product Category'
              title='Product Category'
              type='text'
              width='380px'/>
          </div>
          <div className={style.main_personalCabinetBar_userSettings_row}>
            <Input
              name='address'
              onChange={changeForm}
              placeholder='Address'
              title='Address'
              type='text'
              width='380px'/>
          </div>
          <div className={style.main_personalCabinetBar_userSettings_row}>
            <Input
              name='oldPassword'
              onChange={changeForm}
              placeholder='Enter old password'
              title='Enter old password'
              type='password'
              width='380px'/>
            <Input
              name='password'
              onChange={changeForm}
              placeholder='Enter a new password'
              title='Enter a new password'
              type='password'
              width='380px'/>
          </div>
          <ButtonUI
            onClick={() => profileChanges()}
            width='158px'
            title='Save changes'
            height='52px'/>
        </form>
      </div>
    </main>
  );
};

export default PersonalCabinet;