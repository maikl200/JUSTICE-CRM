import React, {FC, useEffect, useState} from 'react';
import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";

import style from './myProduct.module.scss'

import pencil from '../../assets/pencil.svg'
import deleteIcon from '../../assets/Delete.svg'

import ButtonUI from "../../UI/ButtonTS/ButtonUI";
import ModalWindow from "../ModalWindow/ModalWindow";
import {Input} from "../../UI/InputUI/Input";
import {regEx} from "../../assets/regEx";
import {TypeProduct} from "../../types/types";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAction} from "../../hooks/useAction";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {deleteProductSaga, editProduct, sellProductSaga} from "../../redux/action/products";
import EditModal from "./ModalWindow/EditModal";
import SellModal from "./ModalWindow/SellModal";
import ProductOutput from "./ProductOutput";

const MyProduct: FC = () => {

  const [productSell, setProductSell] = useState<TypeProduct>()
  const [editId, setEditId] = useState<string>('')
  const [sellId, setSellId] = useState<string>('')
  const [dataProduct, setDataProduct] = useState<TypeProduct[]>()
  const [dataEditProduct, setDataEditProduct] = useState<TypeProduct>()

  const {editModalActive, sellModalActive} = useTypedSelector(state => state.modalWindow)
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