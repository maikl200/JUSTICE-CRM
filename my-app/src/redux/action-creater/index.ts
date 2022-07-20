import * as AuthActionCreators from '../slices/authSlice'
import * as SellProductActionCreators from '../slices/sellProductSlice'
import * as ProductActionCreators from '../slices/productSlice'
import * as UserActionCreators from '../slices/userSlice'


export default {
  ...AuthActionCreators,
  ...ProductActionCreators,
  ...SellProductActionCreators,
  ...UserActionCreators
}
