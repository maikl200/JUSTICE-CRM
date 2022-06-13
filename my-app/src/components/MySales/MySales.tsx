import React, {FC} from 'react';

import style from './mySales.module.scss'

import NavBar from "../NavBar/NavBar";
import TopBar from "../../UI/TopBar/TopBar";
import {productData} from "../../mockdata/productData";

const MySales: FC = () => {
  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_salesBar}>
        <TopBar title='My sales' subTitle='Sales table'/>
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
            {productData.map((product): any => {
              return (
                <>
                  <div key={product.id} className={style.main_salesBar_salesCard_salesData_sales}>
                    <p>{product.productName}</p>
                    <p>{product.store}</p>
                    <p>{product.address}</p>
                    <p>{product.category}</p>
                    <p>{product.creationDate}</p>
                    <p>{product.price}</p>
                    <p>{product.soldItems}</p>
                    <p>{product.weightVolume}</p>
                    <p>{product.lastSale}</p>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default MySales;