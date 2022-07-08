import React, {FC, useEffect, useState} from 'react';
import style from "./header.module.scss";
import ButtonUI from "../ButtonTS/ButtonUI";
import file from "../../assets/file.svg";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import Input from "../Input/Input";
import plus from "../../assets/Plus.svg";


import {TypeProduct} from "../../types/types";
import {regEx} from "../../assets/regEx";
import {useLocation} from "react-router-dom";
import {PathEnum} from "../AppRouter/AppRouter";
import {useAction} from '../../hooks/useAction'
import {addProduct} from "../../redux/action-creater/product";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface HeaderProps {
  title: string
  subTitle: string
  setDataProduct?: React.Dispatch<TypeProduct[]>
  dataProduct?: TypeProduct[]
  avatar?: string
  btnNone?: string
  formFirstName?: string
}

interface InitialTouchedTypes {
  price: boolean
  store: boolean
  productName: boolean
  productCategory: boolean
  quantityGoods: boolean
  weightVolumeItem: boolean
}

const initialTouched: InitialTouchedTypes = {
  price: false,
  store: false,
  productName: false,
  productCategory: false,
  quantityGoods: false,
  weightVolumeItem: false
}

const Header: FC<HeaderProps> =
  ({
     title,
     subTitle = []
   }) => {
    const [modalActive, setModalActive] = useState<boolean>(false)
    const [valueStore, setValueStore] = useState<string>('')
    const [valuePrice, setValuePrice] = useState<number | null>()
    const [valueProductName, setValueProductName] = useState<string>('')
    const [valueProductCategory, setValueProductCategory] = useState<string>('')
    const [valueQuantityGoods, setValueQuantityGoods] = useState<number | null>(null)
    const [valueWeightVolumeOneItem, setValueWeightVolumeOneItem] = useState<number | null>(null)
    const [errorStore, setErrorStore] = useState<string>('')
    const [errorPrice, setErrorPrice] = useState<string>('')
    const [errorProductName, setErrorProductName] = useState<string>('')
    const [errorProductCategory, setErrorProductCategory] = useState<string>('')
    const [errorQuantityGoods, setErrorQuantityGoods] = useState<string>('')
    const [errorWeightVolumeItem, setErrorWeightVolumeItem] = useState<string>('')
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [touched, setTouched] = useState<InitialTouchedTypes>(initialTouched)

    const user = useTypedSelector(state => state.user)
    const {addProduct, fetchUsers} = useAction()
    const {pathname} = useLocation();

    const onSubmit = () => {
      const product: TypeProduct = {
        store: valueStore,
        price: valuePrice,
        productName: valueProductName,
        productCategory: valueProductCategory,
        quantityGoods: valueQuantityGoods,
        weightVolumeOneItem: valueWeightVolumeOneItem,
      }

      addProduct({payload: product})

      setValuePrice(null)
      setValueProductCategory('')
      setValueProductName('')
      setValueWeightVolumeOneItem(null)
      setValueQuantityGoods(null)
      setValueStore('')

      setTouched(initialTouched)
      setIsFormValid(false)
      setModalActive(false)
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
          if (!valuePrice) return
          if (valuePrice !== 0 && valuePrice <= 5100) {
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
          if (valueQuantityGoods !== null && valueQuantityGoods <= 200 && valueQuantityGoods > 0) {
            setErrorQuantityGoods('')
          } else {
            setErrorQuantityGoods('blank field')
          }
          break
        case 'weightVolumeItem':
          if (valueWeightVolumeOneItem !== null && Number(valueWeightVolumeOneItem) <= 20 && Number(valueWeightVolumeOneItem) > 0) {
            setErrorWeightVolumeItem('')
          } else {
            setErrorWeightVolumeItem('blank field')
          }
          break
      }
    }

    useEffect(() => {
      fetchUsers()
    }, [])

    useEffect(() => {
      if (touched.price && touched.store && touched.productName && touched.productCategory && touched.quantityGoods && touched.weightVolumeItem) {
        if (
          !errorStore &&
          !errorPrice &&
          !errorQuantityGoods &&
          !errorProductName &&
          !errorProductCategory &&
          !errorWeightVolumeItem &&
          touched.price &&
          touched.store &&
          touched.productName &&
          touched.productCategory &&
          touched.quantityGoods &&
          touched.weightVolumeItem
        ) {
          setIsFormValid(true)
        } else {
          setIsFormValid(false)
        }
      }
    }, [errorStore, errorPrice, errorQuantityGoods, errorProductName, errorProductCategory, errorWeightVolumeItem, touched])
    return (
      <div className={style.topBar}>
        <div className={style.topBar_titleBar}>
          <span className={style.topBar_titleBar_topTitle}>{title}</span>
          <span className={style.topBar_titleBar_downTitle}>{subTitle}</span>
        </div>
        <div className={style.topBar_btn}>
          {
            pathname === PathEnum.MY_PRODUCT && (
              <ButtonUI height='52px' onClick={() => setModalActive(true)} title='Create a product' leftSrc={file}
                        leftAlt='fileIcon'
                        bc='#5382E7' width='201px'/>
            )
          }
          <div className={style.topBar_containerInfoPerson}>
            <div className={style.topBar_containerInfoPerson_avatar}>
              {
                user.avatar
                &&
                <img src={'http://localhost:5100/' + user.avatar} alt='avatar'/>
              }
            </div>
            {user.firstName}
          </div>
        </div>
        {
          modalActive
            ?
            <ModalWindow
              onBlur={(e: React.FocusEvent<HTMLFormElement>) => BlurHandler(e)}
              title='Creating a product'
              setModalActive={setModalActive}>
              <Input
                name='store'
                onChange={(e) => {
                  setValueStore(e.target.value)
                }}
                onBlur={() => setTouched({...touched, store: true})}
                placeholder='Store'
                type='text'
                value={valueStore}
                defaultValue={''}
                width='300px'
                error={touched.store ? errorStore : undefined}
                errorBorder={errorStore && '1px solid red'}
              />
              <Input
                name='price'
                value={valuePrice!}
                onChange={(e) => {
                  setValuePrice(e.target.valueAsNumber)
                  setTouched({...touched, price: true})
                }}
                defaultValue={''}
                placeholder='Price'
                type='number'
                width='300px'
                error={touched.price ? errorPrice : undefined}
                errorBorder={errorPrice && '1px solid red'}
              />
              <Input
                value={valueProductName}
                name='productName'
                onChange={(e) => {
                  setValueProductName(e.target.value)
                }}
                onBlur={() => setTouched({...touched, productName: true})}
                placeholder='Product name'
                type='text'
                width='300px'
                defaultValue={''}
                errorBorder={errorProductName && '1px solid red'}
                error={touched.productName ? errorProductName : undefined}
              />
              <Input
                value={valueProductCategory}
                name='productCategory'
                onChange={(e) => {
                  setValueProductCategory(e.target.value)
                }}
                defaultValue={''}
                onBlur={() => setTouched({...touched, productCategory: true})}
                placeholder='Product Category'
                type='text'
                width='300px'
                errorBorder={errorProductCategory && '1px solid red'}
                error={touched.productCategory ? errorProductCategory : undefined}
              />
              <Input
                value={valueQuantityGoods!}
                name='quantityGoods'
                onChange={(e) => {
                  setValueQuantityGoods(e.target.valueAsNumber)
                }}
                defaultValue={''}
                onBlur={() => setTouched({...touched, quantityGoods: true})}
                placeholder='Quantity of goods'
                type='number'
                width='300px'
                errorBorder={errorQuantityGoods && '1px solid red'}
                error={touched.quantityGoods ? errorQuantityGoods : undefined}
              />
              <Input
                value={valueWeightVolumeOneItem!}
                name='weightVolumeItem'
                onChange={(e) => {
                  setValueWeightVolumeOneItem(e.target.valueAsNumber)
                }}
                defaultValue={''}
                onBlur={() => setTouched({...touched, weightVolumeItem: true})}
                placeholder='Weight / Volume of one item'
                type='number'
                width='300px'
                errorBorder={errorWeightVolumeItem && '1px solid red'}
                error={touched.weightVolumeItem ? errorWeightVolumeItem : undefined}
              />
              <ButtonUI
                disabled={!isFormValid}
                onClick={() => onSubmit()}
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