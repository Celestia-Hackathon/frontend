import { Avatar } from "@/components/Avatar";
import ProfileHeader from "@/components/ProfileHeader";
import { Post } from "@/utils/Post";
import { User } from "@/utils/User";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Profile() {
    const params = useParams();
    const id = params.id || "";

    const [user, setUser] = useState<User>({
        userId: "",
        userName: "",
        followers: 0,
        following: 0,
        name: "",
        avatar: "",
        bio: "",
        banner: ""
    });
    const [userPosts, setUserPosts] = useState<Post[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserPosts = async ({ id }: any) => {
            try {
                const response = await fetch(`https://backend-only-pics.vercel.app/api/get-user-posts/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserPosts(data);
                    setUser({
                        userId: id,
                        name: data[0].name,
                        userName: data[0].userName,
                        followers: data[0].followers || 28,
                        following: data[0].following || 28,
                        avatar: data[0].userImg, // might add userImg in the future
                        bio: data[0].userBio, // random description
                        banner: data[0].banner, // random banner
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

        
    }, [])

    return (
        <div className='w-[100vw]' >
            {loading &&  
                <div className='w-[full] lg:mx-auto lg:w-[70vw]'>
                    <ProfileHeader username={user.userName} />
                    <div className='h-[25vh] lg:h-[50vh]'>
                        <img src={user.banner} alt="" className='w-full lg:w-full' />
                    </div>
                    <div className='bg-background py-6 -mt-12 relative'>
                        <div className='flex flex-col items-center justify-center -mt-16 lg:-mt-20'>
                            <Avatar avatar={user.avatar} profile={true} />
                            <p className='mt-5'><span className='font-bold'>{user.userName}</span></p>
                            <p className='text-base text-secondary-foreground'>{user.bio}</p>
                        </div>
                        <div className='w-full mt-6 flex items-center justify-between px-20 text-foreground border-b-4 border-secondary pb-6'>
                            <div className='text-base flex flex-col items-center'>
                                <p className='font-bold'>{Object.keys(userPosts).length}</p>
                                <p>posts</p>
                            </div>
                            <div className='text-base  flex flex-col items-center'>
                                <p className='font-bold'>{user.followers}</p>
                                <p>followers</p>
                            </div>
                            <div className='text-base  flex flex-col items-center'>
                                <p className='font-bold'>{user.following}</p>
                                <p>following</p>
                            </div>
                        </div>

                        <div className='mt-10 grid grid-cols-3 gap-x-0 overflow-hidden lg:gap-1'>
                            {userPosts.map((post: any, index: number) => {
                                return (
                                    // should add routes to the post ?
                                    <div className='group relative'>
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
        </div>
    );
}