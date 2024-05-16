import { User } from "@/utils/types.ts";
import nftImg from "@/assets/nft.png";
import badgeImg from "@/assets/badge.png";

export const mockUsers: User[] = [
    {
        name: "Pintudo",
        avatarImg: "https://randomuser.me/api/portraits/men/1.jpg",
        userId: "1",
        userName: "pintado",
        followers: ["2", "3"],
        following: ["2", "3"],
        bio: "eu sou pintado 🐟",
        wallet: "0xa9760110671d7a5a37A72F684D7D1d92F2dE84dA",
        tokens: 0,
        postsId: ["1", "2", "3"],
        bannerImg: "https://random.imagecdn.app/500/150",
        nfts: [
            {
                nftId: "1",
                nftImg: nftImg,
                name: "NFT",
                address: "0x1234567890abcdef",
                rarity: "Rare"
            },
            {
                nftId: "2",
                nftImg: nftImg,
                name: "NFT",
                address: "0x1234567890abcdef",
                rarity: "Legendary"
            },
            {
                nftId: "3",
                nftImg: nftImg,
                name: "NFT",
                address: "0x1234567890abcdef",
                rarity: "Epic"
            },
        ],
        questsId: [],
        badges: [
            {
                badgeId: "1",
                badgeImg: badgeImg,
                name: "Mint three",
                description: "Badge earned for minting three NFTs"
            }
        ]
    },
    {
        name: "John Doe",
        avatarImg: "https://randomuser.me/api/portraits/men/10.jpg",
        userId: "2",
        userName: "johndoe",
        followers: ["2", "3"],
        following: ["2", "3"],
        bio: "violets are purple, roses are blue, I'm a poet and I know it",
        wallet: "0xa9760110671d7a5a37A72F684D7D1d92F2dE84dA",
        tokens: 0,
        postsId: ["1", "2", "3"],
        bannerImg: "https://random.imagecdn.app/500/150",
        nfts: [
            {
                nftId: "1",
                nftImg: nftImg,
                name: "NFT",
                address: "0x1234567890abcdef",
                rarity: "Rare"
            },
            {
                nftId: "2",
                nftImg: nftImg,
                name: "NFT",
                address: "0x1234567890abcdef",
                rarity: "Legendary"
            },
            {
                nftId: "3",
                nftImg: nftImg,
                name: "NFT",
                address: "0x1234567890abcdef",
                rarity: "Epic"
            },
        ],
        questsId: [],
        badges: [
            {
                badgeId: "1",
                badgeImg: badgeImg,
                name: "Mint three",
                description: "Badge earned for minting three NFTs"
            }
        ]
    },
    {
        name: "John Smith",
        avatarImg: "https://randomuser.me/api/portraits/men/11.jpg",
        userId: "3",
        userName: "joao_smito",
        followers: ["1000"],
        following: ["10"],
        bio: "rosas são vermelhas, violetas são azuis, eu sou um poeta e sei disso",
        wallet: "0xa9760110671d7a5a37A72F684D7D1d92F2dE84dA",
        tokens: 0,
        postsId: ["4", "5", "6"],
        bannerImg: "https://random.imagecdn.app/500/150",
        nfts: [],
        questsId: [],
        badges: []
    },
    {
        name: "Jane Smith",
        avatarImg: "https://randomuser.me/api/portraits/women/10.jpg",
        userId: "4",
        userName: "janey",
        followers: ["23091"],
        following: ["2100"],
        bio: "sou legal",
        wallet: "0xa9760110671d7a5a37A72F684D7D1d92F2dE84dA",
        tokens: 0,
        postsId: ["7", "8", "9"],
        bannerImg: "https://random.imagecdn.app/500/150",
        nfts: [],
        questsId: [],
        badges: []
    }
]