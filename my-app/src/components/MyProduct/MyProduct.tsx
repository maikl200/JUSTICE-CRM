import React, {FC, useEffect, useState} from 'react';
import NavBar from "../NavBar/NavBar";
import Header from "../../UI/Header/Header";

import style from './myProduct.module.scss'

import pencil from '../../assets/pencil.svg'
import deleteIcon from '../../assets/Delete.svg'

import ButtonUI from "../../UI/ButtonTS/ButtonUI";
import ModalWindow from "../ModalWindow/ModalWindow";
import Input from "../../UI/Input/Input";
import {regEx} from "../../assets/regEx";
import {useHandleChange} from "../../utils/useHandleChange";
import axios from "axios";
import Cookies from 'js-cookie';
import CircularIndeterminate from "../../UI/Loader/CircularIndeterminate";
import {typeProduct} from "../../types/types";

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
  const [soldItems, setSoldItems] = useState<number | string>()
  const [touched, setTouched] = useState<InitialTouchedTypes>(initialTouched)
  const [valueDate, setValueDate] = useState<string>('')
  const [sellModalActive, setSellModalActive] = useState<boolean>(false)
  const [editModalActive, setEditModalActive] = useState<boolean>(false)
  const [productSell, setProductSell] = useState<typeProduct>()
  const [isSellValid, setIsSellValid] = useState<boolean>(false)
  const [isEditValid, setIsEditValid] = useState<boolean>(false)
  const [errorValueNumberProduct, setErrorValueProduct] = useState('')
  const [errorValueDate, setErrorValueDate] = useState('')
  const [errorValueStore, setErrorValueStore] = useState('')
  const [errorValuePrice, setErrorValuePrice] = useState('')
  const [errorValueCategory, setErrorValueCategory] = useState('')
  const [errorValueQuantityGoods, setErrorValueQuantityGoods] = useState('')
  const [errorValueWeightVolumeOneItem, setErrorValueWeightVolumeOneItem] = useState('')
  const [editId, setEditId] = useState<string>('')
  const [sellId, setSellId] = useState<string>('')
  const [form, changeForm] = useHandleChange()
  const [dataProduct, setDataProduct] = useState<typeProduct[]>()
  const [dataEditProduct, setDataEditProduct] = useState<typeProduct>()
  const getAllProducts = async () => {
    const allProducts = axios.get('http://localhost:5100/product/myProducts', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
    })
    try {
      await allProducts.then((res) => setDataProduct(res.data))
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  const quantityGoods = (productSell?.quantityGoods)

  const sellProduct = (id: string) => {
    setSellModalActive(true)
    setSellId(id)

    const filterProduct = dataProduct?.find((item: typeProduct) => item._id === id)
    setProductSell(filterProduct)
  }

  const sellButton = (sellId: string) => {
    const discriminant = Number(quantityGoods) - Number(soldItems)
    const newProduct = {...productSell, quantityGoods: discriminant, soldItems, valueDate}
    axios.post('http://localhost:5100/sellProduct/sellProduct', {
      ...newProduct
    }, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
      params: {
        id: sellId
      }
    }).then((data) => {
      setDataProduct(data.data)
    })
      .catch((e) => {
        console.error(e)
      })
    setTouched(initialTouched)
    setValueDate('')
    setSoldItems('')
    setSellModalActive(false)
  }

  const onBlurHandler = (e: React.FocusEvent<HTMLFormElement>) => {
    switch (e.target.name) {
      case 'numberProduct':
        if (!quantityGoods) return
        if (Number(e.target.value) <= quantityGoods && Number(e.target.value) !== 0) {

          Number(e.target.value) <= quantityGoods && setErrorValueProduct('')
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
      case 'store':
        if (regEx.name.test(form.store)) {
          setErrorValueStore('')
        } else {
          setErrorValueStore('Invalid store')
        }
        break
      case 'price':
        if (e.target.value <= 5100 && e.target.value > 0) {
          setErrorValuePrice('')
        } else {
          setErrorValuePrice('No more than 1,000 or no less than 1')
        }
        break
      case 'productCategory':
        if (regEx.name.test(form.productCategory)) {
          setErrorValueCategory('')
        } else {
          setErrorValueCategory('Invalid category')
        }
        break
      case 'quantityGoods':
        if (e.target.value < 201 && e.target.value > 0) {
          setErrorValueQuantityGoods('')
        } else {
          setErrorValueQuantityGoods('Invalid remain')
        }
        break
      case 'weightVolumeOneItem':
        if (e.target.value <= 20 && e.target.value > 0) {
          setErrorValueWeightVolumeOneItem('')
        } else {
          setErrorValueWeightVolumeOneItem('Invalid remain')
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
    if (!!errorValueStore || !!errorValuePrice || !!errorValueCategory || !!errorValueQuantityGoods || !!errorValueWeightVolumeOneItem) {
      setIsEditValid(false)
    } else {
      setIsEditValid(true)
    }
  }, [errorValueStore, errorValuePrice, errorValueCategory, errorValueQuantityGoods, errorValueWeightVolumeOneItem])

  const deleteElem = (id: string) => {
    axios.delete('http://localhost:5100/product/deleteProduct', {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
      params: {
        id: id
      }
    })
      .then(() => {
        if (!dataProduct) return
        setDataProduct(dataProduct.filter((prod: typeProduct) => prod._id !== id))
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const editElem = (id: string) => {
    setEditModalActive(true)
    const filterProduct = dataProduct?.find((item: typeProduct) => item._id === id)
    setDataEditProduct(filterProduct)
    setEditId(id)
    return
  }

  const editButton = (editId: string) => {
    axios.patch('http://localhost:5100/product/editProduct', {...form}, {
      headers: {
        Authorization: `${Cookies.get("token")}`,
      },
      params: {
        id: editId
      }
    })
      .then((res) => {
        setDataProduct(res.data)
      })
      .catch((e) => {
        console.error(e)
      })

    setTouched(initialTouched)
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
          {
            dataProduct
              ?
              <div className={style.main_productBar_productCard_productData}>
                {/*@ts-ignore*/}
                {dataProduct?.map((product: any) => (
                    <div key={product?._id} className={style.main_productBar_productCard_productData_product}>
                      <p>{product?.productName}</p>
                      <p>{product?.store}</p>
                      <p>{product?.address ? product.address : '15 Krylatskaya st...'}</p>
                      <p>{product?.productCategory}</p>
                      <p>{product?.dateNow}</p>
                      <p>${product?.price}</p>
                      <p>{product?.quantityGoods}</p>
                      <p>{product?.weightVolumeOneItem}kg</p>
                      <div style={{width: '11.1%'}}
                           className={style.main_productBar_productCard_productData_product_btn}>
                        <ButtonUI
                          onClick={() => sellProduct(product._id)}
                          coloring='#5382E7'
                          bc='#E9EDF7FF'
                          height='28px' title='Sell'
                          mw='53px'
                          width='53px'/>
                        <ButtonUI
                          onClick={() => editElem(product._id)}
                          bc='#E9EDF7FF'
                          jc='center'
                          height='28px'
                          leftSrc={pencil}
                          leftAlt='pencilIcon'
                          mw='46px'
                          width='46px'/>
                        <img onClick={() => deleteElem(product._id)} src={deleteIcon} alt='deleteIcon'/>
                      </div>
                    </div>
                  )
                ).reverse()}
              </div>
              :
              <CircularIndeterminate/>
          }
        </div>
      </div>
      {editModalActive ?
        <ModalWindow
          onBlur={onBlurHandler}
          title='Editing a product'
          setModalActive={setEditModalActive}>
          <Input
            /*@ts-ignore*/
            defaultValue={dataEditProduct?.store}
            onChange={(e) => {
              setTouched({...touched, store: true})
              changeForm(e)
            }}
            placeholder='Store'
            error={touched.store ? errorValueStore : undefined}
            type='text'
            name='store'
            width='300px'
          />
          <Input
            /*@ts-ignore*/
            defaultValue={dataEditProduct?.price}
            onChange={(e) => {
              setTouched({...touched, price: true})
              changeForm(e)
            }}
            placeholder='Price'
            type='number'
            name='price'
            width='300px'
            error={touched.price ? errorValuePrice : undefined}
          />
          <Input
            /*@ts-ignore*/
            defaultValue={dataEditProduct?.productCategory}
            onChange={(e) => {
              setTouched({...touched, category: true})
              changeForm(e)
            }}
            placeholder='Category'
            type='text'
            error={touched.category ? errorValueCategory : undefined}
            name='productCategory'
            width='300px'/>
          <Input
            /*@ts-ignore*/
            defaultValue={dataEditProduct?.quantityGoods}
            onChange={(e) => {
              setTouched({...touched, remains: true})
              changeForm(e)
            }}
            placeholder='Remains'
            type='number'
            name='quantityGoods'
            width='300px'
            error={touched.remains ? errorValueQuantityGoods : undefined}
          />
          <Input
            /*@ts-ignore*/
            defaultValue={dataEditProduct?.weightVolumeOneItem}
            onChange={(e) => {
              setTouched({...touched, weightVolume: true})
              changeForm(e)
            }}
            error={touched.weightVolume ? errorValueWeightVolumeOneItem : undefined}
            placeholder='Weight / Volume'
            type='number'
            name='weightVolumeOneItem'
            width='300px'
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
              defaultValue={soldItems}
              onChange={(e) => {
                setSoldItems(e.target.valueAsNumber)
                setTouched({...touched, numberProduct: true})
                changeForm(e)
              }}
              placeholder='Number of products'
              type='number'
              width='300px'
              error={touched.numberProduct ? errorValueNumberProduct : undefined}
            />
            <Input
              defaultValue={valueDate}
              errorBorder={errorValueDate && '1px solid red'}
              name='dateSale'
              onChange={(e) => {
                setValueDate(e.target.value)
                setTouched({...touched, date: true})
                changeForm(e)
              }}
              placeholder='Date of sale'
              type='text'
              width='300px'
              error={touched.date ? errorValueDate : undefined}
            />
            <ButtonUI
              disabled={!isSellValid}
              onClick={() => sellButton(sellId)}
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