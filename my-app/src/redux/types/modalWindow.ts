export enum ModalActionEnum {
  MODAL_ACTIVE = 'MODAL_ACTIVE',
  EDIT_MODAL_ACTIVE = 'EDIT_MODAL_ACTIVE',
  SELL_MODAL_ACTIVE = 'SELL_MODAL_ACTIVE',
}

export interface modalActive {
  type: ModalActionEnum.MODAL_ACTIVE
  payload: boolean
}

export interface editModalActive {
  type: ModalActionEnum.EDIT_MODAL_ACTIVE
  payload: boolean
}

export interface sellModalActive {
  type: ModalActionEnum.SELL_MODAL_ACTIVE
  payload: boolean
}

export type ModalAction =
  modalActive
  | editModalActive
  | sellModalActive
