import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Badge } from "./ui/badge";
import { Mail } from "lucide-react";

interface Props {
  name: string;
  profilePic: string | null | undefined;
  lastMessage: string | null;
  visited: boolean | null;
  time: string | null;
}

const ChatCard = ({ name, profilePic, lastMessage, visited, time }: Props) => {
  return (
    <>
      <div className="flex w-full max-w-lg flex-col gap-6 cursor-pointer ">
        <Item variant="outline" className="hover:bg-gray-200">
          <ItemMedia>
            <Avatar className="size-10">
              <AvatarImage
                src={profilePic || "https://github.com/person.png"}
              />
              <AvatarFallback>JA</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{name}</ItemTitle>
            <ItemDescription>
              {lastMessage} {time && new Date(time).toLocaleTimeString()}
            </ItemDescription>
          </ItemContent>
          {visited && (
            <ItemActions>
              <Badge className="bg-blue-500 text-white dark:bg-blue-600">
                <Mail />
                new
              </Badge>
            </ItemActions>
          )}
        </Item>
      </div>
    </>
  );
};

export default ChatCard;
