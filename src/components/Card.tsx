import { NFT } from "@/utils/types";

import Post from "./Post";
import MarketplacePost from "./MarketplacePost";

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

    const isMarketPlace = !!nft;

    if(!isMarketPlace) 
        return(<Post userId={userId} userName={userName} userImg={userImg} postImg={postImg} description={description} likes={likes} />)
    else
        return(<MarketplacePost userId={userId} userName={userName} userImg={userImg} postImg={postImg} description={description} likes={likes} nft={nft} price={price} />)
}