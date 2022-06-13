import React, {FC} from 'react';

import style from './createAcc.module.scss'
import imgReg from '../../assets/img_at_registration.png'
import Input from "../../UI/Input/Input";
import ButtonUI from "../../UI/Button/ButtonUI";
import {useNavigate} from "react-router-dom";

const CreateAcc: FC = () => {
  const navigate = useNavigate()
  return (
    <main className={style.main}>
      <div className={style.main_regBlock}>
        <form className={style.main_regBlock_form}>
          <span className={style.main_regBlock_title}>Create an account</span>
          <div className={style.main_regBlock_inputsRow}>
            <Input title='First name' placeholder='First name' type='text' width='100%'/>
            <Input title='Last name' placeholder='Last name' type='text' width='100%'/>
          </div>
          <Input title='Company name' placeholder='Company name' type='text' width='100%'/>
          <Input title='Email' placeholder='Email' type='email' width='100%'/>
          <Input title='Password' placeholder='Password' type='password' width='100%'/>
          <Input title='Repeat password' placeholder='Repeat password' type='password' width='100%'/>
          <ButtonUI height='56px' title='Create account' padding='6px 12px' width='100%'/>
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