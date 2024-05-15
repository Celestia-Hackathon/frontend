import { MarketPlacePost, Post } from "@/utils/types";
import { Search, X, Store, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// import Card from "@/components/Card";
import DummyHeader from "@/components/DummyHeader";
import ProfileFeedPost from "@/components/ProfileFeedPost";
import ProfileFeedMarketplace from "@/components/ProfileFeedMarketplace";
import Marketplace from "@/pages/Marketplace";

export default function ExploreHub({ posts }: any) {

    // DO NOT THINK TOO MUCH ABOUT THIS... GAMBIARRA MASTER
    const params = useParams();
    const device = params.device || "mobile";

    // const blankPost: MarketPlacePost = {
    //     postId: "",
    //     userId: "",
    //     userName: "",
    //     avatarImg: "",
    //     postImg: "",
    //     caption: "",
    //     likes: [""],
    //     comments: [""],
    //     createdAt: "",
    //     price: 0,
    //     nft: {
    //         nftId: "",
    //         nftImg: "",
    //         name: "",
    //         address: "",
    //         rarity: "Common"
    //     }
    // }

    const [filteredPosts, setFilteredPosts] = useState<(Post | MarketPlacePost)[]>(posts);
    const [searchTerm, setSearchTerm] = useState("");
    const [selected, setSelected] = useState(device == "mobile" ? "explore" : "market");

    useEffect(() => {
        setSelected(device == "mobile" ? "explore" : "market");
    }, [device]);

    const handleSearch = (e: any) => {
        setSearchTerm(e.target.value.toLowerCase());

        const filtered = posts.filter((post: Post | MarketPlacePost) => {
            // Filter by userName, price, nft.name, or nft.rarity
            return (
                post.userName.toLowerCase().includes(searchTerm)
                || ((post as MarketPlacePost).nft && (post as MarketPlacePost).nft.rarity.toLowerCase().includes(searchTerm))
                || ((post as MarketPlacePost).nft && (post as MarketPlacePost).nft.name.toLowerCase().includes(searchTerm))
                // (post as MarketPlacePost).price.toString().includes(searchTerm)
            );
        });

        setFilteredPosts(filtered);
    }

    const clearSearchBar = () => {
        setSearchTerm("");
        setFilteredPosts(posts);
    }

    return (
        <div className="flex lg:justify-between lg:pt-2 mb-16 justify-center items-center outline-none">
            <DummyHeader />
            <div className="flex flex-col items-center w-full lg:w-[35vw]">
                <div className="flex flex-col w-full justify-center sticky top-0 z-10 bg-background">
                    <div className="relative w-full">
                        <label htmlFor="search">
                            <Search className="absolute left-6 top-[1.15rem] w-5 h-5 text-gray-400" />
                        </label>
                        <input
                            id="search"
                            type="text"
                            placeholder="Search User Name, NFT Name or Rarity"
                            value={searchTerm}
                            onChange={e => handleSearch(e)}
                            className="pl-10 w-[95%] h-10 px-3 my-2 text-md bg-input border border-border rounded-full outline-none"
                        />
                        <button onClick={clearSearchBar} className={`absolute right-7 top-4 w-5 h-5 text-gray-400 ${searchTerm ? "" : "hidden"}`}>
                            <X />
                        </button>
                    </div>

                    <div className="flex flex-row justify-between w-full lg:hidden ">
                        <div onClick={() => { setSelected('explore') }} className={`py-2 w-full flex justify-center cursor-pointer ${selected == 'explore' ? 'border-b-2 border-accent' : ''}`}>
                            <div className="flex items-center">
                                <TrendingUp size={28} color={selected == 'explore' ? 'hsl(var(--accent))' : 'hsl(var(--primary))'} />
                                <p className={`ml-1 ${selected == 'explore' ? 'text-accent' : 'text-primary'}`}>
                                    Trending
                                </p>
                            </div>
                        </div>
                        <div onClick={() => { setSelected('market') }} className={`py-2 w-full flex justify-center cursor-pointer ${selected == 'market' ? 'border-b-2 border-accent' : ''}`}>
                            <div className="flex items-center">
                                <Store size={28} color={selected == 'market' ? 'hsl(var(--accent))' : 'hsl(var(--primary))'} />
                                <p className={`ml-1 ${selected == 'market' ? 'text-accent' : 'text-primary'}`}>
                                    Marketplace
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-3 gap-x-[0.01rem] overflow-hidden'>
                    {selected == 'explore' && filteredPosts.map((post: MarketPlacePost | Post, index: number) => {
                        const isMarketPlace = !!(post as MarketPlacePost).nft;
                        if (isMarketPlace) {
                            return <ProfileFeedMarketplace key={index} post={post as MarketPlacePost} />
                        } else {
                            return <ProfileFeedPost key={index} post={post as Post} />
                        }
                    })}
                </div>
                
                {selected == 'market' ? <Marketplace posts={filteredPosts} /> : null}

                {filteredPosts.length === 0 && (
                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-primary mt-8">No posts found 💀</p>
                    </div>
                )}

            </div>
            <DummyHeader />
        </div>
    );
}
