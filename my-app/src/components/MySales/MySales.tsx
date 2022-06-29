import React, {FC, useEffect, useState} from 'react';

import style from './mySales.module.scss'

import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";
import axios from "axios";
import Cookies from "js-cookie";
import CircularIndeterminate from "../../UI/Loader/CircularIndeterminate";


const MySales: FC = () => {
  const [salesProduct, setSalesProduct] = useState()
  const getAllSalesProducts = async () => {
    const allSaleProducts = axios.get('http://localhost:5100/sellProduct/mySellProduct', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
    try {
      await allSaleProducts.then((res) => setSalesProduct(res.data))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAllSalesProducts()
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
            salesProduct
              ?
              <div className={style.main_salesBar_salesCard_salesData}>
                {/*@ts-ignore*/}
                {salesProduct?.map((product: any) => {
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
              <CircularIndeterminate/>
          }
        </div>
      </div>
    </main>
  );
};

export default MySales;