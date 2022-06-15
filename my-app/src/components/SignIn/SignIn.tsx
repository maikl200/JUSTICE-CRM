import React, {FC, FormEvent, useEffect, useState} from 'react';

import style from './signIn.module.scss'
import Input from "../../UI/Input/Input";
import ButtonUI from "../../UI/Button/ButtonUI";
import imgReg from "../../assets/img_at_registration.png";
import {useNavigate} from "react-router-dom";
import {regEx} from "../../assets/regEx";

const initialTouched = {
  valueEmail: false,
  valuePassword: false,
}

const SignIn: FC = () => {
  const navigate = useNavigate()

  const [valuePassword, setValuePassword] = useState<string>('')
  const [valueEmail, setValueEmail] = useState<string>('')
  const [formIsValid, setFormIsValid] = useState<boolean>(false)
  const [errorPassword, setErrorPassword] = useState<string>('Invalid password')
  const [errorEmail, setErrorEmail] = useState<string>('Invalid Email')
  const [touched, setTouched] = useState<object>(initialTouched)
  const [showError, setShowError] = useState<string>('')
  const auth = JSON.parse(localStorage.getItem('auth') as string)

  const BlurHandler = (e: React.FocusEvent<HTMLFormElement>) => {
    switch (e.target.name) {
      case 'email': {
        if (regEx.email.test(e.target.value) && valueEmail !== '') {
          setErrorEmail('')
        } else {
          setErrorEmail('Invalid Email')
        }
        break

      }
      case 'password':
        if (regEx.password.test(e.target.value) && valuePassword !== '') {
          setErrorPassword('')
        } else {
          setErrorPassword('Invalid password')
        }
        break
    }
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const user = JSON.parse(localStorage.getItem('users') as string)
    const currentUser = user.some((user: { email: string; password: string; }) => {
      return valueEmail === user.email && valuePassword === user.password
    })
    if (currentUser) {
      localStorage.setItem('auth', 'true')
      navigate('/mainPage')
    } else {
      setShowError('Пользователь не найден')
    }
  }

  useEffect(() => {
    if (auth) navigate('/mainPage')
  }, [auth])

  useEffect(() => {
    if (!!errorPassword || !!errorEmail) {
      setFormIsValid(false)
    } else {
      setFormIsValid(true)
    }
  }, [errorPassword, errorEmail, valuePassword])

  return (
    <main className={style.main}>
      <div className={style.main_logInBlock}>
        <form className={style.main_logInBlock_form}
              onSubmit={(e) => onSubmit(e)}
              onBlur={(e) => BlurHandler(e)}>
          <span className={style.main_logInBlock_title}>Sign in</span>
          <span className={style.main_logInBlock_errorTop}>{showError}</span>
          <Input
            errorBorder={errorEmail && '1px solid red'}
            defaultValue={valueEmail}
            name='email'
            onChange={(e) => {
              setValueEmail(e.target.value)
              setTouched({valueEmail: true})
            }}
            title='Email'
            placeholder='Email'
            type='email'
            width='100%'/>
          {touched && <span className={style.main_logInBlock_error}>{errorEmail}</span>}
          <Input
            errorBorder={errorPassword && '1px solid red'}
            name='password'
            defaultValue={valuePassword}
            onChange={(e) => {
              setValuePassword(e.target.value)
              setTouched({valuePassword: true})
            }}
            title='Password'
            placeholder='Password'
            type='password'
            width='100%'/>
          {touched && <span className={style.main_logInBlock_error}>{errorPassword}</span>}
          <ButtonUI disabled={!formIsValid} height='56px' title='Log in' padding='6px 12px' width='100%'/>
          <span onClick={() => navigate('/createAcc')} className={style.main_logInBlock_regPage}>Forgot password?</span>
        </form>
      </div>
      <div className={style.main_imgBlock}>
        <img src={imgReg} alt='RegImg'/>
      </div>
    </main>
  );
};

export default SignIn;