import React, {FC, useEffect, useState} from 'react';

import style from './createAcc.module.scss'
import imgReg from '../../assets/img_at_registration.png'
import Input from "../../UI/Input/Input";
import ButtonUI from "../../UI/Button/ButtonUI";
import {useNavigate} from "react-router-dom";
import {regEx} from "../../assets/regEx";


const initialTouched = {
  valueFirstName: false,
  valueLastName: false,
  valueCompanyName: false,
  valueEmail: false,
  valuePassword: false,
  valueRepeatPassword: false,
}

type userData = {
  firstName: string
  lastName: string
  companyName: string
  email: string
  password: string
  repeatPassword: string
}

const CreateAcc: FC = () => {
  const navigate = useNavigate()

  const [valueFirstName, setValueFirstName] = useState<string>('')
  const [touched, setTouched] = useState<object>(initialTouched)
  const [formIsValid, setFormIsValid] = useState<boolean>(false)
  const [valueLastName, setValueLastName] = useState<string>('')
  const [valueCompanyName, setValueCompanyName] = useState<string>('')
  const [valueEmail, setValueEmail] = useState<string>('')
  const [valuePassword, setValuePassword] = useState<string>('')
  const [valueRepeatPassword, setValueRepeatPassword] = useState<string>('')
  const [errorCompanyName, setErrorCompanyName] = useState<string>('Invalid company name')
  const [errorPassword, setErrorPassword] = useState<string>('Invalid password')
  const [errorRepeatPassword, setErrorRepeatPassword] = useState<string>('Password does not match')
  const [errorEmail, setErrorEmail] = useState<string>('Invalid Email')
  const [errorFirstName, setErrorFirstName] = useState<string>('Invalid first name')
  const [errorLastName, setErrorLastName] = useState<string>('Invalid last name')
  const [showError, setShowError] = useState<string>('')
  const auth = JSON.parse(localStorage.getItem('auth') as string)

  const BlurHandler = (e: React.FocusEvent<HTMLFormElement>) => {
    switch (e.target.name) {
      case 'firstName':
        if (regEx.name.test(e.target.value) && valueFirstName !== '' && valueFirstName.length >= 5) {
          setErrorFirstName('')
        } else {
          setErrorLastName('Invalid first name')
        }
        break
      case 'lastName':
        if (regEx.name.test(e.target.value) && valueLastName !== '' && valueLastName.length >= 5) {
          setErrorLastName('')
        } else {
          setErrorLastName('Invalid last name')
        }
        break
      case 'companyName':
        if (regEx.name.test(e.target.value) && valueCompanyName !== '' && valueCompanyName.length <= 15) {
          setErrorCompanyName('')
        } else {
          setErrorCompanyName('Invalid company name')
        }
        break
      case 'email':
        if (regEx.email.test(e.target.value) && valueEmail !== '') {
          setErrorEmail('')
        } else {
          setErrorEmail('Invalid Email')
        }
        break
      case 'password':
        if (regEx.password.test(e.target.value) && valuePassword !== '') {
          setErrorPassword('')
        } else {
          setErrorPassword('Invalid password')
        }
        break
      case 'repeatPassword':
        if (valueRepeatPassword === valuePassword && valueRepeatPassword !== '') {
          setErrorRepeatPassword('')
        } else {
          setErrorRepeatPassword('Password does not match')
        }
        break
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user: userData = {
      firstName: valueFirstName,
      lastName: valueLastName,
      companyName: valueCompanyName,
      password: valuePassword,
      email: valueEmail,
      repeatPassword: valueRepeatPassword
    }
    const localUsers: string | null = localStorage.getItem('users')
    if (localUsers) {
      userCreate(user, localUsers)
    } else {
      localStorage.setItem('users', JSON.stringify([user]))
      navigate('/signIn')
    }
  }

  const userCreate = (user: userData, localUsers: string) => {

    const oldUser = JSON.parse(localUsers).filter((oldUser: userData) => oldUser.email === user.email)
    if (oldUser.length) {
      setShowError('Пользователь с таким Email существует')
    } else {
      localStorage.setItem('users', JSON.stringify([...JSON.parse(localUsers), user]))
      setShowError('')
      navigate('/signIn')
    }
  }

  useEffect(() => {
    if (auth) navigate('/mainPage')
  }, [auth])

  useEffect(() => {
    if (!!errorFirstName || !!errorLastName || !!errorCompanyName || !!errorPassword || !!errorEmail || !!errorRepeatPassword) {
      setFormIsValid(false)
    } else {
      setFormIsValid(true)
    }
  }, [errorFirstName, errorLastName, errorCompanyName, errorPassword, errorEmail, errorRepeatPassword, valueFirstName])

  return (
    <main className={style.main}>
      <div className={style.main_regBlock}>
        <form className={style.main_regBlock_form} onSubmit={(e) => onSubmit(e)}
              onBlur={(e) => BlurHandler(e)}>
          <span className={style.main_regBlock_title}>Create an account</span>
          <span className={style.main_regBlock_errorTop}>{showError}</span>
          <div className={style.main_regBlock_inputsRow}>
            <div className={style.main_regBlock_errorBlock}>
              <Input
                name='firstName'
                errorBorder={errorFirstName && '1px solid red'}
                defaultValue={valueFirstName}
                onChange={(e) => {
                  setValueFirstName(e.target.value)
                  setTouched({valueFirstName: true})
                }}
                title='First name'
                placeholder='First name'
                type='text'
                width='100%'/>
              {touched && <span className={style.main_regBlock_error}>{errorFirstName}</span>}
            </div>
            <div className={style.main_regBlock_errorBlock}>
              <Input
                errorBorder={errorLastName && '1px solid red'}
                name='lastName'
                defaultValue={valueLastName}
                onChange={(e) => {
                  setValueLastName(e.target.value)
                  setTouched({valueLastName: true})
                }}
                title='Last name'
                placeholder='Last name'
                type='text'
                width='100%'/>
              {touched && <span className={style.main_regBlock_error}>{errorLastName}</span>}
            </div>
          </div>
          <Input
            errorBorder={errorCompanyName && '1px solid red'}
            name='companyName'
            defaultValue={valueCompanyName}
            onChange={(e) => {
              setValueCompanyName(e.target.value)
              setTouched({valueCompanyName: true})
            }}
            title='Company name'
            placeholder='Company name'
            type='text'
            width='100%'/>
          {touched && <span className={style.main_regBlock_error}>{errorCompanyName}</span>}
          <Input
            errorBorder={errorEmail && '1px solid red'}
            name='email'
            defaultValue={valueEmail}
            onChange={(e) => {
              setValueEmail(e.target.value)
              setTouched({valueEmail: true})
            }}

            title='Email'
            placeholder='Email'
            type='email'
            width='100%'/>
          {touched && <span className={style.main_regBlock_error}>{errorEmail}</span>}
          <Input
            errorBorder={errorPassword && '1px solid red'}
            name='password'
            defaultValue={valuePassword}
            onChange={(e) => setValuePassword(e.target.value)}
            title='Password'
            placeholder='Password'
            type='password'
            width='100%'/>
          {touched && <span className={style.main_regBlock_error}>{errorPassword}</span>}
          <Input
            errorBorder={errorRepeatPassword && '1px solid red'}
            name='repeatPassword'
            defaultValue={valueRepeatPassword}
            onChange={(e) => setValueRepeatPassword(e.target.value)}
            title='Repeat password'
            placeholder='Repeat password'
            type='password'
            width='100%'/>
          {touched && <span className={style.main_regBlock_error}>{errorRepeatPassword}</span>}
          <ButtonUI
            type={'submit'}
            disabled={!formIsValid}
            height='56px'
            title='Create account'
            padding='6px 12px'
            width='100%'/>
          <span className={style.main_regBlock_logInPage}>Already have an account? <span
            onClick={() => navigate('/signIn')}>Log in</span></span>
        </form>
      </div>
      <div className={style.main_imgBlock}>
        <img src={imgReg} alt='RegImg'/>
      </div>
    </main>
  );
};

export default CreateAcc;