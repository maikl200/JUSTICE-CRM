import React, {FC, useState} from 'react';
import style from "./topBar.module.scss";
import ButtonUI from "../Button/ButtonUI";
import file from "../../assets/file.svg";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import Input from "../Input/Input";
import plus from "../../assets/Plus.svg";

interface TopBarProps {
  title: string
  subTitle: string
}

const TopBar: FC<TopBarProps> = ({title, subTitle}) => {
  const [modalActive, setModalActive] = useState<boolean>(false)
  return (
    <div className={style.topBar}>
      <div className={style.topBar_titleBar}>
        <span className={style.topBar_titleBar_topTitle}>{title}</span>
        <span className={style.topBar_titleBar_downTitle}>{subTitle}</span>
      </div>
      <ButtonUI onClick={() => setModalActive(true)} title='Create a product' leftSrc={file} leftAlt='fileIcon'
                backgroundColor='#5382E7' width='201px'/>
      {
        modalActive
          ?
          <ModalWindow title='Creating a product' setModalActive={setModalActive}>
            <Input placeholder='Store' type='text' width='300px'/>
            <Input placeholder='Pirce' type='text' width='300px'/>
            <Input placeholder='Product name' type='text' width='300px'/>
            <Input placeholder='Product Category' type='text' width='300px'/>
            <Input placeholder='Quantity of goods' type='text' width='300px'/>
            <Input placeholder='Weight / Volume of one item' type='text' width='300px'/>
            <ButtonUI height='52px' title='Add Product' width='300px' rightSrc={plus} rightAlt='plusIcon'/>
          </ModalWindow>
          :
          ''
      }
    </div>
  );
};

export default TopBar;