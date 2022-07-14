import {TypeUser} from "../../types/types";
import {UserActionEnum} from "../types/currentUser";

export const fetchUsers = () => {
  return {
    type: UserActionEnum.SET_USER,
  }
}

