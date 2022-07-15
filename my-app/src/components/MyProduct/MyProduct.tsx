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
import {sellGoods} from "../../redux/action-creater/product";
import {useAction} from "../../hooks/useAction";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {deleteProductSaga} from "../../redux/action/products";

const MyProduct: FC = () => {

  const [sellModalActive, setSellModalActive] = useState<boolean>(false)
  const [editModalActive, setEditModalActive] = useState<boolean>(false)
  const [productSell, setProductSell] = useState<TypeProduct>()
  const [editId, setEditId] = useState<string>('')
  const [sellId, setSellId] = useState<string>('')
  const [dataProduct, setDataProduct] = useState<TypeProduct[]>()
  const [dataEditProduct, setDataEditProduct] = useState<TypeProduct>()

  const products = useTypedSelector(state => state.product)
  const {fetchProducts} = useAction()
  const dispatch = useDispatch()
  const {
    register,
    reset,
    formState: {
      errors,
      isValid,
    },
    handleSubmit
  } = useForm({
    mode: 'all'
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const quantityGoods = (productSell?.quantityGoods)

  const sellProduct = (id: string) => {
    setSellModalActive(true)
    setSellId(id)

    const filterProduct = products?.find((item: TypeProduct) => item._id === id)
    setProductSell(filterProduct)
  }

  const sellButton = (data: TypeProduct) => {
    const discriminant = quantityGoods! - data.soldItems!
    const newProduct = {
      ...productSell,
      quantityGoods: discriminant,
      ...data
    }
    sellGoods(sellId, {payload: newProduct})
    reset()
    setSellModalActive(false)
  }

  const deleteElem = (id: string) => {
    dispatch(deleteProductSaga(id))
    // deleteProduct(id,products)
  }

  const editElem = (id: string) => {
    setEditModalActive(true)
    const filterProduct = products?.find((item: TypeProduct) => item._id === id)
    setDataEditProduct(filterProduct)
    setEditId(id)
    return
  }

  const editButton = (data: TypeProduct) => {
    // editProduct(editId, {payload: data})
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
            products?.length > 0
              ?
              <div className={style.main_productBar_productCard_productData}>
                {products?.map((product) => (
                    <div key={product._id} className={style.main_productBar_productCard_productData_product}>
                      <p>{product.productName}</p>
                      <p>{product.store}</p>
                      <p>{product.address ? product.address : '15 Krylatskaya st...'}</p>
                      <p>{product.productCategory}</p>
                      <p>{product.dateNow && product.dateNow}</p>
                      <p>${product.price}</p>
                      <p>{product.quantityGoods}</p>
                      <p>{product.weightVolumeOneItem}kg</p>
                      <div style={{width: '11.1%'}}
                           className={style.main_productBar_productCard_productData_product_btn}>
                        <ButtonUI
                          onClick={() => sellProduct(product._id!)}
                          coloring='#5382E7'
                          bc='#E9EDF7FF'
                          height='28px' title='Sell'
                          mw='53px'
                          width='53px'/>
                        <ButtonUI
                          onClick={() => editElem(product._id!)}
                          bc='#E9EDF7FF'
                          jc='center'
                          height='28px'
                          leftSrc={pencil}
                          leftAlt='pencilIcon'
                          mw='46px'
                          width='46px'/>
                        <img onClick={() => deleteElem(product._id!)} src={deleteIcon} alt='deleteIcon'/>
                      </div>
                    </div>
                  )
                ).reverse()}
              </div>
              :
              <h1 style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>No products</h1>
          }
        </div>
      </div>
      {editModalActive ?
        <ModalWindow
          onSubmit={handleSubmit(editButton)}
          title='Editing a product'
          setModalActive={setEditModalActive}>
          <Input
            {...register('store', {
              required: 'Required field',
              pattern: {
                value: regEx.name,
                message: 'Invalid store'
              },
            })}
            errorBorder={errors.store && '1px solid red'}
            error={errors.store && errors.store.message}
            defaultValue={dataEditProduct?.store}
            placeholder='Store'
            type='text'

          />
          <Input
            {...register('price', {
              valueAsNumber: true,
              validate: (value) => {
                return value <= 5000 && value > 0
                  ||
                  'No more than 5,000 or no less than 1'
              }
            })}
            errorBorder={errors.price && '1px solid red'}
            error={errors.price && errors.price.message}
            defaultValue={dataEditProduct?.price!}
            placeholder='Price'
            type='number'
          />
          <Input
            {...register('productCategory', {
              required: 'Required field',
              pattern: {
                value: regEx.name,
                message: 'Invalid category'
              },
            })}
            errorBorder={errors.productCategory && '1px solid red'}
            error={errors.productCategory && errors.productCategory.message}
            defaultValue={dataEditProduct?.productCategory}
            placeholder='Category'
            type='text'
          />
          <Input
            {...register('quantityGoods', {
              valueAsNumber: true,
              validate: (value) => {
                return value <= 200 && value > 0
                  ||
                  'No more than 200 or no less than 1'
              }
            })}
            errorBorder={errors.quantityGoods && '1px solid red'}
            error={errors.quantityGoods && errors.quantityGoods.message}
            defaultValue={dataEditProduct?.quantityGoods!}
            placeholder='Remains'
            type='number'

          />
          <Input
            {...register('weightVolumeOneItem', {
              valueAsNumber: true,
              validate: (value) => {
                return value <= 20 && value > 0
                  ||
                  'No more than 20 or no less than 1'
              }
            })}
            errorBorder={errors.weightVolumeOneItem && '1px solid red'}
            error={errors.weightVolumeOneItem && errors.weightVolumeOneItem.message}
            defaultValue={dataEditProduct?.weightVolumeOneItem!}
            placeholder='Weight / Volume'
            type='number'
          />
          <ButtonUI
            type='submit'
            disabled={!isValid}
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
            onSubmit={handleSubmit(sellButton)}
            title='Sell the product'
            setModalActive={setSellModalActive}>
            <Input
              {...register('soldItems', {
                required: 'Required field',
                valueAsNumber: true,
                validate: (value) => {
                  return value <= quantityGoods! && value > 0
                    ||
                    'That quantity is out of stock or you are trying to sell a zero quantity'
                }
              })}
              errorBorder={errors.soldItems && '1px solid red'}
              error={errors.soldItems && errors.soldItems.message}
              placeholder='Number of products'
              type='number'
            />
            <Input
              {...register('lastSale', {
                required: 'Required field',
                pattern: {
                  value: regEx.date,
                  message: 'Invalid date'
                }
              })}
              errorBorder={errors.lastSale && '1px solid red'}
              error={errors.lastSale && errors.lastSale.message}
              placeholder='Date of sale'
              type='text'
            />
            <ButtonUI
              disabled={!isValid}
              width='300px'
              type='submit'
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