import React, {FC, FormEvent, useEffect, useState} from 'react';

import style from './signIn.module.scss'
import Input from "../../UI/Input/Input";
import ButtonUI from "../../UI/Button/ButtonUI";
import imgReg from "../../assets/img_at_registration.png";
import {useNavigate} from "react-router-dom";
import {regEx} from "../../assets/regEx";
import axios from "axios";
import Cookies from "js-cookie";

interface InitialTouchedTypes {
  email: boolean
  password: boolean
}

const initialTouched: InitialTouchedTypes = {
  email: false,
  password: false,
}

const SignIn: FC = () => {
  const navigate = useNavigate()

  const [valuePassword, setValuePassword] = useState<string>('')
  const [valueEmail, setValueEmail] = useState<string>('')
  const [formIsValid, setFormIsValid] = useState<boolean>(false)
  const [errorPassword, setErrorPassword] = useState<string>('')
  const [errorEmail, setErrorEmail] = useState<string>('')
  const [touched, setTouched] = useState<InitialTouchedTypes>(initialTouched)
  const [showError, setShowError] = useState<string>('')

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
    axios.post('http://localhost:5100/auth/login', {
      email: valueEmail,
      password: valuePassword
    }).then((response) => {
      console.log('good', response.data)
      setShowError('')
      Cookies.set('token', response.data.token)
      navigate('/mainPage', {replace: true})
    }).catch(() => {
      setShowError('Пользователь не найден')
    })
  }

  const token = Cookies.get('token')
  useEffect(() => {
    if (token) navigate('/mainPage')
  }, [token])

  useEffect(() => {
    if (touched.email && touched.password) {
      if (!!errorPassword || !!errorEmail) {
        setFormIsValid(false)
      } else {
        setFormIsValid(true)
      }
    }
  }, [errorPassword, errorEmail, touched])

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
              setTouched({...touched, email: true})
            }}
            title='Email'
            placeholder='Email'
            type='email'
            width='100%'
            error={touched.email ? errorEmail : undefined}
          />
          <Input
            errorBorder={errorPassword && '1px solid red'}
            name='password'
            defaultValue={valuePassword}
            onChange={(e) => {
              setValuePassword(e.target.value)
              setTouched({...touched, password: true})
            }}
            title='Password'
            placeholder='Password'
            type='password'
            width='100%'
            error={touched.password ? errorPassword : undefined}
          />
          <ButtonUI type={'submit'} disabled={!formIsValid} height='56px' title='Log in' padding='6px 12px'
                    width='100%'/>
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