import { Badge } from "@/utils/types";

export default function ProfileBadge({badge} : {badge: Badge}) {
    return (
        <div className='flex justify-between items-center px-4 col-span-3'>
            <img src={badge.badgeImg} alt="" className='w-1/4 aspect-square' />
            <div className="w-full">
                <p className='text-primary text-sm font-bold'>{badge.name}</p>
                <p className="text-primary text-sm">{badge.description}</p>
            </div>
        </div>
    )
}