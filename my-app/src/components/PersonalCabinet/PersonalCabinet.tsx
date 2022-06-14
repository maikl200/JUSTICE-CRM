import React, {FC} from 'react';
import NavBar from "../NavBar/NavBar";
import TopBar from "../../UI/TopBar/TopBar";

import style from './personalCabinet.module.scss'
import Input from "../../UI/Input/Input";
import ButtonUI from "../../UI/Button/ButtonUI";

const PersonalCabinet: FC = () => {
  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_personalCabinetBar}>
        <TopBar title='Personal Cabinet' subTitle='Information about your account'/>
        <form className={style.main_personalCabinetBar_userSettings}>
          <div className={style.main_personalCabinetBar_userSettings_row}>
            <Input placeholder='First name' title='First name' type='text' width='380px'/>
            <Input placeholder='Last name' title='Last name' type='text' width='380px'/>
          </div>
          <div className={style.main_personalCabinetBar_userSettings_row}>
            <Input placeholder='Company name' title='Company name' type='text' width='380px'/>
            <Input placeholder='Product Category' title='Product Category' type='text' width='380px'/>
          </div>
          <div className={style.main_personalCabinetBar_userSettings_row}>
            <Input placeholder='Address' title='Address' type='text' width='380px'/>
          </div>
          <div className={style.main_personalCabinetBar_userSettings_row}>
            <Input placeholder='Enter old password' title='Enter old password' type='text' width='380px'/>
            <Input placeholder='Enter a new password' title='Enter a new password' type='text' width='380px'/>
          </div>
          <ButtonUI width='158px' title='Save changes' height='52px'/>
        </form>
      </div>
    </main>
  );
};

export default PersonalCabinet;