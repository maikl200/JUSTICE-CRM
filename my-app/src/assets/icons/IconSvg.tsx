import React from 'react';
import {DocIcon, HomeIcon, LogOutIcon, PercentIcon, UserIcon} from "../index";

interface IconProps {
  type: IconType
}

export type IconType = 'home' | 'document' | 'logout' | 'percent' | 'user'

export const IconSvg: React.FC<IconProps> = ({type}) => {

  const icon = {
    home: <HomeIcon/>,
    document: <DocIcon/>,
    logout: <LogOutIcon/>,
    percent: <PercentIcon/>,
    user: <UserIcon/>,
  }

  return icon[type];
};