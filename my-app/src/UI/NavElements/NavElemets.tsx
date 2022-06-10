import React, {FC} from 'react';

import style from './navElements.module.scss'

interface Props {
    src: string
    alt: string
    title: string
}

const NavElemets: FC<Props> = (
    {
        src,
        alt,
        title
    }
) => {
    return (
        <div className={style.blockElements}>
            <img src={src} alt={alt}/>
            <span>{title}</span>
        </div>
    );
};

export default NavElemets;