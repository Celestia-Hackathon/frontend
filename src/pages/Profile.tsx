import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Post, User } from "@/utils/types";

import { mockPosts } from "@/utils/mockPosts";
import { mockUsers } from "@/utils/mockUsers";
import { Avatar } from "@/components/Avatar";
import DummyHeader from "@/components/DummyHeader";
import ProfileHeader from "@/components/ProfileHeader";
import tokenImg from "@/assets/token.svg";

export default function Profile() {
    const params = useParams();
    const id = params.id || "";

    const blankUser = {
        name: "",
        userName: "",
        userId: "",
        followers: [""],
        following: [""],
        bio: "",
        avatarImg: "",
        bannerImg: "",
        wallet: "",
        postsId: [""]
    }

    const [user, setUser] = useState<User>(blankUser);
    const [userPosts, setUserPosts] = useState<Post[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserPosts = async ({ id }: any) => {
            try {
                const response = await fetch(`api/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();

                    // tem que tentar dar um fetch nos posts do usuário
                    setUserPosts(data.posts);
                    setUser({
                        userId: id,
                        name: data[0].name,
                        userName: data[0].userName,
                        followers: data[0].followers.length || 28,
                        following: data[0].following.length || 28,
                        avatarImg: data[0].userImg, // might add userImg in the future
                        bio: data[0].userBio, // random description
                        bannerImg: data[0].banner, // random banner
                        wallet: data[0].wallet,
                        postsId: data.map((post: any) => post.postId)
                        // add other stuff here
                    });
                    console.log(data);
                    setLoading(false);
                } else {
                    console.error("Something went wrong");
                }
            } catch (error) {
                console.error(error);
            }
        }

        // getUserPosts({ id });

        const user = mockUsers.find((user: User) => user.userId === id);
        const posts = mockPosts.filter((post) => post.userId === id);
        setUser(user || blankUser);
        setUserPosts(posts);

    }, [])

    return (
        <div className=' lg:flex lg:justify-between'>
            <DummyHeader/>
            {loading &&  
                <div className='w-[full] lg:w-[35vw]'>
                    <ProfileHeader username={user.userName} />
                    <div className='h-[25vh] lg:h-[50vh]'>
                        <img src={user.bannerImg} alt="" className='w-full lg:w-full h-full' />
                    </div>
                    <div className='bg-background py-6 -mt-12 relative'>
                        <div className='px-4 flex flex-col items-center justify-center -mt-16 lg:-mt-20'>
                            <Avatar avatar={user.avatarImg} profile={true} />
                            <p className='mt-1'><span className='font-bold'>{user.userName}</span></p>
                            <p className='text-base text-secondary-foreground'>{user.bio}</p>
                        </div>
                        <div className="flex justify-center mt-4">
                            <div className="bg-accent lg:bg-background hover:bg-accent w-fit py-1 px-2 rounded-lg flex items-center gap-2">
                                <img className="w-[1.5rem]" src={tokenImg} alt="" />
                                <p className="font-bold">1000 STR</p>
                            </div>
                        </div>
                        <div className='w-full mt-6 flex items-center justify-between px-20 text-foreground border-b-4 border-secondary pb-6'>
                            <div className='w-1/6 text-base flex flex-col items-center'>
                                <p className='font-bold'>{Object.keys(userPosts).length}</p>
                                <p>posts</p>
                            </div>
                            <div className='w-1/6 text-base flex flex-col items-center'>
                                <p className='font-bold'>{user.followers.length}</p>
                                <p>followers</p>
                            </div>
                            <div className='w-1/6 text-base  flex flex-col items-center'>
                                <p className='font-bold'>{user.following.length}</p>
                                <p>following</p>
                            </div>
                        </div>

                        <div className='grid grid-cols-3 gap-x-0 overflow-hidden lg:gap-1'>
                            {userPosts.map((post: Post, index: number) => {
                                return (
                                    // should add routes to the post ?
                                    <div key={index} className='group relative'>
                                        <img src={post.postImg} alt="" className='w-full aspect-[1/1.6] object-cover group-hover:brightness' />
                                        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100'>
                                            <Heart color='hsl(var(--foreground))' />
                                            <p className='text-white ml-1'>{post.likes.length}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
            <DummyHeader/>
        </div>
    );
}