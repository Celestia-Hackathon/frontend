import { NFT, Post, Quest, User } from "./types";

export const blankUser: User = {
    name: "",
    userName: "",
    userId: "",
    followers: [""],
    following: [""],
    bio: "",
    avatarImg: "",
    bannerImg: "",
    wallet: "",
    tokens: 0,
    postsId: [""],
    nfts: [],
    badges: [],
    questsId: []
}

export const blankPost: Post = {
    postId: "",
    userId: "",
    userName: "",
    avatarImg: "",
    postImg: "",
    caption: "",
    likes: [""],
    comments: [""],
    createdAt: ""
}

export const blankQuest: Quest = {
    questId: "",
    questName: "",
    questDescription: "",
    reward: 0,
    createdBy: "",
    completedBy: [""],
    createdAt: "",
    dueDate: "",
    applicantsId: [""]
}

export const blankNft: NFT = {
    nftId: "",
    nftImg: "",
    name: "",
    address: "",
    rarity: "Common",
}