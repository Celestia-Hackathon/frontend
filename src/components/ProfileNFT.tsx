import { NFT } from "@/utils/types";
import Rarity from "./Rarity";

export default function ProfileNFT({nft} : {nft: NFT}) {
    return (
        <div className='relative group'>
            <Rarity rarity={nft.rarity} />
            <img src={nft.nftImg} alt="" className='w-full aspect-square object-cover group-hover:brightness' />
            <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100'>
                <p className='text-primary'>{nft.name}</p>
            </div>
        </div>
    )
}