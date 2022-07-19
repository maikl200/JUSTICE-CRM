import React, {Dispatch, FC, SetStateAction, useCallback, useState} from 'react';
import {Input} from "../../../UI/InputUI/Input";
import {regEx} from "../../../assets/regEx";
import ButtonUI from "../../../UI/ButtonTS/ButtonUI";
import ModalWindow from "../../ModalWindow/ModalWindow";
import {TypeProduct} from "../../../types/types";
import {sellProductSaga} from "../../../redux/action/products";
import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import rolling from "../../../assets/Rolling.gif";


interface SellModalProps {
  sellId: string
  setIsSellModalActive: Dispatch<SetStateAction<boolean>>
  productSell?: TypeProduct
}

const SellModal: FC<SellModalProps> = ({sellId, setIsSellModalActive, productSell}) => {
  const {
    register,
    formState: {
      errors,
      isValid,
    },
    handleSubmit
  } = useForm({
    mode: 'all'
  })
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const close = useCallback(() => {
    setIsSellModalActive(false)
    setIsLoading(false)
  }, [])

  const quantityGoods = (productSell?.quantityGoods)

  const sellButton = (data: TypeProduct) => {
    const discriminant = quantityGoods! - data.soldItems!
    const newProduct = {
      ...productSell,
      quantityGoods: discriminant,
      ...data
    }
    setIsLoading(true)
    dispatch(sellProductSaga({close, newProduct, sellId}))
  }

  return (
    <div>
      <ModalWindow
        onClose={close}
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
          disabled={!isValid || isLoading}
          width='300px'
          type='submit'
          title={isLoading ? 'Loading...' : 'Sell product'}
          rightSrc={isLoading && rolling}
          height='52px'/>
      </ModalWindow>
    </div>
  );
};

export default SellModal;