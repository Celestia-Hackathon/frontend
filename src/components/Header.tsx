import { Button } from '@/components/ui/button';
import { menuOptions } from "@/utils/menuOptions";
import NavButton from '@/components/NavButton';
import { ModeToggle } from '@/components/mode-toggle';
import Logo from "@/assets/logo.svg";

import { Home, CircleUser, ShoppingCart, ScrollText, PlusCircleIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Header() {
    const navigator = useNavigate();

    return (
        <div className="fixed w-full h-16 bottom-0 lg:top-0 z-20 lg:shadow-2xl lg:backdrop-blur-md lg:bg-background/50 bg-background flex flex-col justify-center">
            <div className="w-full bg-transparent flex flex-row justify-center items-center lg:px-12 h-full">
                <img className="cursor-pointer h-[100%] py-2 hidden lg:inline-block" src={Logo} alt="" onClick={() => navigator('/')}/>
                <p className="cursor-pointer text-primary mx-2 hidden lg:inline-block" onClick={() => navigator('/')}>ChatSpace</p>
                <div className="flex-1 flex flex-row h-[100%] justify-center items-center hidden lg:flex">
                    {menuOptions.map((option, index) => (
                        <NavButton key={index} to={option.to}>{option.name}</NavButton>
                    ))}
                </div>

                <div className="flex flex-row justify-evenly w-full px-4 lg:hidden">
                    <NavButton to='/'><Home size={24}/></NavButton>
                    <NavButton to="/marketplace"><ShoppingCart size={24}/></NavButton>
                    <NavButton to='/new'><PlusCircleIcon size={24}/></NavButton>
                    <NavButton to="/wallets"><ScrollText size={24}/></NavButton>
                    <NavButton to="/profile/1"><CircleUser size={24}/></NavButton>
                </div>


                <div className="h-[100%] flex flex-row justify-center items-center lg:space-x-6">
                    <div className="flex flex-col items-center justify-center h-[100%] hidden lg:flex">
                        <ModeToggle/>
                    </div>
                </div>           
            </div>
        </div>
    )
}