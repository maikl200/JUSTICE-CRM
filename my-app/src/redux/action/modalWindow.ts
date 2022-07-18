import {ModalActionEnum} from "../types/modalWindow";

export const modalWindow = (payload: boolean) => {
  return {
    type: ModalActionEnum.MODAL_ACTIVE,
    payload
  }
}

export const editModalWindow = (payload: boolean) => {
  return {
    type: ModalActionEnum.EDIT_MODAL_ACTIVE,
    payload
  }
}

export const sellModalWindow = (payload: boolean) => {
  return {
    type: ModalActionEnum.SELL_MODAL_ACTIVE,
    payload
  }
}
