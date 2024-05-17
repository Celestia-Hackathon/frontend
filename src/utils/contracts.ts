import {ethers} from 'ethers';
import CatCoin from '@/abi/CatCoin.sol/CatCoin.json';


export const getCatCoinBalance = async (account : any) => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const catCoinContractAddress = '0x597346565Eb10a60336c6c9C1aCfB26E085fd426';
        const catCoinContract = new ethers.Contract(catCoinContractAddress, CatCoin.abi, signer);

        const address = account.address;
        const balance = await catCoinContract.balanceOf(address);
        const balanceCorrected = parseFloat(balance.toString()) / 1e18;
        return balanceCorrected;
    } catch (error) {
        console.error("Error fetching balance:", error);
        return 0;
    }
};