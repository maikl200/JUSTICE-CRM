import React, {FC} from 'react';

import style from './input.module.scss'

interface Props {
    title?: string
    placeholder: string
    type: string
    width: string
}

const Input: FC<Props> = (
    {
        title,
        placeholder,
        type,
        width
    }
) => {
    return (
        <>
            <label className={style.label}>
                {title}
                <input
                    style={{width: width}}
                    type={type}
                    placeholder={placeholder}
                />
            </label>
        </>
    );
};

export default Input;