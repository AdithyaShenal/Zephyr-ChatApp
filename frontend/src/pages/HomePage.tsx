import ChatComponent from "@/components/ChatComponent";
import NoChatSelected from "@/components/NoChatSelected";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { NavLink, Outlet } from "react-router-dom";
import { useChatUserStore } from "@/store/useChatUser";

const HomePage = () => {
  const { chatUser } = useChatUserStore();

  return (
    <div className="grid md:grid-cols-[30%_70%] lg:grid-cols-[25%_75%] h-full min-h-0">
      <div className="flex flex-col border-r min-h-0">
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

      {/* Right Panel */}
      <div className="flex flex-col h-full min-h-0">
        {!chatUser && <NoChatSelected />}
        {chatUser && <ChatComponent userProps={chatUser} />}
      </div>
    </div>
  );
};

export default HomePage;
