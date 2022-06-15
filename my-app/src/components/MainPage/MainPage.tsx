import React, {FC} from 'react';

import style from './mainPage.module.scss'


import NavBar from "../NavBar/NavBar";
import DiogramPie from "../Diogram/DiogramPie";
import DiogramBars from "../Diogram/DiogramBars";
import DiogramLine from "../Diogram/DiogramLine";
import TopBar from "../../UI/TopBar/TopBar";


const MainPage: FC = () => {

  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_statisticsBar}>
        <TopBar title='Sales statistics' subTitle='Welcome to CRM dashboard'/>
        <div className={style.main_statisticsBar_diogram}>
          <div className={style.main_statisticsBar_diogram_stack}>
            <div className={style.main_statisticsBar_diogram_pie}>
              <DiogramPie/>
            </div>
            <div className={style.main_statisticsBar_diogram_line}>
              <p className={style.main_statisticsBar_diogram_line_titleBar}>Total earned</p>
              <DiogramLine/>
            </div>
          </div>
          <div className={style.main_statisticsBar_diogram_bar}>
            <DiogramBars/>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainPage;