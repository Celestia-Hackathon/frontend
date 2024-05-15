import { MarketPlacePostInterface } from "@/utils/types";
import { getColor } from "@/lib/utils";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

export default function ProfileFeedMarketplace({post} : {post: MarketPlacePostInterface}) {
    const { bg } = getColor(post.nft.rarity);
    
    return (
        <div className='flex flex-col'>
            {/* <Rarity rarity={isMarketPlace && (post as MarketPlacePostInterface).nft.rarity} /> */}
            <div className={`${bg} w-full`}>
                <p className="text-white text-sm font-bold">{post.nft.rarity}</p>
            </div>
            <img src={post.nft.nftImg} alt="" className={'w-full aspect-[1/1.6] object-cover group-hover:brightness object-contain aspect-square'} />
            <div className="h-full flex flex-col justify-between py-1 lg:py-2 bg-marketplace">
                <div className={' w-full  flex items-center justify-center text-primary-foreground font-bold'}>
                    <p className="text-xs lg:text-base font-bold">{post.nft.name}</p>
                </div>
                <div className="px-2 py-0">
                    <Button variant="buy" className="w-full px-0 py-1 text-xs h-fit leading-none flex gap-1">
                        <ShoppingCart size={16}/>
                        <p className="text-xs lg:text-base font-bold">| {post.price + " STR"}</p>
                    </Button>
                </div>
            </div>
        </div>
    )
}