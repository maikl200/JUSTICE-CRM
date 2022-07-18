import React, {FC} from 'react';
import {Input} from "../../../UI/InputUI/Input";
import {regEx} from "../../../assets/regEx";
import ButtonUI from "../../../UI/ButtonTS/ButtonUI";
import ModalWindow from "../../ModalWindow/ModalWindow";
import {TypeProduct} from "../../../types/types";
import {editProduct} from "../../../redux/action/products";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useAction} from "../../../hooks/useAction";
import {useForm} from "react-hook-form";

interface EditModalProps {
  editId: string
  dataEditProduct: any
}

const EditModal: FC<EditModalProps> = ({editId,dataEditProduct}) => {

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
  const {editModalWindow} = useAction()
  const modalActive = useTypedSelector(state => state.modalWindow)
  const dispatch = useDispatch()

  const editButton = (data: TypeProduct) => {
    dispatch(editProduct({data, editId}))
    dispatch(editModalWindow(false))
  }
  return (
    <div>
      <ModalWindow
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
          disabled={!isValid}
          width='300px'
          title='Edit product'
          height='52px'/>
      </ModalWindow>
    </div>
  );
};

export default EditModal;