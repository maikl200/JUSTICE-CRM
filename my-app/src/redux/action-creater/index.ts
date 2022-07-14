import * as ProductActionCreators from '../action/auth'
import * as SellProductActionCreators from './sellProduct'
import * as AuthActionCreators from './auth'
import * as UserActionCreators from './user'


export default {
  ...ProductActionCreators,
  ...SellProductActionCreators,
  ...AuthActionCreators,
  ...UserActionCreators
}
