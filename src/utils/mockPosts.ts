import { Post } from "@/utils/types";

export const mockPosts: Post[] = [
    {
        userId: "1",
        userName: "John Smith",
        avatarImg: "https://randomuser.me/api/portraits/men/1.jpg",
        postImg: "https://random.imagecdn.app/500/500",
        caption: "This is a test post",
        likes: ["John Smith", "Jane Smith"],
        comments: ["This is a comment", "This is another comment"],
        createdAt: "2022-01-01",
        postId: "1"
    },
    {
        userId: "2",
        userName: "Jane Smith",
        avatarImg: "https://randomuser.me/api/portraits/women/1.jpg",
        postImg: "https://random.imagecdn.app/500/500",
        caption: "This is a test post",
        likes: ["John Doe", "Jane Smith"],
        comments: ["This is a comment", "This is another comment"],
        createdAt: "2022-01-02",
        postId: "2"
    },
    {
        userId: "3",
        userName: "John Doe",
        avatarImg: "https://randomuser.me/api/portraits/men/2.jpg",
        postImg: "https://random.imagecdn.app/500/500",
        caption: "This is a test post",
        likes: ["John Doe", "John Smith"],
        comments: ["This is a comment", "This is another comment"],
        createdAt: "2022-01-03",
        postId: "3"
    }
];