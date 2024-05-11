import { useState, useEffect } from "react";

import { AvatarFeed } from "@/components/AvatarFeed";
import Card from "@/components/Card";
import DummyHeader from "@/components/DummyHeader";

import { Post, User } from "@/utils/types.ts";

import { mockUsers } from "@/utils/mockUsers";
import { mockPosts } from "@/utils/mockPosts";

export default function Home() {
    const [users, setUsers] = useState<User[]>([{ name: "", avatarImg: "", userId: "", userName: "", followers: [""], following: [""], bio: "", bannerImg: "", wallet: "", postsId: [""]}]);
    const [postsData, setPostsData] = useState<Post[]>([{ postId: "" ,userId: "", userName: "", avatarImg: "", postImg: "", caption: "", likes: [""], comments: [""], createdAt: ""}]);

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
        <div className="flex lg:justify-between lg:pt-2 mb-16 justify-center items-center outline-none">
            <DummyHeader/>
            <div className="flex flex-col items-center w-full lg:w-[35vw]">
                <div className="pt-2 flex items-center w-full h-full bg-background justify-start overflow-x-auto lg:w-full">
                    <div className="mx-3">
                        <AvatarFeed avatar={"https://randomuser.me/api/portraits/men/1.jpg"} activeUser username={"Pintudo"}/>
                    </div>
                    {users.map((user: User) => {
                    return (
                        <div className="mx-3">
                        <AvatarFeed
                            avatar={user.avatarImg}
                            username={user.userName}
                        />
                        </div>
                    );
                    })}
                </div>
                <div className="flex flex-col w-full items-center bg-background lg:w-full">
                    {postsData.map((post: Post, index: number) => {
                        return (
                            <div className="w-full">
                                <Card
                                    key={index}
                                    userId={post.userId}
                                    userName={post.userName}
                                    userImg={post.avatarImg}
                                    postImg={post.postImg}
                                    description={post.caption}
                                    likes={post.likes}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <DummyHeader/>

        </div>
    )
}