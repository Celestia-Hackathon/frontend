import { useState } from "react";
import { MarketPlacePost } from "@/utils/types";
// =======
// import { MarketPlacePost } from "@/utils/types";
// >>>>>>> main
import { getColor } from "@/lib/utils";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import PostNFT from "./PostNFT";

export default function ProfileFeedMarketplace({ post }: { post: MarketPlacePost }) {
// =======
// export default function ProfileFeedMarketplace({post} : {post: MarketPlacePost}) {
// >>>>>>> main
    const { bg } = getColor(post.nft.rarity);

    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    }

    const buyNFT = () => {
        console.log("Buy NFT");
    }

    return (
        <div className='flex flex-col'>
            {/* <Rarity rarity={isMarketPlace && (post as MarketPlacePost).nft.rarity} /> */}
            <div className={`${bg} w-full`}>
                <p className="text-white text-sm font-bold">{post.nft.rarity}</p>
            </div>
            {!imageLoaded && <Skeleton className="w-full group-hover:brightness object-contain aspect-square" />}
            <img
                onLoad={handleImageLoad}
                src={post.nft.nftImg}
                alt=""
                className={`w-full group-hover:brightness object-contain aspect-square ${imageLoaded ? "block" : "hidden"}`}
            />
            <div className="h-full flex flex-col justify-between py-1 lg:py-2 bg-marketplace">
                <div className={' w-full  flex items-center justify-center text-primary-foreground font-bold'}>
                    <p className="text-xs lg:text-base font-bold">{post.nft.name}</p>
                </div>
                <div className="px-2 py-0">
                    <Drawer>
                        <DrawerTrigger className="w-full">
                            <Button variant="buy" className="w-full px-0 py-1 text-xs h-fit leading-none flex gap-1">
                                <ShoppingCart size={16} />
                                <p className="text-xs lg:text-base font-bold">| {post.price + " CAT"}</p>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>
                                    {post.nft.name}
                                </DrawerTitle>
                                <DrawerClose />
                            </DrawerHeader>
                            <DrawerDescription>
                                {/* add stuff here */}
                                <PostNFT nft={post.nft} />
                            </DrawerDescription>
                            <DrawerFooter>
                                <Button onClick={buyNFT} variant="buy" className="w-full px-0 py-1 text-xl h-fit leading-none flex gap-1">
                                    <ShoppingCart size={24} />
                                    <p className="text-xl lg:text-base font-bold">| Buy for {post.price + " CAT"}</p>
                                </Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </div>
    )
}