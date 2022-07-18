import * as AuthActionCreators from '../action/auth'
import * as SellProductActionCreators from '../action/sellProducts'
import * as ProductActionCreators from '../action/products'
import * as UserActionCreators from '../action/user'
import * as ModalActionCreators from '../action/modalWindow'


export default {
  ...ModalActionCreators,
  ...AuthActionCreators,
  ...ProductActionCreators,
  ...SellProductActionCreators,
  ...UserActionCreators
}
