import { useNavigate } from "react-router-dom";
import card1 from "@/assets/card1.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { api } from "@/utils/api";

export default function Navigate() {
    const account = useAccount();
    const navigator = useNavigate();

    // 400 : ERRO
    // 404 : NAO EXISTE
    // OK : EXISTE

    useEffect(() => {
        if (account.address) {
            api.updateUserInfo(account.address)
                .then((response) => {
                    if (response == 200) {
                        navigator('/feed');
                    } else if (response == 404) {
                        navigator('/register');
                    } else {
                        console.log("Error fetching user");
                    }
                })
        }
    })

    return (
        <div className=" lg:pt-2 px-4">
            <div className="floating flex justify-center py-8">
                {/* imagems aqui */}
                <img src={card1} alt="" className="w-[50%] lg:w-[12%]" />
            </div>
            <div>
                <h1 className="font-lucky text-lg">earn tokens. roll for cats.</h1>
                <p className="mt-4 text-sm">Complete quests, roll for NFTs and join a huge marketplace</p>
            </div>
            <div className="mt-8 flex justify-center">
                <ConnectButton />
            </div>
        </div>
    )
}