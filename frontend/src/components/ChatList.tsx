import ErrorCard from "./ErrorCard";
import ChatCard from "./ChatCard";
import useConversation from "@/hooks/useConversation";
import { useChatUserStore } from "@/store/useChatUser";
import NoChatsYet from "./NoChatsYet";

const ChatList = () => {
  const {
    data: conversations,
    isError: isConvError,
    error: convError,
  } = useConversation();

  const { setChatUser } = useChatUserStore();

  return (
    <>
      <div className="flex-1 overflow-y-auto min-h-0">
        {isConvError && (
          <ErrorCard
            errorDetails={convError.response?.data.message}
            errorTitle={convError.message}
          />
        )}

        {conversations?.length === 0 && <NoChatsYet />}

        <ul>
          {conversations?.map((conv) => (
            <li
              key={conv._id}
              className="m-2"
              onClick={() => setChatUser(conv.chatUserId)}
            >
              <ChatCard
                profilePic={conv.chatUserId?.profilePic}
                name={conv.chatUserId.fullName}
                lastMessage={conv.lastMessage}
                visited={conv.visited}
                time={conv.time}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ChatList;
