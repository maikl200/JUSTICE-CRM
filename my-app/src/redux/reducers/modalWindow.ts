import {ModalAction, ModalActionEnum} from "../types/modalWindow";

const initialState = {
  editModalActive: false,
  sellModalActive: false,
  addProductModalActive: false
}

export const modalWindowReducer = (state = initialState, action: ModalAction) => {
  switch (action.type) {
    case ModalActionEnum.MODAL_ACTIVE:
      console.log(action.payload)
      return {
        ...state,
        addProductModalActive: false
      }
    case ModalActionEnum.EDIT_MODAL_ACTIVE:
      return {...state, editModalActive: action.payload}
    case ModalActionEnum.SELL_MODAL_ACTIVE:
      return {...state, sellModalActive: action.payload}
    default:
      return state
  }
}
