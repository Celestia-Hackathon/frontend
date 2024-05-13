import DummyHeader from "@/components/DummyHeader";
import GachaElement from "@/components/GachaElement";
import { Button } from "@/components/ui/button";

import nftImg from "@/assets/nft.png";
import manekinekoImg from "@/assets/gacha/manekineko.png"

import { gachaSentences } from "@/utils/gacha";
import { useEffect, useState } from "react";

export default function Gacha() {
    const [sentence, setSentence] = useState(gachaSentences[Math.floor(Math.random() * gachaSentences.length)]);

    const startRoll = () => {
        document.querySelectorAll('#gachaEl').forEach((element) => {
            element.classList.add('-translate-x-[1850px]');
        })
    }

    const images1 : string[] = JSON.parse(localStorage.getItem('images1') || '[]');
    const images2 : string[] = JSON.parse(localStorage.getItem('images2') || '[]');

    useEffect(() => {
        const timer = setTimeout(() => {
            setSentence(gachaSentences[Math.floor(Math.random() * gachaSentences.length)]);
        }, 10000)

        return () => clearTimeout(timer);
    })    

    return (
        <div className="flex lg:justify-between lg:pt-2 mb-16 justify-center items-center outline-none">
            <DummyHeader/>
            <div className="pt-4 flex flex-col items-center w-full lg:w-[35vw]">
                <div className="balloon">
                    <p className="text-center text-primary-foreground font-bold">{sentence}</p>
                </div>
                <div className="relative mt-16 w-full flex justify-end">
                    <div className="absolute w-[150px] -top-[64px] left-0">
                        <img src={manekinekoImg} alt="" className="w-full" />
                    </div>
                    <div className=" animationAreaItems">
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
                </div>
                <Button onClick={startRoll} variant='buy' className="w-1/2 mt-4">Roll</Button>

            </div>
            <DummyHeader/>
        </div>
    )
}