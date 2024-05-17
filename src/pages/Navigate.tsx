import { useNavigate } from "react-router-dom";
import card1 from "@/assets/card1.png";
import { useEffect } from "react";
import { api } from "@/utils/api";

import { MetaMaskButton, useAccount} from "@metamask/sdk-react-ui";

export default function Navigate() {
    const account = useAccount();
    const navigator = useNavigate();
    // 400 : ERRO
    // 404 : NAO EXISTE
    // OK : EXISTE

    const checkChain = async () => {
        const chainId = await window.ethereum?.request({ method: "eth_chainId"})
        if(chainId != "0xe9ac0ce") {
            console.log(chainId)
            console.log("NOT CONNECTED TO RASPBERRY!")

            try {
                await window.ethereum?.request({
                        method: "wallet_switchEthereumChain",
                        params: [{ chainId: "0x75b3dcf" }],
                    });
            } catch (switchError) {
                // This error code indicates that the chain has not been added to MetaMask.
                if ((switchError as any).code === 4902) {
                    try {
                        await window.ethereum?.request({
                                method: "wallet_addEthereumChain",
                                params: [
                                    {   
                                        chainId: "0x75b3dcf",
                                        chainName: "OP Celestia Raspberry",
                                        rpcUrls: ["https://rpc.opcelestia-raspberry.gelato.digital/"],
                                        nativeCurrency: {
                                            decimals: 18,
                                            name: "ETH",
                                            symbol: "ETH"
                                        }
                                    },
                                ],
                            });

                            // navigate('/overview')
                    } catch (addError) {
                        // Handle "add" error.
                    }
                }
                // Handle other "switch" errors.
            }
        }
    }


    useEffect(() => {
        if(account.address) {
            checkChain()

            api.updateUserInfo(account.address)
                .then((response) => {
                    if(response == 200) {
                        navigator('/feed');
                    } else if(response == 404) {
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
                <img src={card1} alt="" className="w-[50%] lg:w-[12%]"/>
            </div>
            <div>
                <h1 className="font-lucky text-lg">earn tokens. roll for cats.</h1>
                <p className="mt-4 text-sm">Complete quests, roll for NFTs and join a huge marketplace</p>
            </div>
            <div className="mt-8 flex justify-center">
                <MetaMaskButton />
            </div>
        </div>
    )
}