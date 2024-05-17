import {ethers} from 'ethers';
import { GelatoRelay } from "@gelatonetwork/relay-sdk";
import CatCoin from '@/abi/CatCoin.sol/CatCoin.json';
import CatNFT from '@/abi/CatNFT.sol/CatNFT.json';
const NFTContractAddress = '0x56012074492279b3C2a7a13c820c3ee5eFb67e7C';
const catCoinContractAddress = '0x4ebb45Ef0a7a5aE2BD1DEf50eE9EBF6628064cbb';

const relay = new GelatoRelay();

export const getCatCoinBalance = async (account : any) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const catCoinContract = new ethers.Contract(catCoinContractAddress, CatCoin.abi, signer);
    const address = account.address;

    try {
        const balance = await catCoinContract.balanceOf(address);
        const balanceCorrected = parseFloat(balance.toString()) / 1e18;
        return balanceCorrected;
    } catch (error) {
        console.error("Error fetching balance:", error);
        return 0;
    }
};

export const getCount = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const NFTContract = new ethers.Contract(NFTContractAddress, CatNFT.abi, signer);
    const count = await NFTContract.count();
    return parseInt(count);
};

export const getMintedStatus = async (metadataURI : string) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const NFTContract = new ethers.Contract(NFTContractAddress, CatNFT.abi, signer);
    const result = await NFTContract.isContentOwned(metadataURI);
    return result;
};

export const getURI = async (tokenId : number) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const NFTContract = new ethers.Contract(NFTContractAddress, CatNFT.abi, signer);
    const uri = await NFTContract.tokenURI(tokenId);
    return uri;
};

export const buyNFTWithCatCoin = async (metadataURI: string) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const NFTContract = new ethers.Contract(NFTContractAddress, CatNFT.abi, signer);
    const catCoinContract = new ethers.Contract(catCoinContractAddress, CatCoin.abi, signer);

    const apiKey = "3QyZFI__i8AP7peyKJTx9aBfA78jT8ENragF776GOK4_";
    
    try {
        const functionDataTransfer = catCoinContract.interface.encodeFunctionData(
            "transferTokens",
            [NFTContractAddress, ethers.parseUnits('100', 18)]
        );
        const user = await signer.getAddress();
        const relayRequestTransfer = {
            chainId: (await provider.getNetwork()).chainId,
            target: catCoinContractAddress,
            data: functionDataTransfer,
            user: user,
            isConcurrent: true,
        };
        const responseTransfer = await relay.sponsoredCallERC2771(
            relayRequestTransfer,
            (provider as any),
            apiKey
        );
        console.log("Relay response:", responseTransfer);
        console.log(`https://relay.gelato.digital/tasks/status/${responseTransfer.taskId}`);

        await new Promise(resolve => setTimeout(resolve, 70000));

        const functionDataMint = NFTContract.interface.encodeFunctionData(
            "payToMintWithCatCoins",
            [metadataURI]
        );

        const relayRequestMint = {
            chainId: (await provider.getNetwork()).chainId,
            target: NFTContractAddress,
            data: functionDataMint,
            user: user,
            isConcurrent: true,
        };

        const responseMint = await relay.sponsoredCallERC2771(
            relayRequestMint,
            (provider as any),
            apiKey
        );

        console.log("Relay response:", responseMint);
        console.log(`https://relay.gelato.digital/tasks/status/${responseMint.taskId}`);
    } catch (err) {
        console.log(err);
    }
}

export const claimTokens = async (reward : number) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const catCoinContract = new ethers.Contract(catCoinContractAddress, CatCoin.abi, signer);

    const apiKey = "3QyZFI__i8AP7peyKJTx9aBfA78jT8ENragF776GOK4_";

    try {
        const functionData = catCoinContract.interface.encodeFunctionData(
            "claim",
            [ethers.parseUnits(reward.toString(), 18)]
        );
        const user = await signer.getAddress();

        const relayRequest = {
            chainId: (await provider.getNetwork()).chainId,
            target: catCoinContractAddress,
            data: functionData,
            user: user,
            isConcurrent: true,
        };

        const response = await relay.sponsoredCallERC2771(
            relayRequest,
            (provider as any),
            apiKey
        );

        console.log("Relay response:", response);
        console.log(
            `https://relay.gelato.digital/tasks/status/${response.taskId}`
        );

        if(response.taskId) return 1;
    } catch (error) {
        console.error("Error fetching balance:", error);
        return;
    }

}