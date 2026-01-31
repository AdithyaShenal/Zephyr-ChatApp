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
import useAcceptRequest from "@/hooks/useAcceptRequest";
import useRejectRequest from "@/hooks/useRejectRequest";
import type { IncomingRequestProps } from "@/hooks/useIncomingRequests";
import userProfileAlter from "../../assets/userProfile.png";

interface Props {
  cardProps: IncomingRequestProps;
}

const IncomingRequestCard = ({ cardProps }: Props) => {
  const { mutate: accept } = useAcceptRequest();
  const { mutate: reject } = useRejectRequest();

  return (
    <>
      <div>
        <Item variant="outline" className="mb-2">
          <ItemMedia>
            <Avatar className="size-10">
              <AvatarImage
                className="object-cover"
                src={cardProps.requester.profilePic || userProfileAlter}
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{cardProps.requester.fullName}</ItemTitle>
            <ItemDescription>{cardProps.requester.email}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              variant="default"
              size="sm"
              className="text-xs"
              onClick={() => accept(cardProps._id)}
            >
              Accept
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs"
              onClick={() => reject(cardProps._id)}
            >
              Reject
            </Button>
          </ItemActions>
        </Item>
      </div>
    </>
  );
};

export default IncomingRequestCard;
