import React, {FC, useEffect, useState} from 'react';
import style from "./header.module.scss";
import ButtonUI from "../ButtonTS/ButtonUI";
import file from "../../assets/file.svg";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import {Input} from "../InputUI/Input";
import plus from "../../assets/Plus.svg";


import {TypeProduct} from "../../types/types";
import {regEx} from "../../assets/regEx";
import {useLocation} from "react-router-dom";
import {PathEnum} from "../AppRouter/AppRouter";
import {useAction} from '../../hooks/useAction'
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {ProductActionEnum} from "../../redux/types/product";
import {addProduct, addProductSaga} from "../../redux/action/products";

interface HeaderProps {
  title: string
  subTitle: string
  setDataProduct?: React.Dispatch<TypeProduct[]>
  dataProduct?: TypeProduct[]
  avatar?: string
  btnNone?: string
  formFirstName?: string
}

const Header: FC<HeaderProps> =
  ({
     title,
     subTitle = []
   }) => {

    const [modalActive, setModalActive] = useState<boolean>(false)
    const user = useTypedSelector(state => state.user)
    const {addProduct} = useAction()
    const {pathname} = useLocation();
    const dispatch = useDispatch();

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

    const onSubmit = (data: TypeProduct) => {
      dispatch(addProductSaga(data))
      reset()
      setModalActive(false)
    }

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
              onSubmit={handleSubmit(onSubmit)}
              title='Creating a product'
              setModalActive={setModalActive}>
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
                placeholder='Store'
                type='text'
                defaultValue={''}
              />
              <Input
                {...register('price', {
                  required: 'Required field',
                  valueAsNumber: true,
                  validate: (value) => {
                    return value <= 5000 && value > 0
                      ||
                      'No more than 5,000 or no less than 1'
                  }
                })}
                errorBorder={errors.price && '1px solid red'}
                error={errors.price && errors.price.message}
                placeholder='Price'
                type='number'
              />
              <Input
                {...register('productName', {
                  required: 'Required field',
                  pattern: {
                    value: regEx.name,
                    message: 'Invalid product name'
                  },
                })}
                errorBorder={errors.productName && '1px solid red'}
                error={errors.productName && errors.productName.message}
                placeholder='Product name'
                type='text'
                defaultValue={''}
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
                placeholder='Product Category'
                type='text'
              />
              <Input
                {...register('quantityGoods', {
                  required: 'Required field',
                  valueAsNumber: true,
                  validate: (value) => {
                    return value <= 200 && value > 0
                      ||
                      'No more than 200 or no less than 1'
                  }
                })}
                errorBorder={errors.quantityGoods && '1px solid red'}
                error={errors.quantityGoods && errors.quantityGoods.message}
                placeholder='Quantity of goods'
                type='number'
              />
              <Input
                {...register('weightVolumeOneItem', {
                  required: 'Required field',
                  valueAsNumber: true,
                  validate: (value) => {
                    return value <= 20 && value > 0
                      ||
                      'No more than 20 or no less than 1'
                  }
                })}
                errorBorder={errors.weightVolumeOneItem && '1px solid red'}
                error={errors.weightVolumeOneItem && errors.weightVolumeOneItem.message}
                placeholder='Weight / Volume of one item'
                type='number'
              />
              <ButtonUI
                disabled={!isValid}
                height='52px'
                title='Add Product'
                type='submit'
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