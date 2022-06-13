import React from 'react';
import HomeIcon from "./HomeIcon";
import DocIcon from "./DocIcon";
import LogOutIcon from "./LogOutIcon";
import PercentIcon from "./PercentIcon";
import UserIcon from "./UserIcon";

interface IconProps {
  type: IconType
  fill?: string
}

export type IconType = 'home' | 'document' | 'logout' | 'percent' | 'user'

const IconSvg: React.FC<IconProps> = ({type, fill}) => {

  const icon = {
    home: <HomeIcon fill={fill}/>,
    document: <DocIcon fill={fill}/>,
    logout: <LogOutIcon fill={fill}/>,
    percent: <PercentIcon fill={fill}/>,
    user: <UserIcon fill={fill}/>
  }

  return icon[type];
};

export default IconSvg