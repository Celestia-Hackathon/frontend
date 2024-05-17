import { MoveLeft, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfileHeader({name} : {name: string}) {
    const navigator = useNavigate();
    const handleClick = () => {
        navigator(-1);
    }
    return (
        <header className='lg:hidden'>
            <div className='w-[100vw] py-2 px-6 grid grid-cols-[1fr_8fr_1fr] items-center'>
                <div className="flex justify-center items-center" onClick={handleClick}>
                    <MoveLeft size={20} color='hsl(var(--foreground))'/>
                </div>
                <div className="">
                    <p className='text-base text-center font-bold my-auto'>{name}</p>
                </div>
                <div className="flex justify-center items-center">
                    <Settings size={20} />
                </div>
            </div>
        </header>
    )
}