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

interface InitialTouchedTypes {
  valueNumberProduct: boolean
  valueDate: boolean
  valueStore: boolean
  valuePrice: boolean
  valueCategory: boolean
  valueRemains: boolean
  valueWeightVolume: boolean

}

const initialTouched: InitialTouchedTypes = {
  valueNumberProduct: false,
  valueDate: false,
  valueStore: false,
  valuePrice: false,
  valueCategory: false,
  valueRemains: false,
  valueWeightVolume: false
}


const MyProduct: FC = () => {
  const [valueNumberProduct, setValueNumberProduct] = useState<number>()
  const [valueStore, setValueStore] = useState<string>('')
  const [valuePrice, setValuePrice] = useState<string>('')
  const [valueCategory, setValueCategory] = useState<string>('')
  const [valueRemains, setValueRemains] = useState<string>('')
  const [valueWeightVolume, setValueWeightVolume] = useState<string>('')
  const [touched, setTouched] = useState<InitialTouchedTypes>(initialTouched)
  const [valueDate, setValueDate] = useState<string>('')
  const [sellModalActive, setSellModalActive] = useState<boolean>(false)
  const [editModalActive, setEditModalActive] = useState<boolean>(false)
  const [dataProduct, setDataProduct] = useState<DataProductInterface[]>(() => JSON.parse(localStorage.getItem('dataProduct') as string) ?? productDataMocks)
  const [productSell, setProductSell] = useState({})
  const [isValid, setIsValid] = useState<boolean>(false)
  const [errorValueNumberProduct, setErrorValueProduct] = useState('')
  const [errorValueDate, setErrorValueDate] = useState('')
  const [salesProducts, setSalesProducts] = useState(JSON.parse(localStorage.getItem('salesProduct') as string) || [])
  const [editId, setEditId] = useState<number>(-1)

  const [formEdit, setFormEdit] = useState({})
  console.log('isValid', isValid)

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
    setDataProduct(dataProduct.map(product => product.id === newProduct.id ? {
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
      case 'sellProduct':
        if (e.target.value > 0 && e.target.value <= quantityGoods) {
          setErrorValueProduct('')
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
    if (!!errorValueDate && !!errorValueNumberProduct || !touched.valueNumberProduct || !touched.valueDate) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }, [errorValueNumberProduct, errorValueDate, valueDate])

  const deleteElem = (id: number) => {
    setDataProduct(dataProduct.filter((item) => item.id !== id))
  }

  const editElem = (id: number) => {
    setEditModalActive(true)
    setEditId(id)
    return
  }

  const handleEditChange = (e: any) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value
    })
  }

  const editButton = (id: number) => {
    console.log(id)
    const newProducts = dataProduct.map(prod => prod.id === id ? {
      ...prod,
      ...formEdit
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
              setValueStore(e.target.value)
              setTouched({...touched, valueStore: true})
              handleEditChange(e)
            }}
            placeholder='Store'
            type='text'
            name='store'
            width='300px'/>
          <Input
            onChange={(e) => {
              setValuePrice(e.target.value)
              setTouched({...touched, valuePrice: true})
              handleEditChange(e)
            }}
            placeholder='Price'
            type='number'
            name='price'
            width='300px'/>
          <Input
            onChange={(e) => {
              setValueCategory(e.target.value)
              setTouched({...touched, valueCategory: true})
              handleEditChange(e)
            }}
            placeholder='Category'
            type='text'
            name='productCategory'
            width='300px'/>
          <Input
            onChange={(e) => {
              setValueRemains(e.target.value)
              setTouched({...touched, valueRemains: true})
              handleEditChange(e)
            }}
            placeholder='Remains'
            type='number'
            name='quantityGoods'
            width='300px'/>
          <Input
            onChange={(e) => {
              setValueWeightVolume(e.target.value)
              setTouched({...touched, valueWeightVolume: true})
              handleEditChange(e)
            }}
            placeholder='Weight / Volume'
            type='number'
            name='weightVolumeOneItem'
            width='300px'/>
          <ButtonUI
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
              name='sellProduct'
              defaultValue={valueNumberProduct}
              onChange={(e) => {
                setValueNumberProduct(e.target.valueAsNumber)
                setTouched({...touched, valueNumberProduct: true})
              }}
              placeholder='Number of products'
              type='number'
              width='300px'/>
            {touched.valueNumberProduct && <span className={style.error}>{errorValueNumberProduct}</span>}
            <Input
              errorBorder={errorValueDate && '1px solid red'}
              name='dateSale'
              defaultValue={valueDate}
              onChange={(e) => {
                setValueDate(e.target.value)
                setTouched({...touched, valueDate: true})
              }}
              placeholder='Date of sale'
              type='text'
              width='300px'/>
            {touched.valueDate && <span className={style.error}>{errorValueDate}</span>}
            <ButtonUI
              disabled={!isValid}
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