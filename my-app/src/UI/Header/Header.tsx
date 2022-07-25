import React, {FC, useCallback, useEffect, useState} from 'react';

import AddProductModalWindow from "./ModalWindow/AddProductModalWindow";
import ButtonUI from "../ButtonTS/ButtonUI";

import {useAppDispatch} from "../../redux/store";
import {useLocation} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useForm} from "react-hook-form";
import {PathEnum} from "../AppRouter/AppRouter";
import {addProduct} from "../../redux/slices/product/productAsyncAction";
import {fetchUsers} from "../../redux/slices/user/userAsyncAction";

import {TypeProduct} from "../../types/types";

interface HeaderProps {
  title: string
  subTitle: string
  avatar?: string
  btnNone?: string
  formFirstName?: string
}

import style from "./header.module.scss";
import file from "../../assets/file.svg";
import previeAvatar from '../../assets/previeAvatar.jpg'


const Header: FC<HeaderProps> =
  ({
     title,
     subTitle = []
   }) => {

    const [modalActive, setModalActive] = useState<boolean>(false)
    const {user} = useTypedSelector(state => state.user)
    const dispatch = useAppDispatch()
    const {pathname} = useLocation();

    const {reset} = useForm()

    useEffect(() => {
      dispatch(fetchUsers())
    }, [])

    const close = useCallback(() => {
      setModalActive(false)
      reset()
    }, [])

    const onSubmit = (product: TypeProduct) => {
      dispatch(addProduct({close, product}))
    }

    return (
      <div className={style.topBar}>
        <div className={style.topBar_titleBar}>
          <span className={style.topBar_titleBar_topTitle}>{title}</span>
          <span className={style.topBar_titleBar_downTitle}>{subTitle}</span>
        </div>
        <div className={style.topBar_btn}>
          {pathname === PathEnum.MY_PRODUCT && (
            <ButtonUI
              height='52px'
              onClick={() => setModalActive(true)}
              title='Create a product'
              leftSrc={file}
              leftAlt='fileIcon'
              bc='#5382E7'
              width='201px'/>
          )}
          <div className={style.topBar_containerInfoPerson}>
            <div className={style.topBar_containerInfoPerson_avatar}>
              {
                user?.avatar
                  ?
                  <img src={'http://localhost:5100/' + user?.avatar} alt='avatar'/>
                  :
                  <img src={previeAvatar} alt={'noAvatar'}/>
              }
            </div>
            {user?.firstName}
          </div>
        </div>
        {modalActive && <AddProductModalWindow close={close} onSubmit={onSubmit}/>}
      </div>
    );
  };

export default Header;