import React, {FC, useEffect, useState} from 'react';

import style from './signIn.module.scss'
import {Input} from "../../UI/InputUI/Input";
import ButtonUI from "../../UI/ButtonTS/ButtonUI";
import imgReg from "../../assets/img_at_registration.png";
import {useNavigate} from "react-router-dom";
import {regEx} from "../../assets/regEx";
import Cookies from "js-cookie";
import {useAction} from "../../hooks/useAction";
import {TypeUser} from "../../types/types";
import {useForm} from "react-hook-form";
import {logInUser} from "../../redux/action/auth";
import {useDispatch} from "react-redux";
import {useWindowSize} from "../../hooks/useWindowSize";
import {setStatus} from "../../redux/slices/authSlice";


const SignIn: FC = () => {
  const navigate = useNavigate()
  const [showError, setShowError] = useState<string>('')
  const {logInUser} = useAction()
  const dispatch = useDispatch()
  const {width} = useWindowSize()
  const token = Cookies.get('token')
  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit
  } = useForm({
    mode: 'all'
  })

  const onSubmit = (data: TypeUser) => {
    dispatch(logInUser({navigate, setShowError, data}))
  }

  useEffect(() => {
    if (token) navigate('/mainPage')
  }, [token])

  return (
    <main className={style.main}>
      <div className={style.main_logInBlock}>
        <form className={style.main_logInBlock_form}
              onSubmit={handleSubmit(onSubmit)}
        >
          <span className={style.main_logInBlock_title}>Sign in</span>
          <span className={style.main_logInBlock_errorTop}>{showError}</span>
          <Input
            {...register('email', {
              required: 'Required field',
              pattern: {
                value: regEx.email,
                message: 'Invalid email'
              }
            })}
            errorBorder={errors.email && '1px solid red'}
            error={errors.email && errors.email.message}
            name='email'
            title='Email'
            placeholder='Email'
            type='email'
          />
          <Input
            {...register('password', {
              required: 'Required field',
              pattern: {
                value: regEx.password,
                message: 'Invalid password'
              },
            })}
            errorBorder={errors.password && '1px solid red'}
            error={errors.password && errors.password.message}
            name='password'
            title='Password'
            placeholder='Password'
            type='password'
          />
          <ButtonUI
            type={'submit'}
            disabled={!isValid}
            height='56px' title='Log in'
            padding='6px 12px'
            width='100%'
          />
          <span
            onClick={() => {
              dispatch(setStatus('none'))
              navigate('/createAcc')
            }}
            className={style.main_logInBlock_regPage}
          >
            Forgot password?
          </span>
        </form>
      </div>
      {width! > 1351 && (
        <div className={style.main_imgBlock}>
          <img src={imgReg} alt='RegImg'/>
        </div>
      )}
    </main>
  );
};

export default SignIn;