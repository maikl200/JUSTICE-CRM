import React, {FC, useEffect} from 'react';

import Logo from '../../assets/Logo.svg'
import style from './navBar.module.scss'

import Cookies from 'js-cookie'

import ButtonUI from "../../UI/ButtonTS/ButtonUI";
import {NavLink, useNavigate} from "react-router-dom";
import {setStatus} from "../../redux/slices/authSlice";
import {useAppDispatch} from "../../redux/store";

const NavBar: FC = () => {

  const navigate = useNavigate()
  const token = Cookies.get('token')
  const dispatch = useAppDispatch()


  useEffect(() => {
    !token && navigate('/SignIn')
  }, [token])

  const logOut = () => {
    dispatch(setStatus('none'))
    navigate('/SignIn')
    Cookies.remove('token')
  }

  return (
    <div className={style.wrapper}>
      <nav className={style.nav}>
        <img src={Logo} alt='Logo'/>
        <div className={style.nav_navElements}>
          <NavLink style={{textDecoration: 'none'}} to='/mainPage' className={({isActive}) => isActive && style.active}>
            <ButtonUI
              bchactive='red'
              icon='home'
              title='Main page'
              jc='flex-start'
              bc='white' coloring='#A8ADB2FF'
              bch='#e1e2f2'
              br='1px solid #5382E7'
              ch='#5382E7'
              padding='30px 40px'
              width='273px'
            />
          </NavLink>
          <NavLink
            style={{textDecoration: 'none'}}
            to='/myProduct'
            className={({isActive}) => isActive && style.active}>
            <ButtonUI
              icon='document'
              title='My Products'
              jc='flex-start'
              bc='white'
              coloring='#A8ADB2FF'
              bch='#e1e2f2'
              br='1px solid #5382E7'
              ch='#5382E7'
              padding='30px 40px'
              width='273px'/>
          </NavLink>
          <NavLink
            style={{textDecoration: 'none'}}
            to='/mySales' className={({isActive}) => isActive && style.active}>
            <ButtonUI
              icon='percent'
              title='My sales'
              jc='flex-start'
              bc='white'
              coloring='#A8ADB2FF'
              bch='#e1e2f2'
              br='1px solid #5382E7'
              ch='#5382E7'
              padding='30px 40px'
              width='273px'/>
          </NavLink>

          <NavLink
            style={{textDecoration: 'none'}}
            to='/personalCabinet'
            className={({isActive}) => isActive && style.active}>
            <ButtonUI
              icon='user'
              title='Personal Cabinet'
              jc='flex-start'
              bc='white'
              coloring='#A8ADB2FF'
              bch='#e1e2f2'
              br='1px solid #5382E7'
              ch='#5382E7'
              padding='30px 40px'
              width='273px'/>
          </NavLink>

        </div>
        <div className={style.nav_logOutBlock}>
          <ButtonUI
            onClick={() => logOut()}
            icon='logout'
            title='Log out'
            jc='flex-start'
            bc='white'
            coloring='#A8ADB2FF'
            bch='#F4F6FAFF'
            ch='#5382E7'
            padding='48px 0'
            width='194px'/>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;