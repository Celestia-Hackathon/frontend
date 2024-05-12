import NavButton from '@/components/NavButton';
import { ModeToggle } from '@/components/mode-toggle';
import Logo from "@/assets/logo.svg";

import { Home, CircleUser, ShoppingCart, ScrollText, PlusCircleIcon, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Header() {
    const navigator = useNavigate();

    return (
        <div className="fixed w-full h-16 bottom-0 lg:left-0 z-20 lg:backdrop-blur-md lg:bg-background/50 lg:w-fit lg:top-0 lg:h-[100vh] bg-background flex justify-center lg:justify-normal">
            <div className="w-full bg-transparent flex flex-row justify-center items-center lg:px-4 lg:flex-col lg:justify-between lg:py-2 h-full">
                <div className="flex flex-col gap-2 items-center">
                    <img className="cursor-pointer w-1/2 hidden lg:inline-block" src={Logo} alt="" onClick={() => navigator('/')}/>
                    <p className="cursor-pointer text-primary mx-2 hidden lg:inline-block" onClick={() => navigator('/')}>ChatSpace</p>
                    <div className="pt-6 items-start w-full hidden lg:flex lg:flex-col">
                        <NavButton to='/feed'><Home size={20}/><span className='text-lg'>Home</span></NavButton>
                        <NavButton to="/marketplace"><ShoppingCart size={20}/><span className='text-lg'>Marketplace</span></NavButton>
                        <NavButton to='/new'><PlusCircleIcon size={20}/><span className='text-lg'>New post</span></NavButton>
                        <NavButton to="/wallets"><ScrollText size={20}/><span className='text-lg'>Quests</span></NavButton>
                        <NavButton to="/profile/1"><CircleUser size={20}/><span className='text-lg'>Profile</span></NavButton>
                        <NavButton to="/settings"><Settings size={20}/><span className='text-lg'>Settings</span></NavButton>
                    </div>
                </div>

                <div className="flex flex-row justify-evenly w-full px-4 lg:hidden">
                    <NavButton to='/feed'><Home size={24}/></NavButton>
                    <NavButton to="/marketplace"><ShoppingCart size={24}/></NavButton>
                    <NavButton to='/new'><PlusCircleIcon size={24}/></NavButton>
                    <NavButton to="/wallets"><ScrollText size={24}/></NavButton>
                    <NavButton to="/profile/1"><CircleUser size={24}/></NavButton>
                </div>

                <div className="flex flex-col items-center justify-center hidden lg:flex">
                    <ModeToggle/>
                </div>
            </div>
        </div>
    )
}