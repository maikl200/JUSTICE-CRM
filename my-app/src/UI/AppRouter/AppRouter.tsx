import React, {FC} from 'react';

import {Route, Routes} from "react-router-dom";
import SignIn from "../../components/SignIn/SignIn";
import MainPage from "../../components/MainPage/MainPage";
import MyProduct from "../../components/MyProduct/MyProduct";
import MySales from "../../components/MySales/MySales";
import PersonalCabinet from "../../components/PersonalCabinet/PersonalCabinet";
import CreateAcc from '../../components/CreateAcc';

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path='/createAcc' element={<CreateAcc/>}/>
      <Route path='/signIn' element={<SignIn/>}/>
      <Route path='/mainPage' element={<MainPage/>}/>
      <Route path='/myProduct' element={<MyProduct/>}/>
      <Route path='/mySales' element={<MySales/>}/>
      <Route path='/personalCabinet' element={<PersonalCabinet/>}/>
      <Route path='*' element={<SignIn/>}/>
      <Route path='/' element={<SignIn/>}/>
    </Routes>
  );
};

export default AppRouter;