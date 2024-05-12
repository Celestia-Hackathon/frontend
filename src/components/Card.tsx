import { AvatarPost } from "@/components/AvatarPost";
import { NFT } from "@/utils/types";

import { MessageSquare, HeartIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CardProps {
    userId: string;
    userName: string;
    userImg: string;
    postImg: string;
    description: string;
    likes: string[];
    nft?: NFT;
    price?: number;
}

export default function Card({
    userId, // used to navigate to the user profile
    userName,
    userImg,
    postImg,
    description,
    likes,
    nft,
    price
} : CardProps) {
    const navigator = useNavigate();

    const isMarketPlace = !!nft

    return (
        <div className="w-full h-full border-b items-start justify-center">
            <div className="rounded-lg py-4 flex flex-col">
                <div className="px-2 flex flex-row justify-between items-center">
                    <div onClick={() => navigator(`/profile/${userId}`)} className="mb-2">
                        <AvatarPost avatar={userImg} username={userName} />
                    </div>
                </div>
                <p className="px-2 mb-3 font-bold text-foreground text-xs text-left lg:text-sm">- {description}</p>
                <div className="bg-primary cursor-pointer overflow-hidden">
                    {!isMarketPlace &&  
                        <img
                            src={postImg}
                            alt=""
                            className="w-full aspect-square"
                        />
                    }
                    {isMarketPlace &&
                        <div className="flex flex-col items-center justify-center">
                            <img
                                src={nft.nftImg}
                                alt=""
                                className="w-full aspect-square"
                            />
                            <div className="flex flex-row bg-muted items-center justify-between w-full p-2">
                                <p className="text-primary">{nft.name}</p>
                                <p className="text-primary">${price}</p>
                            </div>
                        </div>
                    }
                </div>
                <div className="w-full p-2 bg-secondary rounded-b-lg">
                    <div className="h-full">
                        <div className="flex items-center space-x-2 text-white">
                            <MessageSquare color="hsl(var(--primary))"/>
                            <HeartIcon color="hsl(var(--primary))"/>   
                        </div>
                        <p className="text-left mt-2">{likes.length} Likes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}