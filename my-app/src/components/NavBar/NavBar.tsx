import React, {FC, useEffect} from 'react';

import Logo from '../../assets/Logo.svg'
import style from './navBar.module.scss'

import Cookies from 'js-cookie'

import ButtonUI from "../../UI/Button/ButtonUI";
import {useNavigate} from "react-router-dom";

const NavBar: FC = () => {
  const navigate = useNavigate()
  const token = Cookies.get('token')

  useEffect(() => {
    !token && navigate('/SignIn')
  }, [token])

  const logOut = () => {
    localStorage.setItem('auth', "false")
    navigate('/SignIn')
    localStorage.removeItem('loginUsers')
  }

  return (
    <div className={style.wrapper}>
      <nav className={style.nav}>
        <img src={Logo} alt='Logo'/>
        <div className={style.nav_navElements}>
          <ButtonUI onClick={() => navigate('/mainPage')} icon='home' title='Main page' jc='flex-start'
                    bc='white' coloring='#A8ADB2FF'
                    bch='#F4F6FAFF' br='1px solid #5382E7' ch='#5382E7'
                    padding='30px 40px' width='273px'/>
          <ButtonUI onClick={() => navigate('/myProduct')} icon='document' title='My Products'
                    jc='flex-start'
                    bc='white'
                    coloring='#A8ADB2FF' bch='#F4F6FAFF' br='1px solid #5382E7'
                    ch='#5382E7' padding='30px 40px' width='273px'/>
          <ButtonUI onClick={() => navigate('/mySales')} icon='percent' title='My sales' jc='flex-start'
                    bc='white'
                    coloring='#A8ADB2FF'
                    bch='#F4F6FAFF' br='1px solid #5382E7' ch='#5382E7'
                    padding='30px 40px' width='273px'/>
          <ButtonUI onClick={() => navigate('/personalCabinet')} icon='user' title='Personal Cabinet'
                    jc='flex-start' bc='white'
                    coloring='#A8ADB2FF' bch='#F4F6FAFF' br='1px solid #5382E7'
                    ch='#5382E7' padding='30px 40px' width='273px'/>
        </div>
        <div className={style.nav_logOutBlock}>
          <ButtonUI onClick={() => logOut()} icon='logout' title='Log out' jc='flex-start'
                    bc='white' coloring='#A8ADB2FF'
                    bch='#F4F6FAFF' ch='#5382E7' padding='48px 0' width='194px'/>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;