import DummyHeader from "@/components/DummyHeader";
import GachaElement from "@/components/GachaElement";
import PostNFT from "@/components/PostNFT";
import manekinekoImg from "@/assets/gacha/manekineko.png"
import gachaButton from "@/assets/gacha-button.png";
import ConfettiExplosion from "react-confetti-explosion";
import { buyNFTWithCatCoin, getCount } from "@/utils/contracts";
import { NFT, User } from "@/utils/types";
import { useState } from "react";
import { blankNft } from "@/utils/blank";
import { api } from "@/utils/api";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast"

export default function Gacha() {
    const [nft, setNft] = useState<NFT>(blankNft)
    const [open, setOpen] = useState(false);
    const [isExploding, setIsExploding] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast()

    /* const [sentence, setSentence] = useState(gachaSentences[Math.floor(Math.random() * gachaSentences.length)]);
    const [nft, setNft] = useState<NFT>({
        nftId: "1",
        nftImg: https://gateway.pinata.cloud/ipfs/QmTudPsbaksg9oG3jR3uNYXtpjAkHGsGnh1tAqVAYt7nRy/1.png,
        name: "NFT",
        address: "0x",
        rarity: "Legendary",
    }); */
    const contentIdImg = 'QmTudPsbaksg9oG3jR3uNYXtpjAkHGsGnh1tAqVAYt7nRy';
    const contentIdJson = 'QmY9yW5B7xHXBGDwW5Y5ido3VULyXD2njD4QhApBqxtPxd';
    const loggedInUser: User = JSON.parse(localStorage.getItem('user') || '{}');

    const startRoll = async () => {
        try {

            setIsLoading(true);

            const tokenId = await getCount();
            const metadataURI = `${contentIdJson}/${tokenId}.json`;
            const imageURI = `https://gateway.pinata.cloud/ipfs/${contentIdImg}/${tokenId}.png`
            const address = "0x7164c48b7EA2acAa055FA1B8738ba5A4F7abeFca";

            await buyNFTWithCatCoin(metadataURI);

            const response = await fetch(`https://gateway.pinata.cloud/ipfs/${metadataURI}`);

            if (!response.ok) {
                // throw new Error('Failed to fetch NFT metadata');
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "Failed to fetch NFT metadata :(",
                })
            }

            const data = await response.json();

            const nft: NFT = {
                nftId: tokenId.toString(),
                nftImg: imageURI,
                name: data.name,
                address,
                rarity: data.attributes[0].rarity.charAt(0).toUpperCase() + data.attributes[0].rarity.slice(1)
            };

            setNft(nft);

            await api.addUserNFT(loggedInUser.userId, nft);

            setIsLoading(false);

            openModal();

            document.querySelectorAll('#gachaEl').forEach((element) => {
                element.classList.add('-translate-x-[1850px]');
            });
        } catch (error) {
            // console.error('Error during startRoll:', error);
            setIsLoading(false);

            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please, try again later.",
            })
        }
    };

    const openModal = () => {
        setTimeout(() => {
            setOpen(true);
            setIsExploding(true);
            setTimeout(() => {
                setIsExploding(false);
            }, 2000);
        }, 12000)
    }

    // const teststartRoll = () => {
    //     setIsLoading(true);

    //     setTimeout(() => {
    //         setIsLoading(false);
    //     }, 30000);
    // }

    const images1: string[] = JSON.parse(localStorage.getItem('images1') || '[]');
    const images2: string[] = JSON.parse(localStorage.getItem('images2') || '[]');

    /* useEffect(() => {
        const timer = setTimeout(() => {
            setSentence(gachaSentences[Math.floor(Math.random() * gachaSentences.length)]);
        }, 10000)

        return () => clearTimeout(timer);
    })   */

    return (
        <div className="flex h-[calc(100vh-64px)] lg:h-[100vh] lg:mb-0 lg:justify-between mb-16 justify-center items-center outline-none">
            <DummyHeader />
            <div className="stars w-full pt-16 h-full flex flex-col gap-16 lg:w-[35vw]">
                <div className="px-2 floating">
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
                </div>
                <div className="mt-10 w-full justify-center flex">
                    <div className="cursor-pointer relative kitty-button font-lucky flex justify-center items-center w-[300px] h-[70px]">
                        <img className="-z-10 w-[60%] h-full mt-auto mb-auto -bottom-0 -top-3 left-[16%] bottom-[5%] absolute " src={gachaButton} alt="" />
                        <div className=" w-full flex justify-center items-center">
                            <p onClick={() => { startRoll() }} className="text-4xl text-black">ROLL</p>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={open} onOpenChange={() => setOpen(false)}>
                <DialogTrigger>
                    <div></div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Congratulations!</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        {isExploding && <div className="relative top-0 bottom-0 left-0 right-0 flex justify-center items-center"><ConfettiExplosion force={0.5} particleCount={150} width={800} zIndex={50} /></div>}
                        <PostNFT nft={nft} />
                        <p className="text-lg text-center">You have won a {nft.rarity} NFT!</p>
                    </DialogDescription>
                </DialogContent>
            </Dialog>

            {isLoading &&
                <div className="z-50 w-[100vw] h-[100vh]  bg-background/75 fixed justify-center items-center flex">
                    <LoadingSpinner />
                    <p className="ml-2">
                        Waiting for the confirmation... It can take a minute
                    </p>
                </div>
            }

            <DummyHeader />
        </div>
    )
}