import { CirclePlus } from "lucide-react";

export function AvatarFeed({
    avatar,
    username,
    activeUser = false,
  }: {
    avatar: any;
    username: string;
    activeUser?: boolean;
  }) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-[3.5rem] h-[3.5rem] lg:w-[4rem] lg:h-[4rem] relative cursor-pointer">
          <img
            src={avatar}
            alt=""
            className="rounded-full w-full h-full border-gradient1 border-4 object-cover"
          />
            <div className={`absolute -bottom-1 -right-1 cursor-pointer ${activeUser ? "inline" : "hidden"}`}>
                <CirclePlus
                    color="hsl(var(--primary))"
                    size={20}
                />
            </div>
        </div>
        <p className="text-foreground mt-2 font-bold text-base">{username}</p>
      </div>
    );
  }