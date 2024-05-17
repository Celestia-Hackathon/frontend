import { AvatarFeed } from "@/components/AvatarFeed";
import Card from "@/components/Card";
import DummyHeader from "@/components/DummyHeader";
import NewPostBtn from "@/components/NewPostsBtn";

import { MarketPlacePost, Post, User } from "@/utils/types.ts";

export default function Home({ users, posts }: { users: User[], posts: (Post | MarketPlacePost)[] }) {

    const loggedInUser : User = JSON.parse(localStorage.getItem('user') || '{}');

    return (
        <div className="flex lg:justify-between lg:pt-2 mb-16 justify-center items-center outline-none">
            <DummyHeader />
            <div className="flex flex-col items-center w-full lg:w-[35vw]">
                <div className="pt-2 flex items-center w-full h-full bg-background justify-start overflow-x-auto lg:w-full">
                    <div className="mx-3">
                        <AvatarFeed
                            avatar={loggedInUser.avatarImg}
                            username={loggedInUser.userName}
                            userId={loggedInUser.userId}
                        />
                    </div>
                    {users.map((user: User, index: number) => {
                        return (
                            <div className="mx-3">
                                <AvatarFeed
                                    key={index}
                                    avatar={user.avatarImg}
                                    username={user.userName}
                                    userId={user.userId}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-col w-full items-center bg-background">
                    {posts.map((post: Post | MarketPlacePost, index: number) => {
                        return (
                            <div className="w-full flex justify-center">
                                <Card
                                    key={index}
                                    userId={post.userId}
                                    userName={post.userName}
                                    userImg={post.avatarImg}
                                    postImg={post.postImg}
                                    description={post.caption}
                                    likes={post.likes}
                                    nft={(post as MarketPlacePost).nft}
                                    price={(post as MarketPlacePost).price}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
            <DummyHeader />

            <div className="fixed bottom-20 right-5 z-10 lg:right-20">
                <NewPostBtn />
            </div>

        </div>
    )
}