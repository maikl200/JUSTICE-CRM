import React, {FC} from 'react';

import ModalWindow from "../../ModalWindow/ModalWindow";
import {Input} from "../../InputUI/Input";
import ButtonUI from "../../ButtonTS/ButtonUI";

import {regEx} from "../../../assets/regEx";
import {useForm} from "react-hook-form";
import {useTypedSelector} from "../../../hooks/useTypedSelector";

import {TypeProduct} from "../../../types/types";

interface addProductModalWindowProps {
  onSubmit: (product: TypeProduct) => void
  close: () => void
}

import rolling from "../../../assets/Rolling.gif";
import plus from "../../../assets/Plus.svg";

const AddProductModalWindow: FC<addProductModalWindowProps> = ({onSubmit, close}) => {
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

  const {status} = useTypedSelector(state => state.product)
  return (
    <>
      <ModalWindow
        onClose={close}
        onSubmit={handleSubmit(onSubmit)}
        title='Creating a product'>
        <Input
          {...register('store', {
            required: 'Required field',
            maxLength: {
              value: 15,
              message: 'Long title'
            },
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
            maxLength: {
              value: 15,
              message: 'Long title'
            },
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
            maxLength: {
              value: 15,
              message: 'Long title'
            },
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
          disabled={!isValid || status === 'loading'}
          height='52px'
          title={status === 'loading' ? 'Loading...' : 'Add Product'}
          type='submit'
          width='300px'
          rightSrc={status === 'loading' ? rolling : plus}
          rightAlt='plusIcon'/>
      </ModalWindow>
    </>
  );
};

export default AddProductModalWindow;