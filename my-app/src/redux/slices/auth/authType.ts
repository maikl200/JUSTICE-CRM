import {TypeUser} from "../../../types/types";

export type AuthStatus = 'loading' | 'success' | 'error' | 'none'

export type AuthState = {
  user: TypeUser,
  statusReg: AuthStatus
  statusLogIn: AuthStatus
}