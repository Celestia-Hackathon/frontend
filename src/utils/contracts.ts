import {ethers} from 'ethers';
import CatCoin from '@/abi/CatCoin.sol/CatCoin.json';


export const getCatCoinBalance = async (account : any) => {
    try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const catCoinContractAddress = '0x1fAab810CfEB248d31ffc972f18Dc4917A83C79a';
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