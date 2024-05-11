interface AvatarProps {
    avatar: string,
    profile?: boolean
}

export function Avatar(props : AvatarProps) {
    const {avatar, profile} = props

    return (    
        <div className={`${profile ? 'w-[5.5rem] h-[5.5rem] lg:w-[7rem] lg:h-[7rem]' : 'w-[3.5rem] h-[3.5rem] lg:w-[4.5rem] lg:h-[4.5rem]'} `} >
            <img src={avatar} alt="" className="w-full h-full rounded-full border-[0.2rem] border-"/>
        </div>
    )
}
