import React, {FC, useCallback, useState} from 'react';
import {Input} from "../../../UI/InputUI/Input";
import {regEx} from "../../../assets/regEx";
import ButtonUI from "../../../UI/ButtonTS/ButtonUI";
import ModalWindow from "../../ModalWindow/ModalWindow";
import {TypeProduct} from "../../../types/types";
import {editProduct} from "../../../redux/action/products";
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";

interface EditModalProps {
  editId: string
  dataEditProduct: any
  setIsEditModalActive: any
}

const EditModal: FC<EditModalProps> = ({editId, dataEditProduct, setIsEditModalActive}) => {

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
    setIsEditModalActive(false)
    setIsLoading(false)
  }, [])

  const editButton = (data: TypeProduct) => {
    setIsLoading(true)
    dispatch(editProduct({close, data, editId}))
  }

  return (
    <div>
      <ModalWindow
        onClose={close}
        onSubmit={handleSubmit(editButton)}
        title='Editing a product'>
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
          disabled={!isValid || isLoading}
          width='300px'
          title='Edit product'
          height='52px'/>
      </ModalWindow>
    </div>
  );
};

export default EditModal;