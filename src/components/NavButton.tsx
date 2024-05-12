import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface NavLinkButtonProps {
  to: string;
  children: React.ReactNode;
}

const NavButton: React.FC<NavLinkButtonProps> = ({ to, children }) => {

  const navigator = useNavigate();

  const windowWidth = window.innerWidth;

  const handleClick = () => {
    navigator(to);
  };
  
  const location = useLocation();
  const isActive = location.pathname.startsWith(to);

  return (
    <Button variant={`${windowWidth > 1280 ? "desktop" : "mobile"}`} className={`h-[100%] relative  group ${isActive ? "text-accent font-bold glow-bottom-border-fixed" : "" }`} onClick={handleClick}><div className='flex items-center gap-2'>{children}</div></Button>
  );
};

export default NavButton;