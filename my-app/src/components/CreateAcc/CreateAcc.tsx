import React, {FC, useEffect, useState} from 'react';

import style from './createAcc.module.scss'
import imgReg from '../../assets/img_at_registration.png'
import Input from "../../UI/Input/Input";
import ButtonUI from "../../UI/Button/ButtonUI";
import {useNavigate} from "react-router-dom";
import {regEx} from "../../assets/regEx";

import axios from "axios";
import Cookies from "js-cookie";


const initialTouched: InitialTouchedTypes = {
  firstName: false,
  lastName: false,
  companyName: false,
  email: false,
  password: false,
  repeatPassword: false,
}

interface InitialTouchedTypes {
  firstName: boolean
  lastName: boolean
  companyName: boolean
  email: boolean
  password: boolean
  repeatPassword: boolean
}


interface userData {
  firstName: string
  lastName: string
  companyName: string
  email: string
  password: string
}

const CreateAcc: FC = () => {
  const navigate = useNavigate()

  const [valueFirstName, setValueFirstName] = useState<string>('')
  const [touched, setTouched] = useState<InitialTouchedTypes>(initialTouched)
  const [formIsValid, setFormIsValid] = useState<boolean>(false)
  const [valueLastName, setValueLastName] = useState<string>('')
  const [valueCompanyName, setValueCompanyName] = useState<string>('')
  const [valueEmail, setValueEmail] = useState<string>('')
  const [valuePassword, setValuePassword] = useState<string>('')
  const [valueRepeatPassword, setValueRepeatPassword] = useState<string>('')
  const [errorCompanyName, setErrorCompanyName] = useState<string>('')
  const [errorPassword, setErrorPassword] = useState<string>('')
  const [errorRepeatPassword, setErrorRepeatPassword] = useState<string>('')
  const [errorEmail, setErrorEmail] = useState<string>('')
  const [errorFirstName, setErrorFirstName] = useState<string>('')
  const [errorLastName, setErrorLastName] = useState<string>('')
  const [showError, setShowError] = useState<string>('')
  const token = Cookies.get('token')

  const BlurHandler = (e: React.FocusEvent<HTMLFormElement>) => {
    switch (e.target.name) {
      case 'firstName':
        if (regEx.name.test(e.target.value) && valueFirstName !== '') {
          setErrorFirstName('')
        } else {
          setErrorFirstName('Invalid first name')
        }
        break
      case 'lastName':
        if (regEx.name.test(e.target.value) && valueLastName !== '') {
          setErrorLastName('')
        } else {
          setErrorLastName('Invalid last name')
        }
        break
      case 'companyName':
        if (regEx.name.test(e.target.value) && valueCompanyName !== '') {
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
    }

    axios.post('http://localhost:5100/auth/register', {
      ...user
    }).then((response) => {
      setShowError('')
      navigate('/signIn', {replace: true})
    }).catch(() => {
      setShowError('Пользователь с таким Email существует')
    })

  }

  useEffect(() => {
    if (token) navigate('/mainPage')
  }, [token])

  useEffect(() => {
    if (touched.repeatPassword && touched.password && touched.email && touched.companyName && touched.lastName && touched.firstName) {
      if (!errorPassword && !errorLastName && !errorFirstName && !errorEmail && !errorCompanyName && !errorRepeatPassword) {
        setFormIsValid(true)
      } else {
        setFormIsValid(false)
      }
    }
  }, [errorPassword, errorLastName, errorFirstName, errorEmail, errorCompanyName, errorRepeatPassword, touched])


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
                  setTouched({...touched, firstName: true})
                }}
                title='First name'
                placeholder='First name'
                type='text'
                width='100%'
                error={touched.firstName ? errorFirstName : undefined}/>
            </div>
            <div className={style.main_regBlock_errorBlock}>
              <Input
                errorBorder={errorLastName && '1px solid red'}
                name='lastName'
                defaultValue={valueLastName}
                onChange={(e) => {
                  setValueLastName(e.target.value)
                  setTouched({...touched, lastName: true})
                }}
                title='Last name'
                placeholder='Last name'
                type='text'
                width='100%'
                error={touched.lastName ? errorLastName : undefined}
              />
            </div>
          </div>
          <Input
            errorBorder={errorCompanyName && '1px solid red'}
            name='companyName'
            defaultValue={valueCompanyName}
            onChange={(e) => {
              setValueCompanyName(e.target.value)
              setTouched({...touched, companyName: true})
            }}
            title='Company name'
            placeholder='Company name'
            type='text'
            width='100%'
            error={touched.companyName ? errorCompanyName : undefined}/>

          <Input
            errorBorder={errorEmail && '1px solid red'}
            name='email'
            defaultValue={valueEmail}
            onChange={(e) => {
              setValueEmail(e.target.value)
              setTouched({...touched, email: true})
            }}
            title='Email'
            placeholder='Email'
            type='email'
            width='100%'
            error={touched.email ? errorEmail : undefined}/>

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
            error={touched.password ? errorPassword : undefined}/>

          <Input
            errorBorder={errorRepeatPassword && '1px solid red'}
            name='repeatPassword'
            defaultValue={valueRepeatPassword}
            onChange={(e) => {
              setValueRepeatPassword(e.target.value)
              setTouched({...touched, repeatPassword: true})
            }}
            title='Repeat password'
            placeholder='Repeat password'
            type='password'
            width='100%'
            error={touched.repeatPassword ? errorRepeatPassword : undefined}/>

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