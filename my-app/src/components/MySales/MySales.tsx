import React, {FC} from 'react';

import style from './mySales.module.scss'

import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";
import {productDataMocks} from "../../mockdata/productData";


const MySales: FC = () => {
  const salesProduct = JSON.parse(localStorage.getItem('salesProduct') as string) ?? productDataMocks


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
          <div className={style.main_salesBar_salesCard_salesData}>
            {/*{salesProducts?.map((product: any) => {*/}
            {/*  return (*/}
            {/*    <>*/}
            {/*      <div key={product.id} className={style.main_salesBar_salesCard_salesData_sales}>*/}
            {/*        <p>{product.productName}</p>*/}
            {/*        <p>{product.store}</p>*/}
            {/*        <p>{product.address}</p>*/}
            {/*        <p>{product.productCategory}</p>*/}
            {/*        <p>{product.dateNow}</p>*/}
            {/*        <p>${product.price}</p>*/}
            {/*        <p>{product.valueNumberProduct ?? product.soldItems}</p>*/}
            {/*        <p>{product.weightVolumeOneItem}kg</p>*/}
            {/*        <p>{product.valueDate ?? product.lastSale}</p>*/}
            {/*      </div>*/}
            {/*    </>*/}
            {/*  )*/}
            {/*}).reverse()}*/}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MySales;