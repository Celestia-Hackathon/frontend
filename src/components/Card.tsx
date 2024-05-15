import { MarketPlacePostInterface, PostInterface } from "@/utils/types";

import Post from "./Post";
import MarketplacePost from "./MarketplacePost";

export default function Card({post} : {post: PostInterface | MarketPlacePostInterface}) {
    
    const isMarketPlace = !!(post as MarketPlacePostInterface).nft;

    if(!isMarketPlace) 
        return(<Post post={post} />)
    else
        return(<MarketplacePost post={post as MarketPlacePostInterface} />)
}