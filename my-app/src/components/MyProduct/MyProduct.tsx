import React, {FC, FormEvent, useEffect, useState} from 'react';
import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";

import style from './myProduct.module.scss'

import pencil from '../../assets/pencil.svg'
import deleteIcon from '../../assets/Delete.svg'

import ButtonUI from "../../UI/Button/ButtonUI";
import ModalWindow from "../ModalWindow/ModalWindow";
import Input from "../../UI/Input/Input";
import {regEx} from "../../assets/regEx";

export interface DataProductInterface {
  id: number
  price: string
  dateNow: string
  address?: string
  productCategory: string
  productName: string
  quantityGoods: string
  store: string
  weightVolumeOneItem: string
}

const initialTouched = {
  valueNumberProduct: false,
  valueDate: false,
}


const MyProduct: FC = () => {
  const [valueNumberProduct, setValueNumberProduct] = useState<number>()
  const [touched, setTouched] = useState<object>(initialTouched)
  const [valueDate, setValueDate] = useState<string>('')
  const [sellModalActive, setSellModalActive] = useState<boolean>(false)
  const [editModalActive, setEditModalActive] = useState<boolean>(false)
  const [dataProduct, setDataProduct] = useState<DataProductInterface[]>(() => JSON.parse(localStorage.getItem('dataProduct') as string))
  const [productSell, setProductSell] = useState({})
  const [errorValueNumberProduct, setErrorValueProduct] = useState('')
  const [errorValueDate, setErrorValueDate] = useState('')
  const [salesProducts, setSalesProducts] = useState(JSON.parse(localStorage.getItem('salesProduct') as string) || [])


  // @ts-ignore
  const quantityGoods = (productSell.quantityGoods)
  const sellProduct = (id: number) => {
    setSellModalActive(true)
    const filterProduct = dataProduct.filter((item) => item.id === id)
    // @ts-ignore
    setProductSell(...filterProduct)
    if (quantityGoods === 0) {
      filterProduct.filter((item) => item.id !== id)
      console.log(123)
    } else {
      console.log(321)
    }
  }

  const sellButton = () => {

    const discriminant = +quantityGoods - Number(valueNumberProduct)
    const newProduct = {...productSell, quantityGoods: Number(discriminant), valueNumberProduct, valueDate}


    // @ts-ignore
    setDataProduct(dataProduct.map(product => product.id === newProduct.id ? {
      ...product,
      quantityGoods: newProduct.quantityGoods
    } : product))
    // @ts-ignore
    setSalesProducts([...salesProducts, newProduct])
  }

  useEffect(() => {
    localStorage.setItem('salesProduct', JSON.stringify(salesProducts))
  }, [salesProducts])

  useEffect(() => {
    localStorage.setItem('dataProduct', JSON.stringify(dataProduct))
  }, [dataProduct])

  const onBlurHandler = (e: React.FocusEvent<HTMLFormElement>) => {
    switch (e.target.name) {
      case 'sellProduct':
        // @ts-ignore
        if (valueNumberProduct > 0 && valueNumberProduct <= quantityGoods) {
          setErrorValueProduct('')
        } else {
          setErrorValueProduct('Incorrect filled')
        }
        break
      case 'dateSale':
        if (regEx.date.test(valueDate) && valueDate !== '') {
          setErrorValueDate('')
        } else {
          setErrorValueDate('Date entered incorrectly')
        }
        break
    }
  }


  return (
    <main className={style.main}>
      <NavBar/>
      <div className={style.main_productBar}>
        <Header
          setDataProduct={setDataProduct}
          dataProduct={dataProduct}
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
          <div className={style.main_productBar_productCard_productData}>
            {dataProduct?.map((product: DataProductInterface) => (
                <div key={product.id} className={style.main_productBar_productCard_productData_product}>
                  <p>{product.productName}</p>
                  <p>{product.store}</p>
                  <p>{product.address ? product.address : 'none'}</p>
                  <p>{product.productCategory}</p>
                  <p>{product.dateNow}</p>
                  <p>${product.price}</p>
                  <p>{product.quantityGoods}</p>
                  <p>{product.weightVolumeOneItem}kg</p>
                  <div style={{width: '11.1%'}}
                       className={style.main_productBar_productCard_productData_product_btn}>
                    <ButtonUI
                      onClick={() => sellProduct(product.id)}
                      coloring='#5382E7'
                      bc='#E9EDF7FF'
                      height='28px' title='Sell'
                      mw='53px'
                      width='53px'/>
                    <ButtonUI
                      onClick={() => setEditModalActive(true)}
                      bc='#E9EDF7FF'
                      jc='center'
                      height='28px'
                      leftSrc={pencil}
                      leftAlt='pencilIcon'
                      mw='46px'
                      width='46px'/>
                    <img src={deleteIcon} alt='deleteIcon'/>
                  </div>
                </div>
              )
            )}
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
          <ModalWindow
            onBlur={(e) => onBlurHandler(e)}
            title='Sell the product'
            setModalActive={setSellModalActive}>
            <Input
              name='sellProduct'
              defaultValue={valueNumberProduct}
              onChange={(e) => {
                setValueNumberProduct(e.target.valueAsNumber)
                setTouched({valueNumberProduct: true})
              }}
              placeholder='Number of products'
              type='number'
              width='300px'/>
            {touched && <span className={style.error}>{errorValueNumberProduct}</span>}
            <Input
              name='dateSale'
              defaultValue={valueDate}
              onChange={(e) => setValueDate(e.target.value)}
              placeholder='Date of sale'
              type='text'
              width='300px'/>
            {touched && <span className={style.error}>{errorValueDate}</span>}
            <ButtonUI
              onClick={() => sellButton()}
              width='300px'
              title='Sell product'
              height='52px'/>
          </ModalWindow>
          :
          ''
      }
    </main>
  )
    ;
};

export default MyProduct;