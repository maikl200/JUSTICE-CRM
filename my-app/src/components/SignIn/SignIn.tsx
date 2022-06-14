import React, {FC, useState} from 'react';

import style from './signIn.module.scss'
import Input from "../../UI/Input/Input";
import ButtonUI from "../../UI/Button/ButtonUI";
import imgReg from "../../assets/img_at_registration.png";
import {useNavigate} from "react-router-dom";

const initialTouched = {
  valueEmail: false,
  valuePassword: false,
}

const SignIn: FC = () => {
  const navigate = useNavigate()

  const [valuePassword, setValuePassword] = useState<string>('')
  const [valueEmail, setValueEmail] = useState<string>('')
  const [errorPassword, setErrorPassword] = useState<string>('')
  const [errorEmail, setErrorEmail] = useState<string>('')
  const [touched, setTouched] = useState<object>(initialTouched)
  return (
    <main className={style.main}>
      <div className={style.main_logInBlock}>
        <form className={style.main_logInBlock_form}>
          <span className={style.main_logInBlock_title}>Sign in</span>
          <Input defaultValue={valueEmail} onChange={(e) => {
            setValueEmail(e.target.value)
            setTouched({valueEmail: true})
          }}
                 title='Email'
                 placeholder='Email'
                 type='email'
                 width='100%'/>
          <Input
            defaultValue={valuePassword}
            onChange={(e) => {
              setValuePassword(e.target.value)
              setTouched({valuePassword: true})
            }}
            title='Password'
            placeholder='Password'
            type='password'
            width='100%'/>
          <ButtonUI height='56px' title='Log in' padding='6px 12px' width='100%'/>
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