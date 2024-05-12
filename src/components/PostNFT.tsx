import { NFT } from "@/utils/types";
import { useEffect, useState } from "react";

export default function PostNFT({nft} : {nft: NFT}) {
    const [color, setColor] = useState({text: "", border: "", bg: ""});

    useEffect(() => {
        switch(nft.rarity) {
            case "Common":
                setColor({text: "text-common", border: "border-common", bg: "bg-common"});
                break;
            case "Uncommon":
                setColor({text: "text-uncommon", border: "border-uncommon", bg: "bg-uncommon"});
                break;
            case "Rare":
                setColor({text: "text-rare", border: "border-rare", bg: "bg-rare"});
                break;
            case "Epic":
                setColor({text: "text-epic", border: "border-epic", bg: "bg-epic"});
                break;
            case "Legendary":
                setColor({text: "text-legendary", border: "border-legendary", bg: "bg-legendary"});
                break;
            case "Special":
                setColor({text: "text-special", border: "border-special", bg: "bg-special"});
                break;
            default:
                setColor({text: "text-black", border: "border-epic", bg: "bg-epic"});
        }
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