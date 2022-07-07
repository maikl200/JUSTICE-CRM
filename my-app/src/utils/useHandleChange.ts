import React, {ChangeEvent, useState} from "react";

export function useHandleChange<T>(initialState: T): [formEdit: T, changeForm: (e: ChangeEvent<HTMLInputElement>) => void, setFormEdit: React.Dispatch<React.SetStateAction<T>>] {
  const [formEdit, setFormEdit] = useState(initialState as T)

  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value
    })
  }

  return [formEdit, changeForm, setFormEdit]
}
