import { MoveLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfileHeader({username} : {username: string}) {
    const navigator = useNavigate();
    const handleClick = () => {
        navigator('/');
    }
    return (
        <header className='lg:hidden'>
            <div className='w-[100vw] py-2 px-6 grid grid-cols-[1fr_8fr_1fr] items-center'>
                <div className="" onClick={handleClick}>
                    <MoveLeft className='my-auto mx-auto' color='hsl(var(--foreground))'/>
                </div>
                <div className="">
                    <p className='text-xl text-center font-bold my-auto'>{username}</p>
                </div>
                <div className="">
                    <Settings className='w-[3rem]' />
                </div>
            </div>
        </header>
    )
}