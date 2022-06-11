import React, {FC} from 'react';

import Logo from '../../assets/Logo.svg'
import home from '../../assets/home.svg'
import doc from '../../assets/doc.svg'
import percent from '../../assets/percent.svg'
import user from '../../assets/user.svg'
import logOut from '../../assets/logOut.svg'
import style from './navBar.module.scss'


import ButtonUI from "../../UI/Button/ButtonUI";

const NavBar: FC = () => {
  return (
    <nav className={style.nav}>
      <img src={Logo} alt='Logo'/>
      <div className={style.nav_navElements}>
        <ButtonUI title='Main page' src={home} alt='homeImg' justifyContent='flex-start' backgroundColor='white'
                  color='#A8ADB2FF' backgroundColorHover='#F4F6FAFF' borderRight='1px solid #5382E7'
                  colorHover='#5382E7' padding='30px 40px' backgroundColorActive='' borderColorActive='' width='273px'/>
        <ButtonUI title='My Products' src={doc} alt='docImg' justifyContent='flex-start' backgroundColor='white'
                  color='#A8ADB2FF' backgroundColorHover='#F4F6FAFF' borderRight='1px solid #5382E7'
                  colorHover='#5382E7' padding='30px 40px' backgroundColorActive='' borderColorActive='' width='273px'/>
        <ButtonUI title='My sales' src={percent} alt='percentImg' justifyContent='flex-start' backgroundColor='white'
                  color='#A8ADB2FF' backgroundColorHover='#F4F6FAFF' borderRight='1px solid #5382E7'
                  colorHover='#5382E7' padding='30px 40px' backgroundColorActive='' borderColorActive='' width='273px'/>
        <ButtonUI title='Personal Cabinet' src={user} alt='userImg' justifyContent='flex-start' backgroundColor='white'
                  color='#A8ADB2FF' backgroundColorHover='#F4F6FAFF' borderRight='1px solid #5382E7'
                  colorHover='#5382E7' padding='30px 40px' backgroundColorActive='' borderColorActive='' width='273px'/>
      </div>
      <div className={style.nav_logOutBlock}>
        <ButtonUI title='Log out' src={logOut} alt='logOutImg' justifyContent='flex-start' backgroundColor='white'
                  color='#A8ADB2FF' backgroundColorHover='#F4F6FAFF' borderRight='' colorHover='#2d3436'
                  padding='48px 0' backgroundColorActive='' borderColorActive='' width='194px'/>
      </div>
    </nav>
  );
};

export default NavBar;