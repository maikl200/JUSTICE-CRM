import React from 'react';

import {useTypedSelector} from "../../hooks/useTypedSelector";

import style from "./mySales.module.scss";

const SellProductOutput = () => {
  const {sellProduct} = useTypedSelector(state => state.product)
  return (
    <>
      {sellProduct?.map((product) => (
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
      )).reverse()}
    </>
  );
};

export default SellProductOutput;