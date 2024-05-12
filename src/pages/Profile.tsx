import { Award, Crown, Grid3x3, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MarketPlacePost, Post, User } from "@/utils/types";

import { Button } from "@/components/ui/button";
import { mockPosts } from "@/utils/mockPosts";
import { mockUsers } from "@/utils/mockUsers";
import { Avatar } from "@/components/Avatar";
import DummyHeader from "@/components/DummyHeader";
import ProfileHeader from "@/components/ProfileHeader";
import tokenImg from "@/assets/token.svg";
import Rarity from "@/components/Rarity";
import CopyAddress from "@/components/CopyAddress";

export default function Profile() {
    console.log(tokenImg)

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
    const [userPosts, setUserPosts] = useState<(Post | MarketPlacePost)[]>([]);

    const [loading, setLoading] = useState(true);

    const [following, setFollowing] = useState(false);

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
    }, [id])

    useEffect(() => {
        const user = mockUsers[0];
        setFollowing(user.following.includes(id));
    }, [])

    const follow = async () => {
        /* const followers = user.followers;
        followers.push(id);
        await fetch(`api/${user.userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                followers
            })
        });

        const following = user.following;
        following.push(id);
        await fetch(`api/${user.userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                following
            })
        });
        setFollowing(true); 
        */

        const followers = user.followers;
        followers.push(id);
        setUser({
            ...user,
            followers
        });
        mockUsers[Number(id) - 1].followers = followers;
        mockUsers[0].following.push(id);
        setFollowing(true);
    }

    const unfollow = async () => {
        /* const followers = user.followers.filter((follower: string) => follower !== id);
        await fetch(`api/${user.userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                followers
            })
        });
        setFollowing(false); 

        const following = user.following.filter((follow: string) => follow !== id);
        await fetch(`api/${user.userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                following
            })
        });
        */

        const followers = user.followers.filter((follower: string) => follower !== id);
        setUser({
            ...user,
            followers
        });
        mockUsers[Number(id) - 1].followers = followers;
        mockUsers[0].following = mockUsers[0].following.filter((follow: string) => follow !== id);
        setFollowing(false);
    }

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
                            <CopyAddress background="dark" address={user.wallet} />
                        </div>
                        
                        <div className='w-full mt-6 flex items-center justify-between text-foreground pb-6'>
                            <div className={`${id == '1' && 'hidden'} w-full`}>
                                {following ?
                                    <Button onClick={unfollow} variant="following" className='w-1/2 relative group'>
                                        <span>Following</span>
                                        <div className='absolute top-0 left-0 w-full h-full bg-secondary rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100'>
                                            <span>Unfollow</span>
                                        </div>
                                    </Button>
                                    :
                                    <Button onClick={follow} variant="follow" className='w-1/2'>Follow</Button>
                                }
                            </div>
                            <div className={`${id != '1' ? 'hidden' : ''} w-full flex justify-center`}>
                                <div className="bg-accent/75 lg:bg-background hover:bg-secondary/75 w-fit py-1 px-2 rounded-lg flex items-center gap-2">
                                    <img className="w-[1.5rem]" src={tokenImg} alt="" />
                                    <p className="font-bold">1000 STR</p>
                                </div>
                            </div>
                            <div className='w-full flex flex-col items-center'>
                                <p className='font-bold'>{user.followers.length}</p>
                                <p>followers</p>
                            </div>
                            <div className='w-full text-base  flex flex-col items-center'>
                                <p className='font-bold'>{user.following.length}</p>
                                <p>following</p>
                            </div>
                        </div>

                        <div className="flex flex-row justify-between w-full">
                            <div onClick={() => {setSelected('feed')}} className={`py-2 w-full flex justify-center cursor-pointer ${selected == 'feed' ? 'border-b-2 border-accent' : ''}`}>
                                <div className="relative">
                                    <Grid3x3 size={28} color={selected == 'feed' ? 'hsl(var(--accent))' : 'hsl(var(--primary))'}/>
                                    <div className="absolute text-[0.8rem] font-bold -bottom-1.5 -right-1.5 bg-muted flex items-center justify-center rounded-full w-5 h-5">
                                        {Object.keys(userPosts).length}
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => {setSelected('nft')}} className={`py-2 w-full flex justify-center cursor-pointer ${selected == 'nft' ? 'border-b-2 border-accent' : ''}`}>
                                <div className="relative">
                                    <Crown size={28} color={selected == 'nft' ? 'hsl(var(--accent))' : 'hsl(var(--primary))'}/>
                                    <div className="absolute text-[0.8rem] font-bold -bottom-1.5 -right-1.5 bg-muted flex items-center justify-center rounded-full w-5 h-5">
                                        {user.nfts.length}
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => {setSelected('badges')}} className={`py-2 w-full flex justify-center cursor-pointer ${selected == 'badges' ? 'border-b-2 border-accent' : ''}`}>
                                <div className="relative">
                                    <Award size={28} color={selected == 'badges' ? 'hsl(var(--accent))' : 'hsl(var(--primary))'}/>
                                    <div className="absolute text-[0.8rem] font-bold -bottom-1.5 -right-1.5 bg-muted flex items-center justify-center rounded-full w-5 h-5">
                                        {user.badges.length}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-3 gap-x-[0.01rem] overflow-hidden'>
                            {selected == 'feed' && userPosts.map((post: MarketPlacePost | Post, index: number) => {
                                const isMarketPlace = !!(post as MarketPlacePost).nft;
                                return (
                                    // should add routes to the post ?
                                    <div key={index} className='relative group'>
                                        {/* <Rarity rarity={isMarketPlace && (post as MarketPlacePost).nft.rarity} /> */}
                                        <div className={`${!isMarketPlace ? 'hidden' : ''} bg-epic w-full`}>
                                            <p>Epic</p>
                                        </div>
                                        <img src={isMarketPlace ? (post as MarketPlacePost).nft.nftImg : post.postImg} alt="" className={`w-full aspect-[1/1.6] object-cover group-hover:brightness ${isMarketPlace && 'object-contain aspect-square '}`} />
                                        <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100'>
                                            <Heart color='hsl(var(--foreground))' />
                                            <p className='text-white ml-1'>{post.likes.length}</p>
                                        </div>
                                        <div className={`absolute w-full bottom-0 flex items-center justify-center bg-background/75 ${!isMarketPlace && 'hidden'}`}>
                                            <img className="w-[1.5rem]" src={tokenImg} alt="" />
                                            <p className="text-xs font-bold">{isMarketPlace ? (post as MarketPlacePost).price + " STR" : ""}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            {selected == 'nft' && user.nfts.map((nft, index) => {
                                return (
                                    <div key={index} className='relative group'>
                                        <Rarity rarity={nft.rarity} />
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