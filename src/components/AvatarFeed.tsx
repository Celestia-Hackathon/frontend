import { CirclePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom";

export function AvatarFeed({
  avatar,
  username,
  activeUser = false,
  userId,
}: {
  avatar: any;
  username: string;
  activeUser?: boolean;
  userId: string;
}) {

  const navigator = useNavigate();

  return (
    <div onClick={() => navigator(`/profile/${userId}`)} className="flex flex-col items-center py-1">
      <div className="w-[3.5rem] h-[3.5rem] lg:w-[4rem] lg:h-[4rem] relative cursor-pointer">
        {/* <img
            src={avatar}
            alt=""
            className="rounded-full w-full h-full border-gradient1 border-4 object-cover"
          /> */}
        <Avatar className="w-full h-full">
          <AvatarImage src={avatar} />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className={`absolute -bottom-1 -right-1 cursor-pointer ${activeUser ? "inline" : "hidden"}`}>
          <CirclePlus
            color="hsl(var(--primary))"
            size={20}
          />
        </div>
      </div>
      <p className="text-foreground mt-2 font-bold text-sm">{username}</p>
    </div>
  );
}