import DummyHeader from "@/components/DummyHeader";
import GachaElement from "@/components/GachaElement";
import { Button } from "@/components/ui/button";

import nftImg from "@/assets/nft.png";

import { gachaImgs } from "@/utils/gachaImgs";

export default function Gacha() {
    const startRoll = () => {
        document.querySelectorAll('#gachaEl').forEach((element) => {
            element.classList.add('-translate-x-[3000px]');
        })
    }

    const shuffled = gachaImgs.sort(() => 0.5 - Math.random());
    const images1 = shuffled.slice(0, 21);
    const images2 = shuffled.slice(22, 31);

    return (
        <div className="flex lg:justify-between lg:pt-2 mb-16 justify-center items-center outline-none">
            <DummyHeader/>
            <div className="pt-4 flex flex-col items-center w-full lg:w-[35vw]">
                <div className="animationAreaItems">
                    <div className="gachaItems flex items-center w-full h-full bg-background justify-start overflow-x-hidden lg:w-full">
                        {images1.map((img, index) => {
                            return (
                                <GachaElement nftImg={img} key={index} />
                            );
                        })}
                        
                        <GachaElement nftImg={nftImg} />
                        
                        {images2.map((img, index) => {
                            return (
                                <GachaElement nftImg={img} key={index} />
                            );
                        })}
                    </div>
                </div>
                <Button onClick={startRoll} variant='buy' className="w-1/2 mt-4">Roll</Button>

            </div>
            <DummyHeader/>
        </div>
    )
}