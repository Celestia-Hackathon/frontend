import {Eip1193Provider, ethers} from 'ethers';
import CatCoin from '@/abi/CatCoin.sol/CatCoin.json';
import CatNFT from '@/abi/CatNFT.sol/CatNFT.json';
const NFTContractAddress = '0x109b845038c0960F71c1a564D76EBdc08b7B9254';
const catCoinContractAddress = '0xA38dafA100bb9852b7C4065CdF2dE774c39043f8';

export const getCatCoinBalance = async (account : any) => {
    const provider = new ethers.BrowserProvider(window.ethereum ? window.ethereum : { } as Eip1193Provider);
    const signer = await provider.getSigner();
    
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

export const getCount = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum ? window.ethereum : { } as Eip1193Provider);
    const signer = await provider.getSigner();

    const NFTContract = new ethers.Contract(NFTContractAddress, CatNFT.abi, signer);
    const count = await NFTContract.count();
    return parseInt(count);
};

export const getMintedStatus = async (metadataURI : string) => {
    const provider = new ethers.BrowserProvider(window.ethereum ? window.ethereum : { } as Eip1193Provider);
    const signer = await provider.getSigner();
    const NFTContract = new ethers.Contract(NFTContractAddress, CatNFT.abi, signer);
    const result = await NFTContract.isContentOwned(metadataURI);
    return result;
};

export const getURI = async (tokenId : number) => {
    const provider = new ethers.BrowserProvider(window.ethereum ? window.ethereum : { } as Eip1193Provider);
    const signer = await provider.getSigner();
    const NFTContract = new ethers.Contract(NFTContractAddress, CatNFT.abi, signer);
    const uri = await NFTContract.tokenURI(tokenId);
    return uri;
};

export const buyNFTWithCatCoin = async (metadataURI : string) => {
    const provider = new ethers.BrowserProvider(window.ethereum ? window.ethereum : { } as Eip1193Provider);
    const signer = await provider.getSigner();
    
    const NFTContract = new ethers.Contract(NFTContractAddress, CatNFT.abi, signer);
    const catCoinContract = new ethers.Contract(catCoinContractAddress, CatCoin.abi, signer);
    
    const costInCatCoin = ethers.parseUnits('100', 18);
    const tx = await catCoinContract.transfer(NFTContractAddress, costInCatCoin);
    await tx.wait();

    const mintTx = await NFTContract.payToMintWithCatCoins(await signer.getAddress(), metadataURI);
    await mintTx.wait();
    return mintTx.to;
}

export const claimTokens = async (reward : number) => {
    const provider = new ethers.BrowserProvider(window.ethereum ? window.ethereum : { } as Eip1193Provider);
    const signer = await provider.getSigner();
    const catCoinContract = new ethers.Contract(catCoinContractAddress, CatCoin.abi, signer);

    try {
        const tx = await catCoinContract.claim(BigInt(reward * 1e18));
        const receipt = await tx.wait();
        return receipt;
    } catch (error) {
        console.error("Error fetching balance:", error);
        return;
    }

}