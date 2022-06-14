import React, {FC, useState} from 'react';

import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {IconType, IconSvg} from "../../assets/icons/IconSvg";

interface Props {
  style?: string,
  title?: string
  justifyContent?: string
  backgroundColor?: string
  color?: string
  backgroundColorHover?: string
  borderRight?: string
  colorHover?: string
  padding?: string
  backgroundColorActive?: string
  borderColorActive?: string
  width: string
  minWidth?: string
  icon?: IconType
  colorTitle?: string
  onMouseEnter?: any
  onMouseLeave?: any
  leftSrc?: string
  rightSrc?: string
  leftAlt?: string
  rightAlt?: string
  onClick?: () => void
  height?: string
  opacity?: string
  disabled?: boolean
}

const ButtonUI: FC<Props> = (
  {
    title,
    disabled,
    justifyContent,
    backgroundColor,
    color,
    colorTitle,
    backgroundColorHover,
    borderRight,
    colorHover,
    padding,
    backgroundColorActive,
    borderColorActive,
    width,
    minWidth,
    icon,
    leftSrc,
    rightSrc,
    rightAlt,
    leftAlt,
    onClick,
    height,
    opacity
  }
) => {

  const [isHover, setIsHover] = useState(false)

  const BootstrapButton = styled(Button)({
    color: `${color}`,
    boxShadow: 'none',
    display: 'flex',
    gap: '11px',
    justifyContent: `${justifyContent}`,
    textTransform: 'none',
    opacity: `${opacity}`,
    fontSize: 14,
    padding: `${padding}`,
    width: `${width}`,
    minWidth: `${minWidth}`,
    height: `${height}`,
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
      <BootstrapButton
        onClick={onClick}
        onMouseEnter={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
        type='submit'
        disabled={disabled}
        variant="contained"
        disableRipple
      >
        {leftSrc && <img src={leftSrc} alt={leftAlt}/>}
        {icon && <IconSvg type={icon}/>}
        {title && <span style={{color: colorTitle}}>{title}</span>}
        {rightSrc && <img src={rightSrc} alt={rightAlt}/>}
      </BootstrapButton>
    </>
  );
};

export default ButtonUI;