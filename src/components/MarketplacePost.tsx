import { NFT } from "@/utils/types";
import { MessageSquare, HeartIcon, ShoppingCart } from "lucide-react";
import { AvatarPost } from "./AvatarPost";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import PostNFT from "./PostNFT";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface MarketplacePostProps {
    userId: string;
    userName: string;
    userImg: string;
    postImg: string;
    description: string;
    likes: string[];
    nft: NFT;
    price?: number;
}

export default function MarketplacePost(
    { userId, userName, userImg, /* postImg, description, */ likes, nft, price }: MarketplacePostProps
) {
    const navigator = useNavigate();

    const isDesktop = window.innerWidth > 1024;

    return (
        <div className="w-full h-full border-b items-start justify-center">
            <div className="rounded-lg py-4 flex flex-col">
                <div className={`bg-marketplace rounded-xl`}>
                    <PostNFT nft={nft} />
                    <div className="text-secondary flex items-center w-full pb-2 px-[7.5%]">
                        <div onClick={() => navigator(`/profile/${userId}`)} >
                            <AvatarPost avatar={userImg} username={userName} isMarketPlace />
                        </div>

                        <div className="w-full flex gap-2 items-center justify-end">
                            <div>
                                <div className="flex items-center space-x-2 text-white">
                                    <MessageSquare color='hsl(var(--primary-foreground))' />
                                    <HeartIcon color='hsl(var(--primary-foreground))' />
                                </div>
                                <p className={`text-left mt-2 text-primary-foreground`}>{likes.length} Likes</p>
                            </div>
                        </div>
                    </div>
                    <div className="px-[7.5%] py-[2.5%] h-full w-full flex">
                        {isDesktop ?
                            (
                                <Dialog>
                                    <DialogTrigger className="w-full">
                                        <Button variant='buy' className="w-full flex items-center gap-3">
                                            <ShoppingCart color="hsl(var(--primary))" />
                                            <p>Buy for {price} CAT</p>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                {nft.name}
                                            </DialogTitle>
                                        </DialogHeader>
                                        <DialogDescription>
                                            <PostNFT nft={nft} />
                                            {nft.address}
                                        </DialogDescription>
                                        <Button variant='buy' className="w-full flex items-center gap-3">
                                            <ShoppingCart color="hsl(var(--primary))" />
                                            <p>Buy for {price} CAT</p>
                                        </Button>
                                    </DialogContent>
                                </Dialog>
                            )
                            :
                            (
                                <Drawer>
                                    <DrawerTrigger className="w-full">
                                        <Button variant='buy' className="w-full flex items-center gap-3">
                                            <ShoppingCart color="hsl(var(--primary))" />
                                            <p>Buy for {price} CAT</p>
                                        </Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>
                                                {nft.name}
                                            </DrawerTitle>
                                            <DrawerClose />
                                        </DrawerHeader>
                                        <DrawerDescription>
                                            <PostNFT nft={nft} />
                                            {nft.address}
                                        </DrawerDescription>
                                        <DrawerFooter>
                                            <Button variant='buy' className="w-full flex items-center gap-3">
                                                <ShoppingCart color="hsl(var(--primary))" />
                                                <p>Buy for {price} CAT</p>
                                            </Button>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}