import React, {FC, useEffect} from 'react';
import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";

import style from './myProduct.module.scss'

import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import ProductOutput from "./ProductOutput";

const MyProduct: FC = () => {
  
  const products = useTypedSelector(state => state.product)
  const {fetchProducts} = useAction()

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_productBar}>
        <Header
          title='My product'
          subTitle='Product table'
        />
        <div className={style.main_productBar_productCard}>
          <div className={style.main_productBar_productCard_Title}>
            <p>Product name</p>
            <p>Store</p>
            <p>Address</p>
            <p>Category</p>
            <p>Creation date</p>
            <p>Price</p>
            <p>Remains</p>
            <p>Weight / Volume</p>
            <p>Actions</p>
          </div>
          {
            products?.length > 0
              ?
              <ProductOutput/>
              :
              <h1 style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>No products</h1>
          }
        </div>
      </div>
    </main>
  );
};

export default MyProduct;