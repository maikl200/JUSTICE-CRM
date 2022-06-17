import React, {FC} from 'react';

import style from './mySales.module.scss'

import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";

const MySales: FC = () => {
  // @ts-ignore
  const salesProduct = JSON.parse(localStorage.getItem('salesProduct'))

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
            {salesProduct?.map((product: any) => {
              return (
                <>
                  <div key={product.id} className={style.main_salesBar_salesCard_salesData_sales}>
                    <p>{product.productName}</p>
                    <p>{product.store}</p>
                    <p>{product.address ? product.address : 'none'}</p>
                    <p>{product.productCategory}</p>
                    <p>{product.dateNow}</p>
                    <p>${product.price}</p>
                    <p>{product.valueNumberProduct}</p>
                    <p>{product.weightVolumeOneItem}kg</p>
                    <p>{product.valueDate}</p>
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