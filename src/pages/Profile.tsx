import { Award, Crown, Grid3x3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Badge, MarketPlacePost, NFT, Post, User } from "@/utils/types";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import DummyHeader from "@/components/DummyHeader";
import ProfileHeader from "@/components/ProfileHeader";
import tokenImg from "@/assets/chatspcae_token_v2.png";
import CopyAddress from "@/components/CopyAddress";
import ProfileFeedMarketplace from "@/components/ProfileFeedMarketplace";
import ProfileFeedPost from "@/components/ProfileFeedPost";
import ProfileNFT from "@/components/ProfileNFT";
import ProfileBadge from "@/components/ProfileBadge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAccount } from 'wagmi'
import { getCatCoinBalance } from "@/utils/contracts";
import { blankUser } from "@/utils/blank";
import { api } from "@/utils/api";
import { toast } from "@/components/ui/use-toast";
// import { ScrollArea } from "@/components/ui/scroll-area"

export default function Profile({ users, posts }: { users: User[], posts: (Post | MarketPlacePost)[] }) {
    // console.log(tokenImg)
    const account = useAccount();
    const [balance, setBalace] = useState(0);

    const params = useParams();
    const id = params.id || "";

    const [selected, setSelected] = useState('feed');
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    }

    const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');

    const [user, setUser] = useState<User>(blankUser);
    const [userPosts, setUserPosts] = useState<(Post | MarketPlacePost)[]>([]);

    const [loading, setLoading] = useState(true);

    const [following, setFollowing] = useState(false);

    useEffect(() => {
        if (users.length > 1 && posts.length > 1) {
            console.log("entrei aq")
            console.log(users)
            setUser(users.find((user: User) => user.userId === id) || blankUser);
            const userPosts = posts.filter((post: Post | MarketPlacePost) => post.userId === id);
            setUserPosts(userPosts || []);
            setLoading(false);
            setImageLoaded(false);

        } else {
            console.log("to no fetch")
            api.fetchUserData()
                .then((data: User[]) => { setUser(data.find((el: User) => el.userId === id) || blankUser); })

            api.getUserPosts(id).then((data: (Post | MarketPlacePost)[]) => { setUserPosts(data) });
            setLoading(false);
            setImageLoaded(false);
        }

    }, [id])

    useEffect(() => {
        if (!user.userId) return;
        setFollowing(user.followers.includes(loggedInUser.userId));

        getCatCoinBalance(account).then((balance) => { setBalace(balance) });
    }, [user])

    const follow = async () => {
        const response = await api.followUser(loggedInUser.userId, id);
        if (response == 200) {
            setFollowing(true);
            setUser({
                ...user,
                followers: [...user.followers, loggedInUser.userId]
            });
            users.find((user: User) => user.userId === id)?.followers.push(loggedInUser.userId);
            loggedInUser.following.push(id);
            localStorage.setItem('user', JSON.stringify(loggedInUser));

            if (id == 'E6U6YomFu3dFKqEXJQ2C' && !(loggedInUser as User).questsId.includes('3aeMuCve6e8FydEhcJdr')) {
                const res = await api.completeQuest(loggedInUser.userId, '3aeMuCve6e8FydEhcJdr');
                if (res == 200) {
                    console.log('deu bom patrao vai pega moeda')
                }
                toast({ title: "Quest completed!", description: "Go to quests page to claim your prize." });
                await api.updateUserInfo(loggedInUser.wallet);
            }
        }
    }

    /* const unfollow = async () => {
        const followers = user.followers.filter((follower: string) => follower !== id);
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
        

        const followers = user.followers.filter((follower: string) => follower !== id);
        setUser({
            ...user,
            followers
        });
        mockUsers[Number(id) - 1].followers = followers;
        mockUsers[0].following = mockUsers[0].following.filter((follow: string) => follow !== id);
        setFollowing(false);
    } */

    return (
        <div className=' lg:flex lg:justify-between'>
            <DummyHeader />
            {!loading &&
                <div className='w-[full] lg:w-[35vw]'>
                    <ProfileHeader name={user.name} />
                    <div className='h-[20vh] lg:h-[30vh]'>
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

                        <div className='w-full mt-4 flex items-center justify-between text-foreground'>
                            <div className={`${id == loggedInUser.userId && 'hidden'} w-full`}>
                                {following ?
                                    <Button variant="following" className='w-1/2 relative group'>
                                        <span>Following</span>
                                        <div className='absolute top-0 left-0 w-full h-full bg-secondary rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100'>
                                            <span>Unfollow</span>
                                        </div>
                                    </Button>
                                    :
                                    <Button onClick={follow} variant="follow" className='w-1/2'>Follow</Button>
                                }
                            </div>
                            <div className={`${id != loggedInUser.userId ? 'hidden' : ''} w-full h-full flex justify-center`}>
                                <div className="bg-secondary ml-2 lg:bg-background hover:bg-secondary/75 w-fit py-1 px-2 rounded-lg flex items-center gap-2">
                                    <img className="w-[1.5rem]" src={tokenImg} alt="" />
                                    <p className="font-bold">{balance} CAT</p>
                                    {/* <p className="font-bold">{(balance.data?.value / 1e18).toString()} CAT</p> */}
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

                        <div className="flex flex-row justify-between w-full sticky top-0 bg-background z-10 pt-2">
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

                        <div className='grid grid-cols-3 gap-x-[0.01rem] pb-10'>
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