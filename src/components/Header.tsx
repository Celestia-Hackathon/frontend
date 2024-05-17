import NavButton from '@/components/NavButton';
import Logo from "@/assets/logo.svg";

import { Home, CircleUser, Store, ScrollText, PlusCircleIcon, Settings, Compass } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import D20 from './ui/d20';
import { User } from '@/utils/types';

export function Header() {
    const navigator = useNavigate();

    const loggedInUser : User = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="fixed w-full h-16 bottom-0 lg:left-0 z-20 lg:backdrop-blur-md lg:bg-background/50 lg:w-fit lg:top-0 lg:h-[100vh] bg-background flex justify-center lg:justify-normal">
            <div className="w-full bg-transparent flex flex-row justify-center items-center lg:px-4 lg:flex-col lg:justify-between lg:py-2 h-full">
                <div className="flex flex-col gap-2 items-center">
                    <img className="cursor-pointer w-1/2 hidden lg:inline-block" src={Logo} alt="" onClick={() => navigator('/feed')}/>
                    <div className="pt-6 items-start w-full hidden lg:flex lg:flex-col">
                        <NavButton to='/feed'><Home size={20}/><span className='text-lg'>Home</span></NavButton>
                        <NavButton to="/explore/mobile"><Compass size={20}/><span className='text-lg'>Explore</span></NavButton>
                        <NavButton to="/explore/desktop"><Store size={20}/><span className='text-lg'>Marketplace</span></NavButton>
                        <NavButton to='/new'><PlusCircleIcon size={20}/><span className='text-lg'>New post</span></NavButton>
                        <NavButton to="/quests"><ScrollText size={20}/><span className='text-lg'>Quests</span></NavButton>
                        <NavButton to="/gacha"><D20 size={20} isSelected={useLocation().pathname.startsWith('/gacha')}/><span className='text-lg'>Gacha</span></NavButton>
                        <NavButton to={`/profile/${loggedInUser.userId}`}><CircleUser size={20}/><span className='text-lg'>Profile</span></NavButton>
                        <NavButton to="/settings"><Settings size={20}/><span className='text-lg'>Settings</span></NavButton>
                    </div>
                </div>

                <div className="flex flex-row justify-evenly w-full px-4 lg:hidden">
                    <NavButton to='/feed'><Home size={24}/></NavButton>
                    {/* <NavButton to="/marketplace"><Store size={24}/></NavButton> */}
                    <NavButton to="/explore/mobile"><Compass size={24}/></NavButton>
                    <NavButton to="/gacha"><D20 size={24} isSelected={useLocation().pathname.startsWith('/gacha')}/></NavButton>
                    <NavButton to="/quests"><ScrollText size={24}/></NavButton>
                    <NavButton to={`/profile/${loggedInUser.userId}`}><CircleUser size={24}/></NavButton>
                </div>
            </div>
        </div>
    )
}