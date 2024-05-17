import DummyHeader from "@/components/DummyHeader";
import PostNFT from "@/components/PostNFT";
import { Button } from "@/components/ui/button";
import { NFT, User } from "@/utils/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewMarketplacePost() {
    const navigator = useNavigate();

    const [option, setOption] = useState(0);

    const loggedInUser : User = JSON.parse(localStorage.getItem('user') || '{}');
    const nfts = loggedInUser.nfts;

    const handleNext = () => {
        localStorage.setItem('nft', JSON.stringify(nfts[option]));
        navigator(`/newmarketplace/create`);
    }

    // const [option, setOption] = useState("posts")

    return (
        <div className="flex lg:justify-between pt-10 lg:pt-2 mb-16 justify-center items-center outline-none">
            <DummyHeader />
            <div className="flex flex-col">
                <div className="flex justify-center lg:w-[35vw]">
                    <h1 className="font-bold text-xl font-lucky">Choose your NFT</h1>
                </div>
                <div className="grid grid-cols-2">
                    {nfts.map((nft : NFT, index) => {
                        return (
                            <div className={`${option == index && 'floating2'} cursor-pointer`}>
                                <input type="radio" value={index} checked={option == index} name="nft" id={`nft${index}`} className="hidden"/>
                                <label htmlFor={`nft${index}`} onClick={() => {setOption(index)}} className="cursor-pointer">
                                    <PostNFT nft={nft} />
                                </label>
                            </div>
                        )
                    })}
                </div>
                <div className="flex w-full justify-center mt-5">
                    <Button className="w-1/3" variant='follow' onClick={handleNext}>Next</Button>
                </div>
            </div>
            <DummyHeader />
        </div>
    )
}