import React, {FC} from 'react';

import Logo from '../../assets/Logo.svg'
import home from '../../assets/home.svg'
import doc from '../../assets/doc.svg'
import percent from '../../assets/percent.svg'
import user from '../../assets/user.svg'
import style from './navBar.module.scss'

import NavElemets from "../../UI/NavElements/NavElemets";

const NavBar: FC = () => {
    return (
        <nav className={style.nav}>
            <div className={style.nav_navElements}>
                <img src={Logo} alt='Logo'/>
                    <NavElemets src={home} alt='homeImg' title='Main page'/>
                    <NavElemets src={doc} alt="DocumentImg" title='My Products'/>
                    <NavElemets src={percent} alt='percentImg' title='My sales'/>
                    <NavElemets src={user} alt='userImg' title='Personal Cabinet'/>
            </div>
        </nav>
    );
};

export default NavBar;