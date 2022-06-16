import React, {FC, FormEvent} from 'react';

import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {IconSvg} from "../../assets/icons/IconSvg";

const BootstrapButton = styled(Button)`
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

const ButtonUI = (props) => {
  const {
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
    leftAlt,
    icon,
    colorTitle,
    onClick,
  } = props;

  return (
    <>
      <BootstrapButton
        onClick={onClick}
        type={type}
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