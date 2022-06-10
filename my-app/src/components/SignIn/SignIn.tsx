import React, {FC} from 'react';

import style from './signIn.module.scss'
import Input from "../../UI/Input/Input";
import ButtonUI from "../../UI/Button/Button";
import imgReg from "../../assets/img_at_registration.png";
import {useNavigate} from "react-router-dom";

const SignIn: FC = () => {
    const navigate = useNavigate()
    return (
        <main className={style.main}>
            <div className={style.main_logInBlock}>
                <form className={style.main_logInBlock_form}>
                    <span className={style.main_logInBlock_title}>Sign in</span>
                    <Input title='Email' placeholder='Email' type='email' width='100%'/>
                    <Input title='Password' placeholder='Password' type='password' width='100%'/>
                    <ButtonUI title='Log in'/>
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