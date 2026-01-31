import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { PeopleProps } from "@/hooks/useGetPeople";
import useSendRequest from "@/hooks/useSendRequest";

import userProfileAlter from "../assets/userProfile.png";

interface Props {
  peopleProps: PeopleProps;
}

const PeopleCard = ({ peopleProps }: Props) => {
  const { mutate: sendRequest } = useSendRequest();

  return (
    <div>
      <Item variant="outline" className="mb-2">
        <ItemMedia>
          <Avatar className="size-10 border border-black/20">
            <AvatarImage
              className="object-cover"
              src={peopleProps.profilePic || userProfileAlter}
            />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{peopleProps.fullName}</ItemTitle>
          <ItemDescription>{peopleProps.email}</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button
            className="text-xs"
            variant="default"
            size="sm"
            onClick={() => sendRequest(peopleProps._id)}
          >
            Add Friend
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
};

export default PeopleCard;
