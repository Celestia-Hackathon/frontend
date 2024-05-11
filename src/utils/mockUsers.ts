import { User } from "@/utils/User";

export const mockUsers: User[] = [
    {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
        userId: "1",
        userName: "johndoe",
        followers: 100,
        following: 5,
        bio: "violets are purple, roses are blue, I'm a poet and I know it",
        banner: ""
    },
    {
        name: "John Smith",
        avatar: "https://randomuser.me/api/portraits/men/11.jpg",
        userId: "2",
        userName: "joao_smito",
        followers: 1000,
        following: 10,
        bio: "rosas são vermelhas, violetas são azuis, eu sou um poeta e sei disso",
        banner: ""
    },
    {
        name: "Jane Smith",
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
        userId: "3",
        userName: "janey",
        followers: 23091,
        following: 2100,
        bio: "sou legal",
        banner: ""
    }
]