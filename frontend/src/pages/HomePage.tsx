import ChatCard from "@/components/ChatCard";
import ChatComponent from "@/components/ChatComponent";
import ErrorCard from "@/components/ErrorCard";
import NoChatSelected from "@/components/NoChatSelected";
import useUsers, { type ChatUserProps } from "@/hooks/useUsers";
import { useState } from "react";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import useConversation from "@/hooks/useConversation";

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState<ChatUserProps | null>(null);
  const [menubar, setMenubar] = useState<"chats" | "friends">("friends");

  const { data: users, isError, error } = useUsers();
  const {
    data: conversations,
    isError: isConvError,
    error: convError,
  } = useConversation();

  return (
    <div className="grid md:grid-cols-[30%_70%] lg:grid-cols-[25%_75%] h-full min-h-0">
      {/* Left Panel */}
      <div className="flex flex-col border-r min-h-0">
        {/* Header */}
        <div className="bg-white flex justify-between items-center p-3 shrink-0 border-b">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger onClick={() => setMenubar("chats")}>
                Chats
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger onClick={() => setMenubar("friends")}>
                Friends
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger onClick={() => setMenubar("friends")}>
                Online
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>

        {/* Scroll Area */}

        {menubar === "friends" && (
          <div className="flex-1 overflow-y-auto min-h-0">
            {isError && (
              <ErrorCard
                errorDetails={error.response?.data.message}
                errorTitle={error.message}
              />
            )}
            <ul>
              {users?.map((user) => (
                <li
                  key={user._id}
                  className="m-2"
                  onClick={() => setSelectedUser(user)}
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
        )}

        {menubar === "chats" && (
          <div className="flex-1 overflow-y-auto min-h-0">
            {isConvError && (
              <ErrorCard
                errorDetails={convError.response?.data.message}
                errorTitle={convError.message}
              />
            )}
            <ul>
              {conversations?.map((conv) => (
                <li
                  key={conv._id}
                  className="m-2"
                  onClick={() => setSelectedUser(conv.chatUserId)}
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
        )}
      </div>

      {/* Right Panel */}
      <div className="flex flex-col h-full min-h-0">
        {!selectedUser && <NoChatSelected />}
        {selectedUser && <ChatComponent userProps={selectedUser} />}
      </div>
    </div>
  );
};

export default HomePage;
