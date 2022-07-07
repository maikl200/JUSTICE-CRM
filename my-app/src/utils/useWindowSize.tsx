import {useEffect, useState} from "react";

export const useWindowSize = (() =>
  typeof window !== 'undefined'
    ? () => {
      const [value, setValue] = useState(() => ({
        width: window.innerWidth,
        height: window.innerHeight
      }))

      useEffect(() => {
        const handler = () => {
          setValue({
            width: window.innerWidth,
            height: window.innerHeight
          })
        }
        window.addEventListener('resize', handler)
        return () => {
          window.removeEventListener('resize', handler)
        }
      }, [])
      return value
    } : () => ({width: null, height: null}))()