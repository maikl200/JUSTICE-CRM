import React, {FC, FormEvent, useEffect, useState} from 'react';
import style from "./header.module.scss";
import ButtonUI from "../Button/ButtonUI";
import file from "../../assets/file.svg";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import Input from "../Input/Input";
import plus from "../../assets/Plus.svg";
import {DataProductInterface} from "../../components/MyProduct/MyProduct";
import {regEx} from "../../assets/regEx";

interface HeaderProps {
  title: string
  subTitle: string
  setDataProduct?: (array: DataProductInterface[]) => void
  dataProduct?: DataProductInterface[]
}

const initialTouched = {
  valuePrice: false,
  valueStore: false,
  valueProductName: false,
  valueProductCategory: false,
  valueQuantityGoods: false,
  valueWeightVolumeItem: false
}

const Header: FC<HeaderProps> = ({title, subTitle, setDataProduct, dataProduct = []}) => {
  const [modalActive, setModalActive] = useState<boolean>(false)
  const [valueStore, setValueStore] = useState<string>('')
  const [valuePrice, setValuePrice] = useState<string>('')
  const [valueProductName, setValueProductName] = useState<string>('')
  const [valueProductCategory, setValueProductCategory] = useState<string>('')
  const [valueQuantityGoods, setValueQuantityGoods] = useState<string>('')
  const [valueWeightVolumeOneItem, setValueWeightVolumeOneItem] = useState<string>('')
  const [errorStore, setErrorStore] = useState<string>('Invalid store')
  const [errorPrice, setErrorPrice] = useState<string>('blank field')
  const [errorProductName, setErrorProductName] = useState<string>('Invalid product name')
  const [errorProductCategory, setErrorProductCategory] = useState<string>('Invalid product category')
  const [errorQuantityGoods, setErrorQuantityGoods] = useState<string>('blank field')
  const [errorWeightVolumeItem, setErrorWeightVolumeItem] = useState<string>('Field is not filled in correctly ')
  const [isFormValid, setIsFormValid] = useState<boolean>(false)
  const [touched, setTouched] = useState<object>(initialTouched)


  // @ts-ignore
  Array.prototype.last = function () {
    return this[this.length - 1]
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const product = {
      // @ts-ignore
      id: dataProduct?.length ? dataProduct.last().id + 1 : 1,
      store: valueStore,
      dateNow: new Date().toLocaleDateString(),
      price: valuePrice,
      productName: valueProductName,
      productCategory: valueProductCategory,
      quantityGoods: valueQuantityGoods,
      weightVolumeOneItem: valueWeightVolumeOneItem
    }
    const newDataProduct: DataProductInterface[] = dataProduct ? [...dataProduct, product] : [product]
    localStorage.setItem('dataProduct', JSON.stringify(newDataProduct))
    setDataProduct && setDataProduct(newDataProduct)
  }

  const BlurHandler = (e: React.FocusEvent<HTMLFormElement>) => {
    switch (e.target.name) {
      case 'store': {
        if (regEx.name.test(e.target.value) && valueStore !== '') {
          setErrorStore('')
        } else {
          setErrorStore('blank field')
        }
        break

      }
      case 'price':
        if (valuePrice !== '') {
          setErrorPrice('')
        } else {
          setErrorPrice('blank field')
        }
        break
      case 'productName':
        if (regEx.name.test(e.target.value) && valueProductName !== '') {
          setErrorProductName('')
        } else {
          setErrorProductName('blank field')
        }
        break
      case 'productCategory':
        if (regEx.name.test(e.target.value) && valueProductCategory !== '') {
          setErrorProductCategory('')
        } else {
          setErrorProductCategory('blank field')
        }
        break
      case 'quantityGoods':
        if (valueQuantityGoods !== '') {
          setErrorQuantityGoods('')
        } else {
          setErrorQuantityGoods('blank field')
        }
        break
      case 'weightVolumeItem':
        if (valueWeightVolumeOneItem !== '' && valueWeightVolumeOneItem < '20') {
          setErrorWeightVolumeItem('')
        } else {
          setErrorWeightVolumeItem('blank field')
        }
        break
    }
  }

  useEffect(() => {
    if (!!errorStore || !!errorPrice || !!errorQuantityGoods || !!errorProductName || !!errorProductCategory || !!errorWeightVolumeItem) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  }, [errorStore, errorPrice, errorQuantityGoods, errorProductName, errorProductCategory, errorWeightVolumeItem])

  return (
    <div className={style.topBar}>
      <div className={style.topBar_titleBar}>
        <span className={style.topBar_titleBar_topTitle}>{title}</span>
        <span className={style.topBar_titleBar_downTitle}>{subTitle}</span>
      </div>
      <ButtonUI onClick={() => setModalActive(true)} title='Create a product' leftSrc={file} leftAlt='fileIcon'
                bc='#5382E7' width='201px'/>
      {
        modalActive
          ?
          <ModalWindow
            onBlur={(e: React.FocusEvent<HTMLFormElement>) => BlurHandler(e)}
            title='Creating a product'
            setModalActive={setModalActive}>
            <Input
              name='store'
              defaultValue={valueStore}
              onChange={(e) => {
                setValueStore(e.target.value)
                setTouched({valueStore: true})
              }}
              placeholder='Store'
              type='text'
              width='300px'/>
            {touched && <span className={style.error}>{errorStore}</span>}
            <Input
              name='price'
              defaultValue={valuePrice}
              onChange={(e) => {
                setValuePrice(e.target.value)
                setTouched({valuePrice: true})
              }}
              placeholder='Price'
              type='number'
              width='300px'/>
            {touched && <span className={style.error}>{errorPrice}</span>}
            <Input
              name='productName'
              defaultValue={valueProductName}
              onChange={(e) => {
                setValueProductName(e.target.value)
                setTouched({valueProductName: true})
              }}
              placeholder='Product name'
              type='text'
              width='300px'/>
            {touched && <span className={style.error}>{errorProductName}</span>}
            <Input
              name='productCategory'
              defaultValue={valueProductCategory}
              onChange={(e) => setValueProductCategory(e.target.value)}
              placeholder='Product Category'
              type='text'
              width='300px'/>
            {touched && <span className={style.error}>{errorProductCategory}</span>}
            <Input
              name='quantityGoods'
              defaultValue={valueQuantityGoods}
              onChange={(e) => setValueQuantityGoods(e.target.value)}
              placeholder='Quantity of goods'
              type='number'
              width='300px'/>
            {touched && <span className={style.error}>{errorQuantityGoods}</span>}
            <Input
              name='weightVolumeItem'
              defaultValue={valueWeightVolumeOneItem}
              onChange={(e) => setValueWeightVolumeOneItem(e.target.value)}
              placeholder='Weight / Volume of one item'
              type='number'
              width='300px'/>
            {touched && <span className={style.error}>{errorWeightVolumeItem}</span>}
            <ButtonUI
              disabled={!isFormValid}
              onClick={onSubmit}
              height='52px'
              title='Add Product'
              width='300px'
              rightSrc={plus}
              rightAlt='plusIcon'/>
          </ModalWindow>
          :
          ''
      }
    </div>
  );
};

export default Header;