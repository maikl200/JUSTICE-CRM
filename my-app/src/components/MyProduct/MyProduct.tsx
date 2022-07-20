import React, {FC, useEffect} from 'react';
import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";

import style from './myProduct.module.scss'

import {fetchProduct} from "../../redux/slices/productSlice";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import ProductOutput from "./ProductOutput";
import {useAppDispatch} from "../../redux/store";

const productCartTitle = [
  'Product name',
  'Store',
  'Address',
  'Category',
  'Creation date',
  'Price',
  'Remains',
  'Weight / Volume',
  'Actions',
]

const MyProduct: FC = () => {
  const dispatch = useAppDispatch()

  const {products} = useTypedSelector(state => state.product)
  useEffect(() => {
    dispatch(fetchProduct())
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
            {productCartTitle.map(title => (
              <p key={title}>{title}</p>
            ))}
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