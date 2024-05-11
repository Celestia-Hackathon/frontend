import { User } from "@/utils/types.ts";

export const mockUsers: User[] = [
    {
        name: "John Doe",
        avatarImg: "https://randomuser.me/api/portraits/men/10.jpg",
        userId: "1",
        userName: "johndoe",
        followers: ["2", "3"],
        following: ["2", "3"],
        bio: "violets are purple, roses are blue, I'm a poet and I know it",
        wallet: "0x1234567890abcdef",
        postsId: ["1", "2", "3"],
        bannerImg: "https://random.imagecdn.app/500/150"
    },
    {
        name: "John Smith",
        avatarImg: "https://randomuser.me/api/portraits/men/11.jpg",
        userId: "2",
        userName: "joao_smito",
        followers: ["1000"],
        following: ["10"],
        bio: "rosas são vermelhas, violetas são azuis, eu sou um poeta e sei disso",
        wallet: "0xabcdef1234567890",
        postsId: ["4", "5", "6"],
        bannerImg: ""
    },
    {
        name: "Jane Smith",
        avatarImg: "https://randomuser.me/api/portraits/women/10.jpg",
        userId: "3",
        userName: "janey",
        followers: ["23091"],
        following: ["2100"],
        bio: "sou legal",
        wallet: "0xabcdef1234567890",
        postsId: ["7", "8", "9"],
        bannerImg: ""
    }
]