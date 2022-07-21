import React, {FC} from 'react';

import style from './modalWindow.module.scss'
import cross from '../../assets/Cross.svg'

interface ModalCreatingProductProps {
  children: React.ReactNode
  title: string
  onSubmit?: React.FormEventHandler<HTMLFormElement>
  onBlur?: (e: React.FocusEvent<HTMLFormElement>) => void
  onClose?: () => void
}

const ModalWindow: FC<ModalCreatingProductProps> = ({onClose, children, title, onBlur, onSubmit}) => {
  return (
    <>
      <div className={style.modal} onClick={onClose}>
        <div className={style.modal_wrapper} onClick={(e) => e.stopPropagation()}>
          <div className={style.modal_wrapper_modalContent}>
            <span className={style.modal_wrapper_modalContent_title}>{title}</span>
            <form className={style.modal_wrapper_modalContent_form} onSubmit={onSubmit} onBlur={onBlur}>
              {children}
            </form>
          </div>
          <div className={style.modal_wrapper_close}>
            <img onClick={onClose} src={cross} alt='crossIcon'/>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalWindow;