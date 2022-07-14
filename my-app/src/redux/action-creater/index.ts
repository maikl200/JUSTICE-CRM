import * as AuthActionCreators from '../action/auth'
import * as SellProductActionCreators from './sellProduct'
import * as ProductActionCreators from '../action/products'
import * as UserActionCreators from './user'


export default {
  ...AuthActionCreators,
  ...ProductActionCreators,
  ...SellProductActionCreators,
  ...UserActionCreators
}
