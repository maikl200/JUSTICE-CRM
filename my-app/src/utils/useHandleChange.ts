import React, {useState} from "react";

export const useHandleChange = () => {
  const [formEdit, setFormEdit] = useState<any>({})

  const changeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value
    })
  }

  return [formEdit, changeForm]
}
