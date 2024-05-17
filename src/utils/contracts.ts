import {ethers} from 'ethers';
import CatCoin from '@/abi/CatCoin.sol/CatCoin.json';



export const getCatCoinBalance = async (account : any) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const catCoinContractAddress = '0xA38dafA100bb9852b7C4065CdF2dE774c39043f8';
    const catCoinContract = new ethers.Contract(catCoinContractAddress, CatCoin.abi, signer);

    try {
        const address = account.address;
        const balance = await catCoinContract.balanceOf(address);
        const balanceCorrected = parseFloat(balance.toString()) / 1e18;
        return balanceCorrected;
    } catch (error) {
        console.error("Error fetching balance:", error);
        return 0;
    }
};

export const claimTokens = async (reward : number) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const catCoinContractAddress = '0xA38dafA100bb9852b7C4065CdF2dE774c39043f8';
    const catCoinContract = new ethers.Contract(catCoinContractAddress, CatCoin.abi, signer);

    try {
        const tx = await catCoinContract.claim(ethers.parseUnits(reward.toString(), 18))
        await tx.wait();
        console.log(tx);
        return 200;
    } catch (error) {
        console.error("Error fetching balance:", error);
        return 0;
    }
};