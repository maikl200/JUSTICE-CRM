import React, {useState} from 'react';
import style from "./myProduct.module.scss";
import ButtonUI from "../../UI/ButtonTS/ButtonUI";
import pencil from "../../assets/pencil.svg";
import deleteIcon from "../../assets/Delete.svg";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {TypeProduct} from "../../types/types";
import {deleteProductSaga} from "../../redux/action/products";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import EditModal from "./ModalWindow/EditModal";
import SellModal from "./ModalWindow/SellModal";

const ProductOutput = () => {
  const [isEditModalActive, setIsEditModalActive] = useState<boolean>(false)
  const [isSellModalActive, setIsSellModalActive] = useState<boolean>(false)
  // @ts-ignore
  const products = useSelector(state => state.product)
  const dispatch = useDispatch()
  const [productSell, setProductSell] = useState<TypeProduct>()
  const [dataEditProduct, setDataEditProduct] = useState<TypeProduct>()
  const [editId, setEditId] = useState<string>('')
  const [sellId, setSellId] = useState<string>('')

  const {reset} = useForm()

  const sellProduct = (id: string) => {
    setIsSellModalActive(true)
    setSellId(id)
    const filterProduct = products?.find((item: TypeProduct) => item._id === id)
    setProductSell(filterProduct)
  }

  const deleteElem = (id: string) => {
    dispatch(deleteProductSaga(id))
  }

  const editElem = (id: string) => {
    setIsEditModalActive(true)
    const filterProduct = products?.find((item: TypeProduct) => item._id === id)
    setDataEditProduct(filterProduct)
    setEditId(id)
    reset()
  }

  return (
    <div className={style.main_productBar_productCard_productData}>
      {products?.map((product: TypeProduct) => (
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
      {isEditModalActive &&
          <EditModal
              setIsEditModalActive={setIsEditModalActive}
              editId={editId}
              dataEditProduct={dataEditProduct}
          />}
      {isSellModalActive &&
          <SellModal
              productSell={productSell}
              setIsSellModalActive={setIsSellModalActive}
              sellId={sellId}
          />}
    </div>
  );
};

export default ProductOutput;