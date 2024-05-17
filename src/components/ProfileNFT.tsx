import { NFT } from "@/utils/types";
import Rarity from "./Rarity";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";

export default function ProfileNFT({ nft }: { nft: NFT }) {
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    }

    return (
        <div className='relative group'>
            <Rarity rarity={nft.rarity} />
            {!imageLoaded && <Skeleton className="w-full aspect-square object-cover group-hover:brightness" />}
            <img src={nft.nftImg} alt={nft.name} onLoad={handleImageLoad} className={`w-full aspect-square object-cover group-hover:brightness ${imageLoaded ? "block" : "hidden"}`} />
            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100'>
                <p className='text-primary'>{nft.name}</p>
                {/* <a
                    href={`https://opcelestia-raspberry.gelatoscout.com/address/${nft.address}`}
                    className='text-primary'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    {nft.address.slice(0, 6)}...{nft.address.slice(-4)}
                </a> */}
            </div>
        </div>
    )
}