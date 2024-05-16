import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.svg";

export default function Register() {
    return (
        <div>
            <div className="flex justify-center items-center">
                <div className="pt-8 lg:w-1/3 w-full px-10">
                    <div className="w-full flex justify-center mb-5 py-16">
                        <img src={logo} alt="" className="w-[45%]"/>
                    </div>
                    <p className="text-base">Wallet not registered! How shall we call you?</p>
                    <div className="mt-5">
                        <form action="" className="flex flex-col">
                            <input type="text" placeholder="wallet" value="0xabcdefgh" readOnly className="text-sm text-muted border-2 bg-common p-2 py-1 rounded-lg mt-3" />
                            <input type="text" placeholder="username" autoFocus className="text-sm text-primary-foreground border-2 border-gray-200 p-2 py-1 rounded-lg focus:outline-none focus:border-blue-500 mt-3" />
                            <input type="password" placeholder="password" className="text-sm text-primary-foreground border-2 border-gray-200 p-2 py-1 rounded-lg focus:outline-none focus:border-blue-500 mt-3" />
                            <input type="password" placeholder="confirm password" className="text-sm text-primary-foreground border-2 border-gray-200 p-2 py-1 rounded-lg focus:outline-none focus:border-blue-500 mt-3" />
                            <div className="w-full justify-center mt-6">
                                <Button variant="follow" className="w-1/3" >Register</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}