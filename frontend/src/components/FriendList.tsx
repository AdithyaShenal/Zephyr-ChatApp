import useGetFriends from "@/hooks/useGetFriends";
import ErrorCard from "./ErrorCard";
import ChatCard from "./ChatCard";
import { useChatUserStore } from "@/store/useChatUser";
import NoFriendsYet from "./NoFriendsYet";

const FriendList = () => {
  const { data: users, isError, error } = useGetFriends();

  const { setChatUser } = useChatUserStore();

  return (
    <>
      <div className="flex-1 overflow-y-auto min-h-0">
        {isError && (
          <ErrorCard
            errorDetails={error.response?.data.message}
            errorTitle={error.message}
          />
        )}

        {users?.length === 0 && <NoFriendsYet />}

        <ul>
          {users?.length != 0 &&
            users?.map((user) => (
              <li
                key={user._id}
                className="m-2"
                onClick={() => setChatUser(user)}
              >
                <ChatCard
                  profilePic={user?.profilePic}
                  name={user.fullName}
                  lastMessage={null}
                  visited={null}
                  time={null}
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default FriendList;
