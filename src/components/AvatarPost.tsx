import { Avatar } from "@/components/Avatar";

export function AvatarPost({
  avatar,
  username,
  isMarketPlace=false
}: {
  avatar: any;
  username: string;
  isMarketPlace?: boolean;
}) {
  return (
    <div className="flex flex-row items-center">
      <Avatar avatar={avatar}/>
      <div className="flex flex-col ml-3">
        <p className={`${isMarketPlace ? 'text-primary-foreground' : 'text-primary'} font-bold text-sm cursor-pointer hover:underline`}>
          {username}
        </p>
        <p className="text-gray-500 font-bold text-xs">
          @{username.toLowerCase().split(" ")[0]}_
          {username.toLowerCase().split(" ")[1]}
        </p>
      </div>
    </div>
  );
}