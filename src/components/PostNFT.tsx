import { getColor } from "@/lib/utils";
import { NFT } from "@/utils/types";
import { useEffect, useState } from "react";

export default function PostNFT({nft} : {nft: NFT}) {
    const [color, setColor] = useState({text: "", border: "", bg: ""});

    useEffect(() => {
        setColor(getColor(nft.rarity));
    }, [])

    return (
        <div className="py-[7.5%] flex flex-col items-center justify-center">
            <div className="w-[85%] rounded-3xl relative">
                <img
                    src={nft.nftImg}
                    alt=""
                    className={`aspect-square rounded-3xl border ${color.border}`}
                />
            <div className={`${color.bg} absolute py-2 px-3 top-0 right-0 border ${color.border} rounded-tr-3xl rounded-bl-3xl`}>
                <p className="text-black font-black">{nft.rarity}</p>
            </div>
            </div>
        </div>
    )
}