import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";

import logo from "@/assets/logo.svg";
import marketplacepost from "@/assets/marketplacepost.png";

import { getCatCoinBalance } from "@/utils/contracts";
import { api } from "@/utils/api";

export default function Register() {
    const navigator = useNavigate();
    const account = useAccount();

    const [form, setForm] = useState({
        wallet: account.address,
        name: "",
        username: '',
    });

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async () => {
        const balance = await getCatCoinBalance(account.address);

        const userInfo = {
            wallet: account.address || "",
            tokens: balance,
            name: form.name,
            userName: form.username,
            followers: [],
            following: [],
            bio: "",
            avatarImg: logo,
            bannerImg: marketplacepost,
            postsId: [],
            nfts: [],
            badges: [],
            questsId: []
        }

        try {
            const response = await fetch('https://chatspace-backend.vercel.app/api/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });

            if(response.ok) {
                console.log(response)
                const data = await response.text();
                console.log(data);
                localStorage.setItem('user', JSON.stringify({...userInfo, userId: data}));
                await api.assignQuest(data, '3aeMuCve6e8FydEhcJdr');
                await api.assignQuest(data, '3dACZetZDfdUiQ7MvumU');
                await api.completeQuest(data, '3dACZetZDfdUiQ7MvumU');
                navigator('/feed');
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="pt-8 lg:w-1/3 w-full px-10">
                    <div className="w-full flex justify-center mb-2 py-6">
                        <img src={logo} alt="" className="w-[45%]"/>
                    </div>
                    <p className="text-base">Wallet not registered! How shall we call you?</p>
                    <div className="mt-5">
                        <div className="flex flex-col">
                            <input type="text" placeholder="wallet" value={account.address} readOnly className="text-sm text-muted border-2 bg-common p-2 py-1 rounded-lg mt-3" />
                            <input onChange={handleChange} name="name" type="text" placeholder="name" autoFocus className="text-sm text-primary-foreground border-2 border-gray-200 p-2 py-1 rounded-lg focus:outline-none focus:border-blue-500 mt-3" />
                            <input onChange={handleChange} name="username" type="text" placeholder="username" className="text-sm text-primary-foreground border-2 border-gray-200 p-2 py-1 rounded-lg focus:outline-none focus:border-blue-500 mt-3" />
                            <input type="password" placeholder="password" className="text-sm text-primary-foreground border-2 border-gray-200 p-2 py-1 rounded-lg focus:outline-none focus:border-blue-500 mt-3" />
                            <input type="password" placeholder="confirm password" className="text-sm text-primary-foreground border-2 border-gray-200 p-2 py-1 rounded-lg focus:outline-none focus:border-blue-500 mt-3" />
                            <div className="w-full justify-center mt-6">
                                <Button onClick={handleSubmit} variant="follow" className="w-1/3" >Register</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}