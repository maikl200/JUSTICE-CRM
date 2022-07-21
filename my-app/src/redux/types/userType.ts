import {TypeUser} from "../../types/types";

export type UserStatus = 'loading' | 'success' | 'error' | 'none'

export type UserState = {
  user: TypeUser,
  status: UserStatus
}