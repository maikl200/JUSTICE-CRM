import React, {FC} from 'react';

interface HomeIconProps {
  fill?: string
}

const HomeIcon: FC<HomeIconProps> = ({fill}) => {
  return (
    <svg width="20" height="22" fill='none' viewBox="0 0 20 22" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 8L10 1L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8Z"
        stroke={fill} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 21V11H13V21" stroke={fill} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
};

export default HomeIcon;