import NavButton from '@/components/NavButton';
import { ModeToggle } from '@/components/mode-toggle';
import Logo from "@/assets/logo.svg";

import { Home, CircleUser, ShoppingCart, ScrollText, PlusCircleIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DummyHeader() {
    const navigator = useNavigate();

    return (
        <div className="hidden lg:invisible lg:inline h-16 bottom-0 lg:left-0 z-20 lg:shadow-2xl lg:backdrop-blur-md lg:bg-background/50 lg:w-fit lg:top-0 lg:h-[100vh] bg-background flex justify-center lg:justify-normal">
            <div className="w-full bg-transparent flex flex-row justify-center items-center lg:px-4 lg:flex-col lg:justify-between lg:py-10 h-full">
                <div className="flex flex-col items-center">
                    <img className="cursor-pointer w-1/2 py-2 hidden lg:inline-block" src={Logo} alt="" onClick={() => navigator('/')}/>
                    <p className="cursor-pointer text-primary mx-2 hidden lg:inline-block" onClick={() => navigator('/')}>ChatSpace</p>
                </div>
                <div className="items-start w-full hidden lg:flex lg:flex-col">
                    <NavButton to='/'><Home size={20}/>Home</NavButton>
                    <NavButton to="/marketplace"><ShoppingCart size={20}/>Marketplace</NavButton>
                    <NavButton to='/new'><PlusCircleIcon size={20}/>New post</NavButton>
                    <NavButton to="/wallets"><ScrollText size={20}/>Quests</NavButton>
                    <NavButton to="/profile/1"><CircleUser size={20}/>Profile</NavButton>
                </div>

                <div className="flex flex-row justify-evenly w-full px-4 lg:hidden">
                    <NavButton to='/'><Home size={24}/></NavButton>
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