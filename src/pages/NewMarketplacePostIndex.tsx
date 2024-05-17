import DummyHeader from "@/components/DummyHeader";
import { Button } from "@/components/ui/button";
import { NFT, User } from "@/utils/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import token from "@/assets/token.svg";
import MarketplacePost from "@/components/MarketplacePost";
import { api } from "@/utils/api";
import { toast } from "@/components/ui/use-toast";

export default function NewMarketplacePostIndex() {
    const navigator = useNavigate();

    const nft : NFT = JSON.parse(localStorage.getItem('nft') || '{}');
    const loggedInUser : User = JSON.parse(localStorage.getItem('user') || '{}');
    const [price, setPrice] = useState(0);

    const handleChange = (e : any) => {
        setPrice(e.target.value);
    }

    const handleSubmit = async () => {
        const {userId, userName, avatarImg, wallet} = loggedInUser;

        const response = await api.createMarketPlacePost(userId, userName, avatarImg, "", "", [], [], price, nft);
        if(response == 200) {
            const res = await api.updateUserInfo(wallet);
            if(res == 200) {
                toast({
                    title: `Post created!`,
                    description: `Check out on your profile :)`,
                });

                localStorage.removeItem('nft');
                setTimeout(() => {
                    navigator('/profile/' + userId);
                }, 2000);
            }
        }
    }
    
    return (
        <div className="flex lg:justify-between pt-10 lg:pt-2 mb-16 justify-center items-center outline-none">
            <DummyHeader />
            <div className="flex flex-col items-center w-full lg:w-[35vw]">
                <div className="w-[80%]">
                    <MarketplacePost userId={loggedInUser.userId} userName={loggedInUser.userName} userImg={loggedInUser.avatarImg} nft={nft} likes={[]} postImg='' description="" price={price}/>
                </div>
                <div className="relative w-full flex flex-col items-center justify-center">
                    <input type="number" placeholder="Value" value={price} onChange={handleChange} className="w-[80%] text-base text-muted border-2 bg-common p-2 py-1 rounded-lg"/>
                    <div className="absolute flex items-center px-2 right-[10%] top-0 bottom-0 mt-auto mb-auto">
                        <img src={token} alt="" className="w-[24px]"/>
                        <p className="text-primary-foreground">CAT</p>
                    </div>
                </div>
                <div className="flex w-full justify-center mt-5">
                    <Button className="w-1/3" variant='follow' onClick={handleSubmit}>Publish</Button>
                </div>
            </div>
            <DummyHeader />
        </div>
    )
}