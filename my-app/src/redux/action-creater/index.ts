import * as AuthActionCreators from '../slices/auth/authSlice'
import * as ProductActionCreators from '../slices/product/productSlice'
import * as UserActionCreators from '../slices/user/userSlice'


export default {
  ...AuthActionCreators,
  ...ProductActionCreators,
  ...UserActionCreators
}
