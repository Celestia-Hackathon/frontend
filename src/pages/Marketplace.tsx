import { MarketPlacePost, Post } from "@/utils/types";
import { Search, X } from "lucide-react";
import { useState } from "react";
import Card from "@/components/Card";
import DummyHeader from "@/components/DummyHeader";

export default function Marketplace({ posts }: any) {
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
                <div className="flex w-full justify-center sticky top-0 z-10 bg-background">
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
                </div>

                {filteredPosts.length === 0 && (
                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-primary mt-8">No posts found 💀</p>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                    {filteredPosts.map((post: Post | MarketPlacePost, index: number) => (
                        // create another card for marketplace posts ??
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
                    ))}
                </div>
            </div>
            <DummyHeader />
        </div>
    );
}
