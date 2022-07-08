import React, {FC, useEffect} from 'react';

import style from './mySales.module.scss'

import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";
import CircularIndeterminate from "../../UI/Loader/CircularIndeterminate";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";


const MySales: FC = () => {
  const sellProduct = useTypedSelector(state => state.sellProduct)
  const {fetchSellProducts} = useAction()

  useEffect(() => {
    fetchSellProducts()
  }, [])

  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_salesBar}>
        <Header title='My sales' subTitle='Sales table'/>
        <div className={style.main_salesBar_salesCard}>
          <div className={style.main_salesBar_salesCard_Title}>
            <p>Product name</p>
            <p>Store</p>
            <p>Address</p>
            <p>Category</p>
            <p>Creation date</p>
            <p>Price</p>
            <p>Sold items</p>
            <p>Weight / Volume</p>
            <p>Last sale</p>
          </div>
          {
            sellProduct.length > 0
              ?
              <div className={style.main_salesBar_salesCard_salesData}>
                {sellProduct?.map((product) => {
                  return (
                    <>
                      <div key={product._id} className={style.main_salesBar_salesCard_salesData_sales}>
                        <p>{product.productName}</p>
                        <p>{product.store}</p>
                        <p>{product?.address ? product.address : '15 Krylatskaya st...'}</p>
                        <p>{product.productCategory}</p>
                        <p>{product.dateNow}</p>
                        <p>${product.price}</p>
                        <p>{product.soldItems}</p>
                        <p>{product.weightVolumeOneItem}kg</p>
                        <p>{product.lastSale}</p>
                      </div>
                    </>
                  )
                }).reverse()}
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