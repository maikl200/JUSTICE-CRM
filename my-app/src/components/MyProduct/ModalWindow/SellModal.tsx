import React, {FC, useState} from 'react';
import {Input} from "../../../UI/InputUI/Input";
import {regEx} from "../../../assets/regEx";
import ButtonUI from "../../../UI/ButtonTS/ButtonUI";
import ModalWindow from "../../ModalWindow/ModalWindow";
import {TypeProduct} from "../../../types/types";
import {sellProductSaga} from "../../../redux/action/products";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";

interface SellModalProps {
  sellId: string
}

const SellModal: FC<SellModalProps> = ({sellId}) => {
  const {sellModalWindow} = useAction()
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
  const dispatch = useDispatch()
  const [productSell, setProductSell] = useState<TypeProduct>()


  const quantityGoods = (productSell?.quantityGoods)

  const sellButton = (data: TypeProduct) => {
    const discriminant = quantityGoods! - data.soldItems!
    const newProduct = {
      ...productSell,
      quantityGoods: discriminant,
      ...data
    }
    dispatch(sellProductSaga({newProduct, sellId}))
    reset()
    dispatch(sellModalWindow(false))
  }

  return (
    <div>
      <ModalWindow
        onSubmit={handleSubmit(sellButton)}
        title='Sell the product'>
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
    </div>
  );
};

export default SellModal;