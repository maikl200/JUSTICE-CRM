import React, {FC, FormEvent} from 'react';

import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {IconSvg} from "../../assets/icons/IconSvg";

interface ButtonMuiStyleProps {
  direction?: string;
  border?: string;
  width?: string;
  bc?: string //  background-color
  jc?: string //  justify-content
  textTransform?: string;
  color?: string
  type?: string
  mw?: string // min-width
  ch?: string // color:hover
  icon?: string
  coloring?: string
  bch?: string // background-color:hover
  height?: string;
  br?: string // border-right
  padding?: string;
  fontWeight?: string;
}

interface Props extends ButtonMuiStyleProps {
  title?: string
  leftSrc?: string
  coloring?: string
  colorTitle?: string
  mw?: string
  br?: string // border-right
  color?: string
  padding?: string
  bch?: string
  icon?: string
  height?: string
  onClick?: (e: FormEvent) => void
  width?: string
  disabled?: boolean
  type?: string
  ch?: string // color:hover
  rightAlt?: string
  rightSrc?: string
  leftAlt?: string
  alt?: string
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

  :hover {
    box-shadow: none;
    border-right: ${({br}) => br};
    color: ${({ch}) => ch};
    background-color: ${({bch}) => bch};
  }

,`

const ButtonUI: FC<Props> = (props) => {
  const {
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
    leftAlt,
    icon,
    colorTitle,
    onClick,
  } = props;

  return (
    <>
      <BootstrapButton
        onClick={onClick}
        type='submit'
        variant="contained"
        disabled={disabled}
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
        {/*@ts-ignore*/}
        {icon && <IconSvg type={icon}/>}
        {title && <span style={{color: colorTitle}}>{title}</span>}
        {rightSrc && <img src={rightSrc} alt={rightAlt}/>}
      </BootstrapButton>
    </>
  );
};

export default ButtonUI;