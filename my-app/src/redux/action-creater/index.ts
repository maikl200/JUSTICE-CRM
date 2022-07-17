import * as AuthActionCreators from '../action/auth'
import * as SellProductActionCreators from '../action/sellProducts'
import * as ProductActionCreators from '../action/products'
import * as UserActionCreators from '../action/user'


export default {
  ...AuthActionCreators,
  ...ProductActionCreators,
  ...SellProductActionCreators,
  ...UserActionCreators
}
