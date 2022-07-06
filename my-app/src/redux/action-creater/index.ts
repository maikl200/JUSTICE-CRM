import * as ProductActionCreators from './product'
import * as SellProductActionCreators from './sellProduct'
import * as AuthActionCreators from './auth'
import * as UserActionCreators from './user'


export default {
  ...ProductActionCreators,
  ...SellProductActionCreators,
  ...AuthActionCreators,
  ...UserActionCreators
}
