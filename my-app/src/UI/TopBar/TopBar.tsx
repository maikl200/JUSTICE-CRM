import React, {FC, FormEvent, useState} from 'react';
import style from "./topBar.module.scss";
import ButtonUI from "../Button/ButtonUI";
import file from "../../assets/file.svg";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import Input from "../Input/Input";
import plus from "../../assets/Plus.svg";
import {DataProductInterface} from "../../components/MyProduct/MyProduct";

interface TopBarProps {
  title: string
  subTitle: string
  setDataProduct?: (array: DataProductInterface[]) => void
  dataProduct?: DataProductInterface[]
}

type dataProductTypes = {
  store: string
  price: string
  productName: string
  productCategory: string
  quantityGoods: string
  weightVolumeOneItem: string
}

const TopBar: FC<TopBarProps> = ({title, subTitle, setDataProduct, dataProduct = []}) => {
  const [modalActive, setModalActive] = useState<boolean>(false)
  const [valueStore, setValueStore] = useState<string>('')
  const [valuePrice, setValuePrice] = useState<string>('')
  const [valueProductName, setValueProductName] = useState<string>('')
  const [valueProductCategory, setValueProductCategory] = useState<string>('')
  const [valueQuantityGoods, setValueQuantityGoods] = useState<string>('')
  const [valueWeightVolumeOneItem, setValueWeightVolumeOneItem] = useState<string>('')


  const onSubmit = (e: FormEvent) => {
    const product = {
      id: Date.now(),
      store: valueStore,
      price: valuePrice,
      productName: valueProductName,
      productCategory: valueProductCategory,
      quantityGoods: valueQuantityGoods,
      weightVolumeOneItem: valueWeightVolumeOneItem
    }
    e.preventDefault()
    const newDataProduct = dataProduct ? [...dataProduct, product] : [product]
    localStorage.setItem('dataProduct', JSON.stringify(newDataProduct))
    setDataProduct && setDataProduct(newDataProduct)
  }


  return (
    <div className={style.topBar}>
      <div className={style.topBar_titleBar}>
        <span className={style.topBar_titleBar_topTitle}>{title}</span>
        <span className={style.topBar_titleBar_downTitle}>{subTitle}</span>
      </div>
      <ButtonUI onClick={() => setModalActive(true)} title='Create a product' leftSrc={file} leftAlt='fileIcon'
                bc='#5382E7' width='201px'/>
      {
        modalActive
          ?
          <ModalWindow title='Creating a product' setModalActive={setModalActive}>
            <Input
              defaultValue={valueStore}
              onChange={(e) => setValueStore(e.target.value)}
              placeholder='Store'
              type='text'
              width='300px'/>
            <Input
              defaultValue={valuePrice}
              onChange={(e) => setValuePrice(e.target.value)}
              placeholder='Price'
              type='text'
              width='300px'/>
            <Input
              defaultValue={valueProductName}
              onChange={(e) => setValueProductName(e.target.value)}
              placeholder='Product name'
              type='text'
              width='300px'/>
            <Input
              defaultValue={valueProductCategory}
              onChange={(e) => setValueProductCategory(e.target.value)}
              placeholder='Product Category'
              type='text'
              width='300px'/>
            <Input
              defaultValue={valueQuantityGoods}
              onChange={(e) => setValueQuantityGoods(e.target.value)}
              placeholder='Quantity of goods'
              type='text'
              width='300px'/>
            <Input
              defaultValue={valueWeightVolumeOneItem}
              onChange={(e) => setValueWeightVolumeOneItem(e.target.value)}
              placeholder='Weight / Volume of one item'
              type='text'
              width='300px'/>
            <ButtonUI onClick={onSubmit} height='52px' title='Add Product' width='300px'
                      rightSrc={plus}
                      rightAlt='plusIcon'/>
          </ModalWindow>
          :
          ''
      }
    </div>
  );
};

export default TopBar;