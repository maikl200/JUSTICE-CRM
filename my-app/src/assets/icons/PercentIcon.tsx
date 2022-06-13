import React, {FC} from 'react';

interface PercentIconProps {
  fill?: string
}

const PercentIcon: FC<PercentIconProps> = ({fill}) => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill={fill ? fill : 'none'} xmlns="http://www.w3.org/2000/svg">
      <path d="M16 2L2 16" stroke="#a9aeb3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path
        d="M3.5 6C4.88071 6 6 4.88071 6 3.5C6 2.11929 4.88071 1 3.5 1C2.11929 1 1 2.11929 1 3.5C1 4.88071 2.11929 6 3.5 6Z"
        stroke="#a9aeb3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path
        d="M14.5 17C15.8807 17 17 15.8807 17 14.5C17 13.1193 15.8807 12 14.5 12C13.1193 12 12 13.1193 12 14.5C12 15.8807 13.1193 17 14.5 17Z"
        stroke="#a9aeb3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  );
};

export default PercentIcon;