import React from 'react';

import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {IconSvg} from "../../assets/icons/IconSvg";

interface ButtonMuiStyleProps {
  width?: string
  jc?: string
  coloring?: string
  mw?: string
  fontWeight?: string
  bch?: string
  border?: string
  height?: string
  bchactive?: string
  br?: string
  ch?: string
  padding?: string
  direction?: string
  bc?: string
}

type ButtonType = "submit" | "button";

interface ButtonMuiProps extends ButtonMuiStyleProps {
  icon?: 'home' | 'document' | 'logout' | 'percent' | 'user';
  onClick?: () => void;
  disabled?: boolean;
  padding?: string
  br?: string
  ch?: string
  leftSrc?: string
  coloring?: string
  bc?: string
  bchactive?: string
  leftAlt?: string
  title?: string | boolean
  height?: string
  colorTitle?: string
  jc?: string
  mw?: string
  width?: string
  bch?: string
  rightAlt?: string
  rightSrc?: string
  type?: ButtonType;
  alt?: string;
}

const BootstrapButton = styled(Button)<ButtonMuiStyleProps>`
  width: ${({width}) => width};
  display: flex;
  justify-content: ${({jc}) => jc};
  background-color: ${({bc}) => bc};
  box-shadow: none;
  min-width: ${({mw}) => mw};
  gap: 11px;
  height: ${({height}) => height};
  flex-direction: ${({direction}) => direction};
  border: ${({border}) => border};
  color: ${({coloring}) => coloring};
  text-transform: none;
  overflow: hidden;
  line-height: 1.5px;
  font-size: 14px;
  border-radius: 3px;
  height: ${({height}) => height};
  padding: ${({padding}) => padding};
  font-style: normal;
  font-weight: ${({fontWeight}) => fontWeight};
  font-family: "Inter", sans-serif;

  :disabled {
    background: #b6b6b6;
    color: #000000;
  }

  :active {
    background-color: ${({bchactive}) => bchactive};
  }

  :hover {
    text-decoration: none;
    box-shadow: none;
    border-right: ${({br}) => br};
    color: ${({ch}) => ch};
    background-color: ${({bch}) => bch};
  }

,`

const ButtonUI =
  ({
     type,
     leftSrc,
     rightSrc,
     padding,
     rightAlt,
     bch,
     jc,
     title,
     mw,
     width,
     height,
     ch,
     disabled,
     coloring,
     br,
     bc,
     bchactive,
     leftAlt,
     icon,
     colorTitle,
     onClick,
   }: ButtonMuiProps) => {

    return (
      <>
        <BootstrapButton
          onClick={onClick}
          type={type}
          variant="contained"
          disabled={disabled}
          bchactive={bchactive}
          bch={bch}
          jc={jc}
          padding={padding}
          mw={mw}
          coloring={coloring}
          br={br}
          ch={ch}
          disableRipple
          height={height}
          bc={bc}
          width={width}
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