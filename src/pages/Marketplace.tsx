import { MarketPlacePost, Post } from "@/utils/types";
// import { Search, X } from "lucide-react";
// import { useState } from "react";
// import Card from "@/components/Card";
// import DummyHeader from "@/components/DummyHeader";
import ProfileFeedMarketplace from "@/components/ProfileFeedMarketplace";
// import * as React from "react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import PostNFT from "@/components/PostNFT";

export default function Marketplace({ posts }: any) {

    const nfts = posts.filter((post: Post | MarketPlacePost) => !!(post as MarketPlacePost).nft);
    // console.log(nfts);

    return (
        <div className="flex w-full lg:justify-between lg:pt-2 mb-16 justify-center items-center outline-none">
            {/* <DummyHeader /> */}
            <div className="flex flex-col items-center w-full">
                <div className="w-[67%] flex flex-col">
                    {/* colocar texto resenha gacha pixel */}
                    <h1 className="text-3xl font-lucky mt-3">Explore new NFTs</h1>
                    <Carousel className="w-full max-w-xs">
                        <CarouselContent>
                            {/* arrumar para mostrar outras nfts */}
                            {nfts.map((nft: any, index: number) => (
                                <CarouselItem key={index}>
                                    <div className="p-1">
                                        <PostNFT nft={nft.nft} />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full p-2 mt-3">
                    {posts.map((post: Post | MarketPlacePost, index: number) => {
                        const isMarketPlacePost = !!(post as MarketPlacePost).nft;
                        if (isMarketPlacePost) {
                            return <ProfileFeedMarketplace key={index} post={post as MarketPlacePost} />
                        }
                    })}
                </div>
            </div>
            {/* <DummyHeader /> */}
        </div>
    );
}
