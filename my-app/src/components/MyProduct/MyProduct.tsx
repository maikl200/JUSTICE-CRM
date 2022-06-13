import React, {FC, useState} from 'react';
import NavBar from "../NavBar/NavBar";
import TopBar from "../../UI/TopBar/TopBar";

import style from './myProduct.module.scss'
import pencil from '../../assets/pencil.svg'
import deleteIcon from '../../assets/Delete.svg'

import {productData} from "../../mockdata/productData";
import ButtonUI from "../../UI/Button/ButtonUI";
import ModalWindow from "../ModalWindow/ModalWindow";
import Input from "../../UI/Input/Input";

const MyProduct: FC = () => {
  const [sellModalActive, setSellModalActive] = useState<boolean>(false)
  const [editModalActive, setEditModalActive] = useState<boolean>(false)
  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_productBar}>
        <TopBar title='My product' subTitle='Product table'/>
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
          <div className={style.main_productBar_productCard_productData}>
            {productData.map((product): any => {
              return (
                <>
                  <div key={product.id} className={style.main_productBar_productCard_productData_product}>
                    <p>{product.productName}</p>
                    <p>{product.store}</p>
                    <p>{product.address}</p>
                    <p>{product.category}</p>
                    <p>{product.creationDate}</p>
                    <p>{product.price}</p>
                    <p>{product.remains}</p>
                    <p>{product.weightVolume}</p>
                    <div style={{width: '11.1%'}}
                         className={style.main_productBar_productCard_productData_product_btn}>
                      <ButtonUI onClick={() => setSellModalActive(true)} color='#5382E7' backgroundColor='#E9EDF7FF'
                                height='28px' title='Sell'
                                minWidth='53px'
                                width='53px'/>
                      <ButtonUI onClick={() => setEditModalActive(true)} backgroundColor='#E9EDF7FF' justifyContent='center' height='28px' leftSrc={pencil}
                                leftAlt='pencilIcon' minWidth='46px' width='46px'/>
                      <img src={deleteIcon} alt='deleteIcon'/>
                    </div>
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
      {editModalActive ?
        <ModalWindow title='Editing a product' setModalActive={setEditModalActive}>
          <Input placeholder='Store' type='text' width='300px'/>
          <Input placeholder='Price' type='text' width='300px'/>
          <Input placeholder='Category' type='text' width='300px'/>
          <Input placeholder='Remains' type='text' width='300px'/>
          <Input placeholder='Weight / Volume' type='text' width='300px'/>
          <ButtonUI width='300px' title='Sell product' height='52px'/>
        </ModalWindow>
        :
        ''
      }
      {
        sellModalActive
          ?
          <ModalWindow title='Sell the product' setModalActive={setSellModalActive}>
            <Input placeholder='Number of products' type='text' width='300px'/>
            <Input placeholder='Date of sale' type='text' width='300px'/>
            <ButtonUI width='300px' title='Sell product' height='52px'/>
          </ModalWindow>
          :
          ''
      }
    </main>
  )
    ;
};

export default MyProduct;