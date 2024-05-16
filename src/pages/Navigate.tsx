import { useNavigate } from "react-router-dom";
import card1 from "@/assets/card1.png";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function Navigate() {
    const account = useAccount();
    const navigator = useNavigate();

    // 400 : ERRO
    // 404 : NAO EXISTE
    // OK : EXISTE

    useEffect(() => {
        const getUserByWallet = async () => {
            if(account.address) {
                try {
                    const response = await fetch('https://chatspace-backend.vercel.app/api/get-user/' + account.address);
                    if(response.status == 200) {
                        const data = await response.json();
                        localStorage.setItem('user', JSON.stringify(data));
                        navigator('/feed');
                    } else if(response.status == 404) {
                        navigator('/register');
                    }
                } catch(err) {
                    console.log(err);
                }
            }
        }

        getUserByWallet();
    })

    return (
        <div className=" lg:pt-2 px-4">
            <div className="floating flex justify-center py-8">
                {/* imagems aqui */}
                <img src={card1} alt="" className="w-[50%]"/>
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