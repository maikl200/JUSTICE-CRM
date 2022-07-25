import React, {FC, useEffect} from 'react';

import NavBar from "../../UI/NavBar/NavBar";
import DiogramPie from "../Diogram/DiogramPie";
import DiogramBars from "../Diogram/DiogramBars";
import DiogramLine from "../Diogram/DiogramLine";
import Header from '../../UI/Header/Header'

import {useTypedSelector} from "../../hooks/useTypedSelector";
import {fetchSellProduct} from "../../redux/slices/product/productAsyncAction";
import {useAppDispatch} from "../../redux/store";

import style from './mainPage.module.scss'

const MainPage: FC = () => {

  const {sellProduct} = useTypedSelector(state => state.product)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSellProduct())
  }, [])

  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_statisticsBar}>
        <Header btnNone={'none'} title='Sales statistics' subTitle='Welcome to CRM dashboard'/>
        <div className={style.main_statisticsBar_diogram}>
          {sellProduct?.length > 0
            ?
            <>
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
            </>
            :
            <h1 style={{display: 'flex', justifyContent: 'center'}}>
              You haven't sold anything yet.
            </h1>
          }
        </div>
      </div>
    </main>
  );
};

export default MainPage;