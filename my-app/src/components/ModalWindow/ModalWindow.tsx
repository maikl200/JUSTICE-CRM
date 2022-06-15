import React, {FC} from 'react';

import style from './modalWindow.module.scss'
import cross from '../../assets/Cross.svg'


interface ModalCreatingProductProps {
  setModalActive: (isActive: boolean) => void
  children: React.ReactNode
  title: string
  onBlur?: (e: React.FocusEvent<HTMLFormElement>) => void
}

const ModalWindow: FC<ModalCreatingProductProps> = ({setModalActive, children, title, onBlur}) => {
  return (
    <>
      <div className={style.modal}>
        <div className={style.modal_wrapper}>
          <div className={style.modal_wrapper_modalContent}>
            <span className={style.modal_wrapper_modalContent_title}>{title}</span>
            <form className={style.modal_wrapper_modalContent_form} onBlur={onBlur}>
              {children}
            </form>
          </div>
          <div className={style.modal_wrapper_close}>
            <img onClick={() => setModalActive(false)} src={cross} alt='crossIcon'/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalWindow;