import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';

function Hamburger({ onClick, size }) {
  const iconSize = '30px' || size;
  return <GiHamburgerMenu onClick={onClick} size={iconSize} />;
}

export default Hamburger;
