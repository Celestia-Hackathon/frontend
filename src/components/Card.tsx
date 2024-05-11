import { AvatarPost } from "@/components/AvatarPost";

import { MessageSquare } from "lucide-react";

export default function Card({
    userId, // used to navigate to the user profile
    userName,
    userImg,
    postImg,
    description,
    likes
} : {
    userId: string;
    userName: string;
    userImg: string;
    postImg: string;
    description: string;
    likes: string[];
}) {
    return (
        <div className="w-full h-full rounded-3xl items-start justify-center p-4">
            <div className="border rounded-lg p-4 flex flex-col">
                <div className="flex flex-row justify-between items-center">
                <div /* onClick={() => navigator(`/profile/${userId}`)} */ className="mb-2">
                    <AvatarPost avatar={userImg} username={userName} />
                </div>
                </div>
                <p className="ml-3 mb-3 font-bold text-foreground">- {description}</p>
                <div className="relative bg-primary rounded-3xl cursor-pointer overflow-hidden">
                <img
                    src={postImg}
                    alt=""
                    className="rounded-xl w-full aspect-square"
                />
                <div className="absolute bottom-0 left-0 w-full h-1/6 bg-black bg-opacity-50 rounded-b-xl flex items-center justify-between">
                    <div className="flex flex-row h-full space-x-3 ml-3">
                    <div className="flex items-center space-x-1 text-white">
                        <MessageSquare />
                    </div>
                    <div className="flex items-center space-x-1 text-white">
                        <p>{likes.length}</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}