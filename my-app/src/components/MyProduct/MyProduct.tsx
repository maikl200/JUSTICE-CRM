import React, {FC, useEffect, useState} from 'react';
import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";

import style from './myProduct.module.scss'

import pencil from '../../assets/pencil.svg'
import deleteIcon from '../../assets/Delete.svg'

import ButtonUI from "../../UI/Button/ButtonUI";
import ModalWindow from "../ModalWindow/ModalWindow";
import Input from "../../UI/Input/Input";
import {regEx} from "../../assets/regEx";
import {productDataMocks} from "../../mockdata/productData";
import {useHandleChange} from "../../utils/useHandleChange";


export interface DataProductInterface {
  id: number
  price: number
  dateNow: string
  address?: string
  productCategory: string
  productName: string
  quantityGoods: string
  store: string
  weightVolumeOneItem: string
}

interface InitialTouchedTypes {
  numberProduct: boolean
  date: boolean
  store: boolean
  price: boolean
  category: boolean
  remains: boolean
  weightVolume: boolean

}

const initialTouched: InitialTouchedTypes = {
  numberProduct: false,
  date: false,
  store: false,
  price: false,
  category: false,
  remains: false,
  weightVolume: false
}


const MyProduct: FC = () => {
  const [valueNumberProduct, setValueNumberProduct] = useState<number>()
  const [touched, setTouched] = useState<InitialTouchedTypes>(initialTouched)
  const [valueDate, setValueDate] = useState<string>('')
  const [sellModalActive, setSellModalActive] = useState<boolean>(false)
  const [editModalActive, setEditModalActive] = useState<boolean>(false)
  const [dataProduct, setDataProduct] = useState<DataProductInterface[]>(() => JSON.parse(localStorage.getItem('dataProduct') as string) ?? productDataMocks)
  const [productSell, setProductSell] = useState({})
  const [isSellValid, setIsSellValid] = useState<boolean>(false)
  const [isEditValid, setIsEditValid] = useState<boolean>(false)
  const [errorValueNumberProduct, setErrorValueProduct] = useState('')
  const [errorValueDate, setErrorValueDate] = useState('')
  const [error, setError] = useState('')
  const [errorValueStore, setErrorValueStore] = useState('')
  const [salesProducts, setSalesProducts] = useState(JSON.parse(localStorage.getItem('salesProduct') as string) || [])
  const [editId, setEditId] = useState<number>(-1)
  const [form, changeForm] = useHandleChange()


  // @ts-ignore
  const quantityGoods = (productSell.quantityGoods)
  const sellProduct = (id: number) => {
    setSellModalActive(true)
    const filterProduct = dataProduct.filter((item) => item.id === id)
    // @ts-ignore
    setProductSell(...filterProduct)

    // @ts-ignore
    const newDataProduct = dataProduct.filter((item: { quantityGoods: number }) => item.quantityGoods !== 0)
    setDataProduct(newDataProduct)
  }

  const sellButton = () => {
    setSellModalActive(false)
    const discriminant = +quantityGoods - Number(valueNumberProduct)
    const newProduct = {...productSell, quantityGoods: Number(discriminant), valueNumberProduct, valueDate}

    if (!discriminant) {
      // @ts-ignore
      setDataProduct(dataProduct.filter((item) => item.id !== newProduct.id))
      setSalesProducts([...salesProducts, newProduct])
      return
    }
    // @ts-ignore
    setDataProduct(dataProduct?.map(product => product.id === newProduct.id ? {
      ...product,
      quantityGoods: newProduct.quantityGoods
    } : product))

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
      case 'numberProduct':
        if (Number(e.target.value)) {

          Number(e.target.value) <= Number(quantityGoods) && setErrorValueProduct('')
        } else {
          setErrorValueProduct('Incorrect filled')
        }
        break
      case 'dateSale':
        if (regEx.date.test(e.target.value) && e.target.value !== '') {
          setErrorValueDate('')
        } else {
          setErrorValueDate('Date entered incorrectly')
        }
        break
    }
  }

  useEffect(() => {
    if (!!errorValueDate || !!errorValueNumberProduct || !touched.numberProduct || !touched.date) {
      setIsSellValid(false)
    } else {
      setIsSellValid(true)
    }
  }, [errorValueNumberProduct, errorValueDate, valueDate])

  useEffect(() => {
    if (!!form.store || !!form.price || form.productCategory || form.quantityGoods || form.weightVolumeOneItem) {
      setIsEditValid(true)
      setError('')

    } else {
      setIsEditValid(false)
      setError('Fill in at least one field')

    }
  }, [form.store, form.price, form.productCategory, form.quantityGoods, form.weightVolumeOneItem])

  const deleteElem = (id: number) => {
    setDataProduct(dataProduct.filter((item) => item.id !== id))
  }

  const editElem = (id: number) => {
    setEditModalActive(true)
    setEditId(id)
    return
  }



  const editButton = (id: number) => {
    const newProducts = dataProduct?.map(prod => prod.id === id ? {
      ...prod,
      ...form
    } : prod)
    setDataProduct(newProducts)
    setEditModalActive(false)
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
                  <p>{product.address}</p>
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
                      onClick={() => editElem(product.id)}
                      bc='#E9EDF7FF'
                      jc='center'
                      height='28px'
                      leftSrc={pencil}
                      leftAlt='pencilIcon'
                      mw='46px'
                      width='46px'/>
                    <img onClick={() => deleteElem(product.id)} src={deleteIcon} alt='deleteIcon'/>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {editModalActive ?
        <ModalWindow
          title='Editing a product'
          setModalActive={setEditModalActive}>
          <Input
            onChange={(e) => {
              setTouched({...touched, store: true})
              changeForm(e)
            }}
            placeholder='Store'
            error={touched.price ? errorValueStore : undefined}
            type='text'
            name='store'
            width='300px'
          />
          <Input
            onChange={(e) => {
              setTouched({...touched, price: true})
              changeForm(e)
            }}
            placeholder='Price'
            type='number'
            name='price'
            width='300px'
          />
          <Input
            onChange={(e) => {
              setTouched({...touched, category: true})
              changeForm(e)
            }}
            placeholder='Category'
            type='text'
            name='productCategory'
            width='300px'/>
          <Input
            onChange={(e) => {
              setTouched({...touched, remains: true})
              changeForm(e)
            }}
            placeholder='Remains'
            type='number'
            name='quantityGoods'
            width='300px'/>
          <Input
            onChange={(e) => {
              setTouched({...touched, weightVolume: true})
              changeForm(e)
            }}
            placeholder='Weight / Volume'
            type='number'
            name='weightVolumeOneItem'
            width='300px'
            error={!isEditValid ? error : undefined}
          />
          <ButtonUI
            disabled={!isEditValid}
            onClick={() => editButton(editId)}
            width='300px'
            title='Edit product'
            height='52px'/>
        </ModalWindow>
        :
        ''
      }
      {
        sellModalActive
          ?
          <ModalWindow
            onBlur={onBlurHandler}
            title='Sell the product'
            setModalActive={setSellModalActive}>
            <Input
              errorBorder={errorValueNumberProduct && '1px solid red'}
              name='numberProduct'
              onChange={(e) => {
                setValueNumberProduct(e.target.valueAsNumber)
                setTouched({...touched, numberProduct: true})
              }}
              placeholder='Number of products'
              type='number'
              width='300px'
              error={touched.numberProduct ? errorValueNumberProduct : undefined}
            />
            <Input
              errorBorder={errorValueDate && '1px solid red'}
              name='dateSale'
              onChange={(e) => {
                setValueDate(e.target.value)
                setTouched({...touched, date: true})
              }}
              placeholder='Date of sale'
              type='text'
              width='300px'
              error={touched.date ? errorValueDate : undefined}
            />
            <ButtonUI
              disabled={!isSellValid}
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