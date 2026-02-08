import ChatComponent from "@/components/ChatComponent";
import NoChatSelected from "@/components/NoChatSelected";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { NavLink, Outlet } from "react-router-dom";
import { useChatUserStore } from "@/store/useChatUser";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChatHeader from "@/components/ChatHeader";

const HomePage = () => {
  const { chatUser, setChatUser } = useChatUserStore();

  return (
    <div className="grid md:grid-cols-[30%_70%] lg:grid-cols-[25%_75%] h-full min-h-0">
      {/* Left Panel - Hidden on mobile when chat is selected */}
      <div
        className={`flex flex-col border-r min-h-0 ${chatUser ? "hidden md:flex" : "flex"}`}
      >
        <div className="bg-base flex justify-between items-center p-3 shrink-0 border-b">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <NavLink
                  className={({ isActive }) => `${isActive ? "font-bold" : ""}`}
                  to={"."}
                >
                  Chats
                </NavLink>
              </MenubarTrigger>
            </MenubarMenu>
            <MenubarMenu>
              <MenubarTrigger>
                <NavLink
                  className={({ isActive }) => `${isActive ? "font-bold" : ""}`}
                  to={"friendList"}
                >
                  Friends
                </NavLink>
              </MenubarTrigger>
            </MenubarMenu>
          </Menubar>
        </div>

        {/* Scroll Area */}
        <Outlet />
      </div>

      {/* Right Panel - Full width on mobile when chat is selected */}
      <div
        className={`flex flex-col h-full min-h-0 ${!chatUser ? "hidden md:flex" : "flex"}`}
      >
        {/* Mobile Back Button */}
        {chatUser && (
          <div className="md:hidden flex items-center gap-2 border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setChatUser(null)}
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <ChatHeader
              name={chatUser.fullName}
              profilePic={chatUser.profilePic}
            />
          </div>
        )}

        {!chatUser && <NoChatSelected />}
        {chatUser && <ChatComponent userProps={chatUser} />}
      </div>
    </div>
  );
};

export default HomePage;
