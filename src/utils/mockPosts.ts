import { MarketPlacePost, Post } from "@/utils/types";
import { mockUsers } from "./mockUsers";
import nftImg from "@/assets/nft.png";

export const mockPosts: (Post | MarketPlacePost)[] = [
    {
        userId: "1",
        userName: mockUsers[0].userName,
        avatarImg: mockUsers[0].avatarImg,
        postImg: "https://random.imagecdn.app/400/400",
        caption: "This is a test post",
        likes: ["John Smith", "Jane Smith"],
        comments: ["This is a comment", "This is another comment"],
        createdAt: "2022-01-01",
        postId: "1"
    },
    {
        userId: "2",
        userName: mockUsers[1].userName,
        avatarImg: mockUsers[1].avatarImg,
        postImg: "https://random.imagecdn.app/500/500",
        caption: "This is a test post",
        likes: ["John Doe", "Jane Smith"],
        comments: ["This is a comment", "This is another comment"],
        createdAt: "2022-01-02",
        postId: "2"
    },
    {
        userId: "3",
        userName: mockUsers[2].userName,
        avatarImg: mockUsers[2].avatarImg,
        postImg: "https://random.imagecdn.app/600/600",
        caption: "This is a test post",
        likes: ["John Doe", "John Smith"],
        comments: ["This is a comment", "This is another comment"],
        createdAt: "2022-01-03",
        postId: "3"
    },
    {
        userId: "1",
        userName: mockUsers[0].userName,
        avatarImg: mockUsers[0].avatarImg,
        caption: "This is a test post",
        likes: ["John Smith", "Jane Smith"],
        comments: ["This is a comment", "This is another comment"],
        createdAt: "2022-01-01",
        postId: "4",
        price: 100,
        nft: {
            nftId: "1",
            nftImg: nftImg,
            name: "NFT Name",
            address: "0xa9760110671d7a5a37A72F684D7D1d92F2dE84dA",
            rarity: "Special",
        }
    } as MarketPlacePost,
];