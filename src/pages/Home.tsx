import { useState, useEffect } from "react";

import { AvatarFeed } from "@/components/AvatarFeed";
import Card from "@/components/Card";
import DummyHeader from "@/components/DummyHeader";

import { MarketPlacePost, Post, User } from "@/utils/types.ts";

import { mockUsers } from "@/utils/mockUsers";
import { mockPosts } from "@/utils/mockPosts";

export default function Home() {
    const blankUser : User = {
        name: "",
        userName: "",
        userId: "",
        followers: [""],
        following: [""],
        bio: "",
        avatarImg: "",
        bannerImg: "",
        wallet: "",
        postsId: [""],
        nfts: [],
        badges: []
    }

    const blankPost : Post = {
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

    const [users, setUsers] = useState<User[]>([blankUser]);
    const [postsData, setPostsData] = useState<(Post | MarketPlacePost)[]>([blankPost]);

    useEffect(() => {
        /* const fetchData = async () => {
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
        }; */

        // fetchData();

        setUsers(mockUsers);
        setPostsData(mockPosts);
    }, []);

    return (
        <div className="flex lg:justify-between lg:pt-2 mb-16 justify-center items-center outline-none">
            <DummyHeader/>
            <div className="flex flex-col items-center w-full lg:w-[35vw]">
                <div className="pt-2 flex items-center w-full h-full bg-background justify-start overflow-x-auto lg:w-full">
                    {users.map((user: User, index: number) => {
                    return (
                        <div className="mx-3">
                        <AvatarFeed
                            avatar={user.avatarImg}
                            username={user.userName}
                            activeUser={index == 0}
                        />
                        </div>
                    );
                    })}
                </div>
                <div className="flex flex-col w-full items-center bg-background lg:w-full">
                    {postsData.map((post: Post | MarketPlacePost, index: number) => {
                        const isMarketPlace = !!(post as MarketPlacePost).nft;

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
                                    nft={isMarketPlace ? (post as MarketPlacePost).nft : undefined}
                                    price={isMarketPlace ? (post as MarketPlacePost).price : undefined}
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