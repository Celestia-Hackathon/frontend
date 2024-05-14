import DummyHeader from "@/components/DummyHeader";
import GachaElement from "@/components/GachaElement";
import { Button } from "@/components/ui/button";

import manekinekoImg from "@/assets/gacha/manekineko.png"
import nftImg from "@/assets/nft.png";

export default function Gacha() {
    /* const [sentence, setSentence] = useState(gachaSentences[Math.floor(Math.random() * gachaSentences.length)]);
    const [nft, setNft] = useState<NFT>({
        nftId: "1",
        nftImg: nftImg,
        name: "NFT",
        address: "0x",
        rarity: "Legendary",
    }); */

    const nft = {
        nftId: "1",
        nftImg: nftImg,
        name: "NFT",
        address: "0x",
        rarity: "Legendary"
    }
    
    const startRoll = () => {
        // at first, it should generate an random NFT
        /*
        const generateNFT = async () => {
            try {
                const response = await fetch("https://chatspace-backend.vercel.app/api/get-random-nft");
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setNft(data);
                } else {
                    console.error("error getting nft data");
                    // throw new Error("Something went wrong");
                }
            } catch (error) {
                console.error(error);
            }
        }
        */
        
        //setNft(nftImg);
        document.querySelectorAll('#gachaEl').forEach((element) => {
            element.classList.add('-translate-x-[1850px]');
        })
    }

    const images1 : string[] = JSON.parse(localStorage.getItem('images1') || '[]');
    const images2 : string[] = JSON.parse(localStorage.getItem('images2') || '[]');

    /* useEffect(() => {
        const timer = setTimeout(() => {
            setSentence(gachaSentences[Math.floor(Math.random() * gachaSentences.length)]);
        }, 10000)

        return () => clearTimeout(timer);
    })   */  

    return (
        <div className="flex h-[calc(100vh-64px)] lg:h-[100vh] lg:mb-0 lg:justify-between mb-16 justify-center items-center outline-none">
            <DummyHeader/>
            <div className="stars w-full pt-16 h-full flex flex-col gap-16 lg:w-[35vw]">
                <div className="px-2">
                    <h1 className="font-lucky text-[60px]">fortune kitty</h1>
                </div>
                <div>
                    <div className="relative mt-16 w-full flex justify-end">
                        <div className="absolute w-[150px] lg:w-[190px] -top-[64px] lg:-top-[82px] left-0">
                            <img src={manekinekoImg} alt="" className="w-full" />
                        </div>
                        <div className="animationAreaItems w-[69%] h-fit relative overflow-x-auto lg:w-[70%]">
                            <div className="gachaItems flex items-center w-full h-full bg-background justify-start overflow-x-hidden lg:w-full">
                                {images1.map((img, index) => {
                                    return (
                                        <GachaElement nftImg={img} key={index} />
                                    );
                                })}
                                
                                <GachaElement nftImg={nft.nftImg} />
                                
                                {images2.map((img, index) => {
                                    return (
                                        <GachaElement nftImg={img} key={index} />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <Button onClick={startRoll} variant='follow' className="w-1/2 mt-16 font-black">Roll for 100 CAT</Button>
                </div>

            </div>
            <DummyHeader/>
        </div>
    )
}