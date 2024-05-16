import { Award, Crown, Grid3x3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Badge, MarketPlacePost, NFT, Post, User } from "@/utils/types";

import { Button } from "@/components/ui/button";
// import { mockPosts } from "@/utils/mockPosts";
import { mockUsers } from "@/utils/mockUsers";
// import { Avatar } from "@/components/Avatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DummyHeader from "@/components/DummyHeader";
import ProfileHeader from "@/components/ProfileHeader";
import tokenImg from "@/assets/token.svg";
import CopyAddress from "@/components/CopyAddress";
import ProfileFeedMarketplace from "@/components/ProfileFeedMarketplace";
import ProfileFeedPost from "@/components/ProfileFeedPost";
import ProfileNFT from "@/components/ProfileNFT";
import ProfileBadge from "@/components/ProfileBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAccount , useBalance } from 'wagmi'
import { config } from '../config'

export default function Profile({ users, posts }: { users: User[], posts: (Post | MarketPlacePost)[] }) {
    // console.log(tokenImg)
    const account = useAccount(
        {
            config,
        }
    )
    const balance = useBalance({
        address: account.address,
        token: '0x597346565Eb10a60336c6c9C1aCfB26E085fd426', 
    }) as any

    const params = useParams();
    const id = params.id || "";

    const [selected, setSelected] = useState('feed');
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    }

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

        // const user = mockUsers.find((user: User) => user.userId === id);
        // const posts = mockPosts.filter((post) => post.userId === id);

        const user = users.find((user: User) => user.userId === id);
        const userPosts = posts.filter((post: Post | MarketPlacePost) => post.userId === id);

        console.log(user);
        console.log(userPosts);

        setUser(user || blankUser);
        setUserPosts(userPosts || []);
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
            <DummyHeader />
            {!loading &&
                <div className='w-[full] lg:w-[35vw]'>
                    <ProfileHeader username={user.userName} />
                    <div className='h-[25vh] lg:h-[50vh]'>
                    {!imageLoaded && <Skeleton className="w-full lg:w-full h-full" />}

                        <img src={user.bannerImg} onLoad={handleImageLoad} alt="" className={`w-full lg:w-full h-full ${imageLoaded ? "block" : "hidden"}`} />
                    </div>
                    <div className='bg-background py-6 -mt-12 relative'>
                        <div className='px-4 flex flex-col items-center justify-center -mt-16 lg:-mt-20'>
                            {/* <Avatar avatar={user.avatarImg} profile={true} /> */}
                            <Avatar className="w-[5.5rem] h-[5.5rem] lg:w-[7rem] lg:h-[7rem]">
                                <AvatarImage src={user.avatarImg} />
                                <AvatarFallback>{user.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <p className='mt-1'><span className='font-bold'>{user.userName}</span></p>
                            <p className='text-base text-secondary-foreground'>{user.bio}</p>
                            <CopyAddress background="dark" address={user.wallet} />
                        </div>

                        <div className='w-full mt-6 flex items-center justify-between text-foreground pb-6'>
                            <div className={`${id == 'E6U6YomFu3dFKqEXJQ2C' && 'hidden'} w-full`}>
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
                            <div className={`${id != 'E6U6YomFu3dFKqEXJQ2C' ? 'hidden' : ''} w-full flex justify-center`}>
                                <div className="bg-accent/75 lg:bg-background hover:bg-secondary/75 w-fit py-1 px-2 rounded-lg flex items-center gap-2">
                                    <img className="w-[1.5rem]" src={tokenImg} alt="" />
                                    <p className="font-bold">{(balance.data?.value / BigInt(10**18)).toString()} CAT</p>
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
                            <div onClick={() => { setSelected('feed') }} className={`py-2 w-full flex justify-center cursor-pointer ${selected == 'feed' ? 'border-b-2 border-accent' : ''}`}>
                                <div className="relative">
                                    <Grid3x3 size={28} color={selected == 'feed' ? 'hsl(var(--accent))' : 'hsl(var(--primary))'} />
                                    <div className="absolute text-[0.8rem] font-bold -bottom-1.5 -right-1.5 bg-muted flex items-center justify-center rounded-full w-5 h-5">
                                        {Object.keys(userPosts).length}
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => { setSelected('nft') }} className={`py-2 w-full flex justify-center cursor-pointer ${selected == 'nft' ? 'border-b-2 border-accent' : ''}`}>
                                <div className="relative">
                                    <Crown size={28} color={selected == 'nft' ? 'hsl(var(--accent))' : 'hsl(var(--primary))'} />
                                    <div className="absolute text-[0.8rem] font-bold -bottom-1.5 -right-1.5 bg-muted flex items-center justify-center rounded-full w-5 h-5">
                                        {user.nfts.length}
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => { setSelected('badges') }} className={`py-2 w-full flex justify-center cursor-pointer ${selected == 'badges' ? 'border-b-2 border-accent' : ''}`}>
                                <div className="relative">
                                    <Award size={28} color={selected == 'badges' ? 'hsl(var(--accent))' : 'hsl(var(--primary))'} />
                                    <div className="absolute text-[0.8rem] font-bold -bottom-1.5 -right-1.5 bg-muted flex items-center justify-center rounded-full w-5 h-5">
                                        {user.badges.length}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='grid grid-cols-3 gap-x-[0.01rem] overflow-hidden'>
                            {selected == 'feed' && userPosts.map((post: MarketPlacePost | Post, index: number) => {
                                const isMarketPlace = !!(post as MarketPlacePost).nft;
                                if (isMarketPlace) {
                                    return <ProfileFeedMarketplace key={index} post={post as MarketPlacePost} />
                                } else {
                                    return <ProfileFeedPost key={index} post={post as Post} />
                                }
                            })}
                            {selected == 'nft' && user.nfts.map((nft: NFT, index) => {
                                return (
                                    <ProfileNFT key={index} nft={nft} />
                                )
                            })}
                            {selected == "badges" && user.badges.map((badge: Badge, index) => {
                                return (
                                    <ProfileBadge key={index} badge={badge} />
                                )
                            })}
                        </div>
                    </div>
                </div>
            }
            <DummyHeader />
        </div>
    );
}