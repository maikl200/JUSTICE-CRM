import React, {FC, useEffect, useState} from 'react';

import style from './createAcc.module.scss'
import imgReg from '../../assets/img_at_registration.png'
import {Input} from "../../UI/InputUI/Input";
import ButtonUI from "../../UI/ButtonTS/ButtonUI";
import {useNavigate} from "react-router-dom";

import Cookies from "js-cookie";
import {regUser} from "../../redux/action/auth";
import {useForm} from "react-hook-form";
import {TypeUser} from "../../types/types";
import {regEx} from "../../assets/regEx";
import {useAction} from "../../hooks/useAction";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useWindowSize} from "../../hooks/useWindowSize";

const CreateAcc: FC = () => {

  const navigate = useNavigate()
  const [showError, setShowError] = useState<string>('')
  const token = Cookies.get('token')
  const {regUser} = useAction()
  const {width} = useWindowSize()
  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit,
    getValues
  } = useForm({
    mode: 'all'
  })

  const onSubmit = (data: TypeUser) => {
    regUser({navigate, setShowError, data})
  }


  useEffect(() => {
    if (token) navigate('/mainPage')
  }, [token])

  return (
    <main className={style.main}>
      <div className={style.main_regBlock}>
        <form className={style.main_regBlock_form} onSubmit={handleSubmit(onSubmit)}>
          <span className={style.main_regBlock_title}>Create an account</span>
          <span className={style.main_regBlock_errorTop}>{showError}</span>
          <div className={style.main_regBlock_inputsRow}>
            <div className={style.main_regBlock_errorBlock}>
              <Input
                {...register("firstName", {
                  required: 'Required field',
                  pattern: {
                    value: /^[a-zA-Z]+$/,
                    message: 'Invalid first name'
                  }
                })}
                errorBorder={errors.firstName ? '1px solid red' : ''}
                title='First name'
                error={errors.firstName && errors.firstName.message}
                placeholder='First name'
                type='text'
              />
            </div>
            <div className={style.main_regBlock_errorBlock}>
              <Input
                {...register('lastName', {
                  required: 'Required field',
                  pattern: {
                    value: regEx.name,
                    message: 'Invalid last name'
                  }
                })}
                errorBorder={errors.lastName && '1px solid red'}
                error={errors.lastName && errors.lastName.message}
                title='Last name'
                placeholder='Last name'
                type='text'
              />
            </div>
          </div>
          <Input
            {...register('companyName', {
              required: 'Required field',
              pattern: {
                value: regEx.name,
                message: 'This is not the name of the company'
              },
              maxLength: {
                value: 10,
                message: 'The name of the organization can not be more than 10 characters'
              }
            })}
            errorBorder={errors.companyName && '1px solid red'}
            error={errors.companyName && errors.companyName.message}
            name='companyName'
            title='Company name'
            placeholder='Company name'
            type='text'
          />

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
          <Input
            {...register('repeatPassword', {
              required: 'Required field',
              validate: (value) => {
                const password = getValues("password")
                return value === password || 'Password does not match'
              }
            })}
            errorBorder={errors.repeatPassword && '1px solid red'}
            error={errors.repeatPassword && errors.repeatPassword.message}
            name='repeatPassword'
            title='Repeat password'
            placeholder='Repeat password'
            type='password'
          />

          <ButtonUI
            type='submit'
            disabled={!isValid}
            height='56px'
            title='Create account'
            padding='6px 12px'
          />
          <span className={style.main_regBlock_logInPage}>Already have an account? <span
            onClick={() => navigate('/signIn')}>Log in</span></span>
        </form>
      </div>
      {width! > 1548
        ?
        <div className={style.main_imgBlock}>
          <img src={imgReg} alt='RegImg'/>
        </div>
        :
        ''
      }

    </main>
  );
};

export default CreateAcc;