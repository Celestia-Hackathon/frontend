// import { Post } from "@/utils/types";
import { Post } from "@/utils/types";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function ProfileFeedPost({ post }: { post: Post }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    }

// =======
// export default function ProfileFeedPost({post} : {post: Post}) {
// >>>>>>> main
    return (
        <div className='relative group'>
            {/* <Rarity rarity={isMarketPlace && (post as MarketPlacePost).nft.rarity} /> */}
            {!imageLoaded && <Skeleton className="w-full aspect-[1/1.6] object-cover group-hover:brightness" />}
            <img onLoad={handleImageLoad} src={post.postImg} alt="" className={`w-full aspect-[1/1.6] object-cover group-hover:brightness ${imageLoaded ? "block" : "hidden"}`} />
            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100'>
                <Heart color='hsl(var(--foreground))' />
                <p className='text-white ml-1'>{post.likes.length}</p>
            </div>
        </div>
    )
}