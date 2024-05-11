import { Post } from "./Post";

export const mockPosts: Post[] = [
    {
        userId: "1",
        userName: "John Smith",
        userImg: "https://randomuser.me/api/portraits",
        postImg: "https://randomuser.me/api/portraits",
        description: "This is a test post",
        likes: ["John Smith", "Jane Smith"]
    },
    {
        userId: "2",
        userName: "Jane Smith",
        userImg: "https://randomuser.me/api/portraits",
        postImg: "https://randomuser.me/api/portraits",
        description: "This is a test post",
        likes: ["John Doe", "Jane Smith"]
    },
    {
        userId: "3",
        userName: "John Doe",
        userImg: "https://randomuser.me/api/portraits",
        postImg: "https://randomuser.me/api/portraits",
        description: "This is a test post",
        likes: ["John Doe", "John Smith"]
    }
]