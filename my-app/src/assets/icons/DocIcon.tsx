import React, {FC} from 'react';

interface DocIconProps {
  fill?: string
}

const DocIcon: FC<DocIconProps> = ({fill}) => {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill={fill ? fill : 'none'} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V19C1 19.5304 1.21071 20.0391 1.58579 20.4142C1.96086 20.7893 2.46957 21 3 21H15C15.5304 21 16.0391 20.7893 16.4142 20.4142C16.7893 20.0391 17 19.5304 17 19V7L11 1Z"
        stroke="#a9aeb3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 1V7H17" stroke="#a9aeb3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 12H5" stroke="#a9aeb3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 16H5" stroke="#a9aeb3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 8H6H5" stroke="#a9aeb3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
};

export default DocIcon;