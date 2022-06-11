import React, {FC} from 'react';

import style from './mainPage.module.scss'
import NavBar from "../NavBar/NavBar";

const MainPage: FC = () => {
  return (
    <main className={style.main}>
      <NavBar/>

    </main>
  );
};

export default MainPage;