import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import userProfileAlter from "../assets/userProfile.png";

interface Props {
  name: string | undefined;
  profilePic: string | null | undefined;
}

const ChatHeader = ({ name, profilePic }: Props) => {
  return (
    <div className="flex w-full flex-col gap-6 sticky">
      <Item variant="muted" className="rounded-none">
        <ItemMedia>
          <Avatar className="size-12 border-2 border-gray-400">
            <AvatarImage
              className="object-cover"
              src={profilePic || userProfileAlter}
            />
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{name}</ItemTitle>
          <ItemDescription className="text-xs">
            Last seen 11 hrs ago
          </ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
};

export default ChatHeader;
