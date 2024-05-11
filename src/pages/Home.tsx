import { useState, useEffect } from "react";

import { AvatarFeed } from "@/components/AvatarFeed";
import Card from "@/components/Card";

import { Post } from "@/utils/Post";
import { User } from "@/utils/User";

import { mockUsers } from "@/utils/mockUsers";
import { mockPosts } from "@/utils/mockPosts";

export default function Home() {
    const [users, setUsers] = useState<User[]>([{ name: "", avatar: "", userId: "", userName: "", followers: 0, following: 0, bio: "", banner: ""}]);
    const [postsData, setPostsData] = useState<Post[]>([{ userId: "", userName: "", userImg: "", postImg: "", description: "", likes: [""]}]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("api");
                console.log(response);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);

                    setPostsData(data.posts);
                    setUsers(data.users);
                } else {
                    console.error("Something went wrong");
                    // throw new Error("Something went wrong");
                }
            } catch (error) {
                console.error(error);
            }
        };

        // fetchData();

        setUsers(mockUsers);
        setPostsData(mockPosts);
    }, []);

    return (
        <div className="flex flex-col lg:my-16 mb-16 items-center outline-none">
            <div className="flex items-center w-full h-full bg-background justify-start overflow-x-auto lg:w-[60vw]">
                <div className="mx-3 my-3 p-1">
                <AvatarFeed avatar={"https://randomuser.me/api/portraits/men/1.jpg"} activeUser username={"Pintudo"}/>
                </div>
                {users.map((user: User) => {
                return (
                    <div className="mx-3 my-3">
                    <AvatarFeed
                        avatar={user.avatar}
                        username={user.name.split(" ")[0]}
                    />
                    </div>
                );
                })}
            </div>
            <div className="flex flex-col w-full items-center bg-background lg:w-[60vw]">
                {postsData.map((post: Post, index: number) => {
                    return (
                        <div className="w-full">
                            <Card
                                key={index}
                                userId={post.userId}
                                userName={post.userName}
                                userImg={post.userImg}
                                postImg={post.postImg}
                                description={post.description}
                                likes={post.likes}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}