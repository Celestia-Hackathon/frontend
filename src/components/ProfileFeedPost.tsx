import { Post } from "@/utils/types";
import { Heart } from "lucide-react";

export default function ProfileFeedPost({post} : {post: Post}) {
    return (
        <div className='relative group'>
            {/* <Rarity rarity={isMarketPlace && (post as MarketPlacePost).nft.rarity} /> */}
            <img src={post.postImg} alt="" className={'w-full aspect-[1/1.6] object-cover group-hover:brightness'} />
            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100'>
                <Heart color='hsl(var(--foreground))' />
                <p className='text-white ml-1'>{post.likes.length}</p>
            </div>
        </div>
    )
}