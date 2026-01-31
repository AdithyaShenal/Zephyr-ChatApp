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
import useCancelSentRequest from "@/hooks/useCancelSentRequest";
import type { SentRequestProps } from "@/hooks/useSentRequests";
import userProfileAlter from "../../assets/userProfile.png";

interface Props {
  cardProps: SentRequestProps;
}

const SentRequestCard = ({ cardProps }: Props) => {
  const { mutate: cancelRequest } = useCancelSentRequest();

  return (
    <>
      <div>
        <Item variant="outline" className="mb-2">
          <ItemMedia>
            <Avatar className="size-10">
              <AvatarImage
                src={cardProps.recipient.profilePic || userProfileAlter}
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{cardProps.recipient.fullName}</ItemTitle>
            <ItemDescription>{cardProps.recipient.email}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              variant="destructive"
              size="sm"
              className="text-xs"
              onClick={() => cancelRequest(cardProps._id)}
            >
              Cancel
            </Button>
          </ItemActions>
        </Item>
      </div>
    </>
  );
};

export default SentRequestCard;
