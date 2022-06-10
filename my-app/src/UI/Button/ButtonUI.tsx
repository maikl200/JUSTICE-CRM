import React, {FC} from 'react';

import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';

interface Props {
  title: string
  src: string
  alt: string
  justifyContent: string
  backgroundColor: string
  color: string
  backgroundColorHover: string
  borderRight: string
  colorHover: string
  padding: string
  backgroundColorActive: string
  borderColorActive: string
  width: string
}

const ButtonUI: FC<Props> = (
  {
    title,
    src,
    alt,
    justifyContent,
    backgroundColor,
    color,
    backgroundColorHover,
    borderRight,
    colorHover,
    padding,
    backgroundColorActive,
    borderColorActive,
    width
  }
) => {

  const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    display: 'flex',
    gap: '11px',
    justifyContent: `${justifyContent}`,
    textTransform: 'none',
    color: `${color}`,
    fontSize: 14,
    padding: `${padding}`,
    width: `${width}`,
    height: '56px',
    borderRadius: '3px',
    lineHeight: 1.5,
    backgroundColor: `${backgroundColor}`,
    borderColor: '#0063cc',
    '&:hover': {
      backgroundColor: `${backgroundColorHover}`,
      borderRight: `${borderRight}`,
      borderColor: '#0062cc',
      color: `${colorHover}`,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: `${backgroundColorActive}`,
      borderColor: `${borderColorActive}`,
    },
    '&:focus': {
      backgroundColor: `${backgroundColorHover}`,
      borderRight: `${borderRight}`,
      borderColor: '#0062cc',
      color: `${colorHover}`,
      boxShadow: 'none',
    },
  });

  return (
    <>
      <BootstrapButton type='submit' variant="contained" disableRipple>
        <img src={src} alt={alt}/> {title}
      </BootstrapButton>
    </>
  );
};

export default ButtonUI;