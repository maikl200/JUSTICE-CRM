import React, {FC} from 'react';

import Logo from '../../assets/Logo.svg'
import style from './navBar.module.scss'


import ButtonUI from "../../UI/Button/ButtonUI";
import {useNavigate} from "react-router-dom";

const NavBar: FC = () => {
  const navigate = useNavigate()

  return (
    <div className={style.wrapper}>
      <nav className={style.nav}>
        <img src={Logo} alt='Logo'/>
        <div className={style.nav_navElements}>
          <ButtonUI onClick={() => navigate('/mainPage')} icon='home' title='Main page' justifyContent='flex-start' backgroundColor='white' color='#A8ADB2FF'
                    backgroundColorHover='#F4F6FAFF' borderRight='1px solid #5382E7' colorHover='#5382E7'
                    padding='30px 40px' width='273px'/>
          <ButtonUI onClick={() => navigate('/myProduct')} icon='document' title='My Products'
                    justifyContent='flex-start'
                    backgroundColor='white'
                    color='#A8ADB2FF' backgroundColorHover='#F4F6FAFF' borderRight='1px solid #5382E7'
                    colorHover='#5382E7' padding='30px 40px' width='273px'/>
          <ButtonUI onClick={() => navigate('/mySales')} icon='percent' title='My sales' justifyContent='flex-start' backgroundColor='white'
                    color='#A8ADB2FF'
                    backgroundColorHover='#F4F6FAFF' borderRight='1px solid #5382E7' colorHover='#5382E7'
                    padding='30px 40px' width='273px'/>
          <ButtonUI icon='user' title='Personal Cabinet' justifyContent='flex-start' backgroundColor='white'
                    color='#A8ADB2FF' backgroundColorHover='#F4F6FAFF' borderRight='1px solid #5382E7'
                    colorHover='#5382E7' padding='30px 40px' width='273px'/>
        </div>
        <div className={style.nav_logOutBlock}>
          <ButtonUI onClick={() => navigate('/signIn')} icon='logout' title='Log out' justifyContent='flex-start' backgroundColor='white' color='#A8ADB2FF'
                    backgroundColorHover='#F4F6FAFF' colorHover='#2d3436' padding='48px 0' width='194px'/>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;