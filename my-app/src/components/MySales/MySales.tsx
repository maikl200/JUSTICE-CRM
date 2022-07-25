import React, {FC, useEffect} from 'react';

import NavBar from "../../UI/NavBar/NavBar";
import Header from "../../UI/Header/Header";
import SellProductOutput from "./SellProductOutput";

import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAppDispatch} from "../../redux/store";
import {fetchSellProduct} from "../../redux/slices/product/productAsyncAction";

import style from './mySales.module.scss'

const sellProductCartTitle = [
  'Product name',
  'Store',
  'Address',
  'Category',
  'Creation date',
  'Sold items',
  'Remains',
  'Weight / Volume',
  'Last sale',
]

const MySales: FC = () => {
  const {sellProduct} = useTypedSelector(state => state.product)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSellProduct())
  }, [])

  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_salesBar}>
        <Header title='My sales' subTitle='Sales table'/>
        <div className={style.main_salesBar_salesCard}>
          <div className={style.main_salesBar_salesCard_Title}>
            {sellProductCartTitle.map(title => (
              <>
                <p>{title}</p>
              </>
            ))}
          </div>
          {
            sellProduct.length > 0
              ?
              <div className={style.main_salesBar_salesCard_salesData}>
                <SellProductOutput/>
              </div>
              :
              <h1 style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>No goods sold</h1>
          }
        </div>
      </div>
    </main>
  );
};

export default MySales;