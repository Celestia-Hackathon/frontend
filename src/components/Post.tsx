import { useNavigate } from "react-router-dom";
import { AvatarPost } from "./AvatarPost";
import { HeartIcon, MessageSquare } from "lucide-react";

interface PostProps {
    userId: string;
    userName: string;
    userImg: string;
    postImg: string;
    description: string;
    likes: string[];
}

export default function Post(
    {userId, userName, userImg, postImg, description, likes} : PostProps
) {
    const navigator = useNavigate();

    return (
        <div className="w-full h-full border-b items-start justify-center">
            <div className="rounded-lg py-4 flex flex-col">
                <div className="px-2 flex flex-row justify-between items-center">
                    <div onClick={() => navigator(`/profile/${userId}`)} className="mb-2">
                        <AvatarPost avatar={userImg} username={userName} />
                    </div>
                </div>
                <p className="px-2 mb-3 font-bold text-foreground text-xs text-left lg:text-sm">- {description}</p>
                <div className="bg-primary cursor-pointer overflow-hidden">
                    <img
                        src={postImg}
                        alt=""
                        className="w-full aspect-square"
                    />
                </div>
                <div className="w-full p-2 bg-secondary rounded-b-lg">
                    <div className="h-full">
                        <div className="flex items-center space-x-2 text-white">
                            <MessageSquare color="hsl(var(--primary))"/>
                            <HeartIcon color="hsl(var(--primary))"/>   
                        </div>
                        <p className="text-left mt-2">{likes.length} Likes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}