import React, {FC} from 'react';

import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';

interface Props {
    title: string
}

const ButtonUI: FC<Props> = ({title}) => {

    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 14,
        padding: '6px 12px',
        height: '52px',
        borderRadius: '3px',
        lineHeight: 1.5,
        backgroundColor: '#5382E7',
        borderColor: '#0063cc',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    });

    return (
        <>
            <BootstrapButton type='submit' variant="contained" disableRipple>
                {title}
            </BootstrapButton>
        </>
    );
};

export default ButtonUI;