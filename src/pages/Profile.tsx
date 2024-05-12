import { Award, Crown, Grid3x3, Heart } from "lucide-react";
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

    const [selected, setSelected] = useState('feed');

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
        postsId: [""],
        nfts: [],
        badges: []
    }

    const [user, setUser] = useState<User>(blankUser);
    const [userPosts, setUserPosts] = useState<Post[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        /* const getUserPosts = async ({ id }: any) => {
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
        } */

        // getUserPosts({ id });

        const user = mockUsers.find((user: User) => user.userId === id);
        const posts = mockPosts.filter((post) => post.userId === id);
        setUser(user || blankUser);
        setUserPosts(posts);
        setLoading(false);
    }, [])

    return (
        <div className=' lg:flex lg:justify-between'>
            <DummyHeader/>
            {!loading &&  
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
                        <div className={`${id != '1' ? 'hidden' : ''} flex justify-center mt-4`}>
                            <div className="bg-accent lg:bg-background hover:bg-accent w-fit py-1 px-2 rounded-lg flex items-center gap-2">
                                <img className="w-[1.5rem]" src={tokenImg} alt="" />
                                <p className="font-bold">1000 STR</p>
                            </div>
                        </div>
                        <div className='w-full mt-6 flex items-center justify-between text-foreground pb-6'>
                            <div className='w-[20%] text-base flex flex-col items-center'>
                                <p className='font-bold'>{Object.keys(userPosts).length}</p>
                                <p>posts</p>
                            </div>
                            <div className='w-[20%] text-base flex flex-col items-center'>
                                <p className='font-bold'>{user.followers.length}</p>
                                <p>followers</p>
                            </div>
                            <div className='w-[20%] text-base  flex flex-col items-center'>
                                <p className='font-bold'>{user.following.length}</p>
                                <p>following</p>
                            </div>
                            <div className='w-[20%] text-base  flex flex-col items-center'>
                                <p className='font-bold'>{user.nfts.length}</p>
                                <p>NFTs</p>
                            </div>
                            <div className='w-[20%] text-base  flex flex-col items-center'>
                                <p className='font-bold'>{user.badges.length}</p>
                                <p>badges</p>
                            </div>
                        </div>

                        <div className="flex flex-row justify-between w-full">
                            <div onClick={() => {setSelected('feed')}} className={`py-2 w-full flex justify-center cursor-pointer ${selected == 'feed' ? 'border-b-2 border-white' : ''}`}><Grid3x3 color={selected == 'feed' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}/></div>
                            <div onClick={() => {setSelected('nft')}} className={`py-2 w-full flex justify-center cursor-pointer ${selected == 'nft' ? 'border-b-2 border-white' : ''}`}><Crown color={selected == 'nft' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}/></div>
                            <div onClick={() => {setSelected('badges')}} className={`py-2 w-full flex justify-center cursor-pointer ${selected == 'badges' ? 'border-b-2 border-white' : ''}`}><Award color={selected == 'badges' ? 'hsl(var(--primary))' : 'hsl(var(--secondary))'}/></div>
                        </div>

                        <div className='grid grid-cols-3 gap-x-[0.01rem] overflow-hidden'>
                            {selected == 'feed' && userPosts.map((post: Post, index: number) => {
                                return (
                                    // should add routes to the post ?
                                    <div key={index} className='relative group'>
                                        <img src={post.postImg} alt="" className='w-full aspect-[1/1.6] object-cover group-hover:brightness' />
                                        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100'>
                                            <Heart color='hsl(var(--foreground))' />
                                            <p className='text-white ml-1'>{post.likes.length}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            {selected == 'nft' && user.nfts.map((nft, index) => {
                                return (
                                    <div key={index} className='relative group'>
                                        {nft.rarity == "Common" && 
                                        <div className={`absolute top-1 left-1 px-1 rounded-lg border-2 border-common bg-common/[.35]`}>   
                                           <p className={`text-[0.6rem] lg:text-[0.7rem] text-common font-bold`}>{nft.rarity}</p>
                                        </div> }
                                        {nft.rarity == "Rare" && 
                                        <div className={`absolute top-1 left-1 px-1 rounded-lg border-2 border-rare bg-rare/[.35]`}>   
                                           <p className={`text-[0.6rem] lg:text-[0.7rem] text-rare font-bold`}>{nft.rarity}</p>
                                        </div> }
                                        {nft.rarity == "Epic" && 
                                        <div className={`absolute top-1 left-1 px-1 rounded-lg border-2 border-epic bg-epic/[.35]`}>   
                                           <p className={`text-[0.6rem] lg:text-[0.7rem] text-epic font-bold`}>{nft.rarity}</p>
                                        </div> }
                                        {nft.rarity == "Legendary" && 
                                        <div className={`absolute top-1 left-1 px-1 rounded-lg border-2 border-legendary bg-legendary/[.35]`}>   
                                           <p className={`text-[0.6rem] lg:text-[0.7rem] text-legendary font-bold`}>{nft.rarity}</p>
                                        </div> }
                                        {nft.rarity == "Special" && 
                                        <div className={`absolute top-1 left-1 px-1 rounded-lg border-2 border-special bg-special/[.35]`}>   
                                           <p className={`text-[0.6rem] lg:text-[0.7rem] text-special font-bold`}>{nft.rarity}</p>
                                        </div> }
                                        <img src={nft.nftImg} alt="" className='w-full aspect-square object-cover group-hover:brightness' />
                                        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100'>
                                            <p className='text-primary'>{nft.name}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            {selected == "badges" && user.badges.map((badge, index) => {
                                return (
                                    <div key={index} className='flex justify-between items-center px-4 col-span-3'>
                                        <img src={badge.badgeImg} alt="" className='w-1/4 aspect-square' />
                                        <div className="w-full">
                                            <p className='text-primary text-sm font-bold'>{badge.name}</p>
                                            <p className="text-primary text-sm">{badge.description}</p>
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